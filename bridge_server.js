// bridge_server.js - HTTP server cho browser gọi Termux
const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 9090;
const SERVER_REAL = 'http://211.253.26.47:8093/TOWERDEFENCE_COMMON/TOT';
const USER_DATA_FILE = path.join(__dirname, 'user_data.json');

const KGET = Buffer.from('gksekfidjrqjfwk1', 'utf8');
const IVGET = Buffer.from('towerdefense_amo', 'utf8');

function encryptData(data) {
    const cipher = crypto.createCipheriv('aes-128-cbc', KGET, IVGET);
    return cipher.update(JSON.stringify(data).replace(/\s+/g, ''), 'utf8', 'base64') + cipher.final('base64');
}

function decryptData(data) {
    try {
        const decipher = crypto.createDecipheriv('aes-128-cbc', KGET, IVGET);
        let d = decipher.update(data.trim(), 'base64', 'utf8') + decipher.final('utf8');
        return d.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
    } catch(e) { return null; }
}

function loadUserData() {
    if (fs.existsSync(USER_DATA_FILE)) {
        try { return JSON.parse(fs.readFileSync(USER_DATA_FILE, 'utf8')); } catch(e) { return null; }
    }
    return null;
}

function saveUserData(data) {
    data.last_updated = new Date().toISOString();
    fs.writeFileSync(USER_DATA_FILE, JSON.stringify(data, null, 2));
}

// Gọi server thật qua curl
function callRealServer(endpoint, postData) {
    return new Promise((resolve) => {
        var cmd = 'curl -s -X POST "' + SERVER_REAL + endpoint + '" -H "X-Requested-With: busidol.mobile.tower" -H "Content-Type: application/x-www-form-urlencoded" --data-urlencode "DATA=' + postData + '"';
        exec(cmd, { maxBuffer: 50 * 1024 * 1024 }, (err, stdout) => {
            if (err || !stdout || stdout.length < 10) {
                resolve({ error: true, message: err ? err.message : 'empty' });
            } else {
                resolve({ error: false, data: stdout.trim() });
            }
        });
    });
}

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }
    
    // ============ BRIDGE-PUT ============
    if (req.url === '/bridge-put' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                var parsed = JSON.parse(body);
                var endpoint = parsed.endpoint;
                var postData = parsed.data;
                
                console.log('[BRIDGE-PUT] Endpoint:', endpoint);
                
                // Gọi server thật
                var result = await callRealServer(endpoint, postData);
                
                if (result.error) {
                    console.log('[BRIDGE-PUT] ❌ Lỗi:', result.message);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: result.message }));
                    return;
                }
                
                console.log('[BRIDGE-PUT] Response:', result.data.length, 'bytes');
                
                // Decrypt
                var dec = decryptData(result.data);
                if (!dec) {
                    console.log('[BRIDGE-PUT] ❌ Không decrypt được');
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'decrypt failed' }));
                    return;
                }
                
                console.log('[BRIDGE-PUT] ✅ Decrypted:', dec.length, 'bytes');
                
                // Trả JSON cho browser
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(dec);
            } catch(e) {
                console.log('[BRIDGE-PUT] ❌ Error:', e.message);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: e.message }));
            }
        });
        return;
    }
    
    // ============ BRIDGE-REQUEST (get data) ============
    if (req.url === '/bridge-request' && req.method === 'POST') {
        console.log('[BRIDGE-REQUEST] Get user data từ server thật');
        
        // Gọi server thật get_user_data_all_AES2.php
        var result = await callRealServer('/get_user_data_all_AES2.php', 'test');
        
        if (result.error) {
            console.log('[BRIDGE-REQUEST] ❌ Lỗi, dùng local');
            var local = loadUserData();
            if (local && local.raw) {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify(local.raw));
            } else {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'no data' }));
            }
            return;
        }
        
        var dec = decryptData(result.data);
        if (!dec) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'decrypt failed' }));
            return;
        }
        
        var json = JSON.parse(dec);
        console.log('[BRIDGE-REQUEST] ✅ Nhận data từ server thật');
        
        // Lưu vào user_data.json
        saveUserData({
            profile: json.VALUE.normal.value,
            tower: json.VALUE.tower.value,
            hero: json.VALUE.hero.value,
            rubydiagold: json.VALUE.rubydiagold.value,
            stage: json.VALUE.stage.value,
            raw: json,
            action_log: []
        });
        
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(dec);
        return;
    }
    
    // ============ GET USER DATA ============
    if (req.url === '/user_data.json' && req.method === 'GET') {
        if (fs.existsSync(USER_DATA_FILE)) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(fs.readFileSync(USER_DATA_FILE, 'utf8'));
        } else {
            res.writeHead(404); res.end('Not found');
        }
        return;
    }
    
    res.writeHead(404);
    res.end('Not found');
});

server.listen(PORT, '127.0.0.1', () => {
    console.log('');
    console.log('========================================');
    console.log('🌉 BRIDGE SERVER (Termux)');
    console.log('   http://127.0.0.1:' + PORT);
    console.log('   POST /bridge-request → get data từ 211');
    console.log('   POST /bridge-put → put data lên 211');
    console.log('========================================');
    console.log('');
});
