#!/data/data/com.termux/files/usr/bin/bash
# bridge_server.sh - Lắng nghe request từ browser, gọi API, trả JSON

cd /storage/emulated/0/goldTowerdefenseweb

# Tạo HTTP server bằng Node.js
cat > bridge_http.js << 'NODEEOF'
const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const { exec } = require('child_process');

const PORT = 9090;

const server = http.createServer((req, res) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }
    
    if (req.url === '/bridge-request' && req.method === 'POST') {
        console.log('[BRIDGE] Nhận request từ browser, gọi API...');
        
        // Gọi API qua curl
        exec('curl -s -X POST http://127.0.0.1:8080/get_user_data_all_AES2.php -H "X-Requested-With: busidol.mobile.tower" -H "Content-Type: application/x-www-form-urlencoded" --data-urlencode "DATA=test"', 
        { maxBuffer: 1024 * 1024 * 10 },
        (err, stdout, stderr) => {
            if (err || !stdout || stdout.length < 100) {
                console.log('[BRIDGE] Lỗi curl:', err ? err.message : 'empty');
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'API failed' }));
                return;
            }
            
            console.log('[BRIDGE] Nhận response:', stdout.length, 'bytes');
            
            // Decrypt
            try {
                const key = Buffer.from('gksekfidjrqjfwk1', 'utf8');
                const iv = Buffer.from('towerdefense_amo', 'utf8');
                const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
                let dec = decipher.update(stdout.trim(), 'base64', 'utf8') + decipher.final('utf8');
                dec = dec.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
                
                // Lưu vào file để cache
                fs.writeFileSync('bridge_decrypted.json', dec);
                
                console.log('[BRIDGE] ✅ Decrypted:', dec.length, 'bytes');
                
                // Trả JSON plain cho browser
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(dec);
            } catch(e) {
                console.log('[BRIDGE] Decrypt error:', e.message);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Decrypt failed: ' + e.message }));
            }
        });
    } else if (req.url === '/bridge-response' && req.method === 'GET') {
        // Đọc file JSON đã lưu
        try {
            if (fs.existsSync('bridge_decrypted.json')) {
                const data = fs.readFileSync('bridge_decrypted.json', 'utf8');
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(data);
            } else {
                res.writeHead(404);
                res.end('Not found');
            }
        } catch(e) {
            res.writeHead(500);
            res.end('Error');
        }
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

server.listen(PORT, '127.0.0.1', () => {
    console.log('');
    console.log('========================================');
    console.log('🌉 BRIDGE SERVER ĐANG CHẠY');
    console.log('   http://127.0.0.1:' + PORT);
    console.log('   POST /bridge-request → gọi API + decrypt');
    console.log('   GET  /bridge-response → đọc JSON đã lưu');
    console.log('========================================');
    console.log('');
});

// Giữ process chạy
process.on('SIGINT', () => {
    console.log('[BRIDGE] Đang tắt...');
    server.close();
    process.exit();
});
NODEEOF

node bridge_http.js
