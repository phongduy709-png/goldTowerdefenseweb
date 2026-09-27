const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Đang khởi động web + serveo...\n');

// ===== THƯ MỤC CHỨA FILE HTML =====
const WEB_DIR = '/sdcard/goldTowerdefenseweb';

// ===== KIỂM TRA FILE =====
if (!fs.existsSync(path.join(WEB_DIR, 'game.html'))) {
    console.log('❌ Không tìm thấy file game.html!');
    console.log(`📁 Thư mục: ${WEB_DIR}`);
    console.log('📝 Các file có trong thư mục:');
    fs.readdirSync(WEB_DIR).forEach(f => console.log(`   - ${f}`));
    process.exit();
}

console.log(`✅ Tìm thấy game.html tại: ${WEB_DIR}`);

// ===== CHẠY WEB Ở CỔNG 8080 =====
const web = spawn('npx', ['serve', '-p', '8080', WEB_DIR], {
    stdio: 'pipe',
    shell: true
});

web.stdout.on('data', (data) => {
    process.stdout.write(`🌐 ${data}`);
});

web.stderr.on('data', (data) => {
    process.stderr.write(`⚠️ ${data}`);
});

// ===== CHẠY SERVEO SAU 3 GIÂY =====
setTimeout(() => {
    console.log('🚀 Đang khởi động Serveo...\n');
    
    const serveo = spawn('ssh', [
        '-o', 'StrictHostKeyChecking=no',
        '-R', '80:localhost:8080',
        'phongduy-game.serveo.net'
    ], {
        stdio: 'pipe'
    });

    serveo.stdout.on('data', (data) => {
        const output = data.toString();
        process.stdout.write(`📡 ${output}`);
        
        const match = output.match(/https:\/\/[a-zA-Z0-9-]+\.serveousercontent\.com/);
        if (match) {
            const url = match[0];
            console.log(`\n${'='.repeat(50)}`);
            console.log(`✅ LINK PUBLIC: ${url}/game.html??admin`);
            console.log(`${'='.repeat(50)}\n`);
            
            fs.writeFileSync('game_url.txt', `${url}/game.html??admin`, 'utf8');
        }
    });

    serveo.stderr.on('data', (data) => {
        process.stderr.write(`⚠️ ${data}`);
    });

    serveo.on('close', (code) => {
        console.log(`🔴 Serveo đã dừng (mã ${code})`);
    });

    process.on('SIGINT', () => {
        console.log('\n🛑 Đang tắt...');
        web.kill();
        serveo.kill();
        process.exit();
    });

}, 3000);

console.log('✅ Web đang khởi động...');
console.log('📌 Nhấn Ctrl+C để tắt\n');
