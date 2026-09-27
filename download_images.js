const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// ===== CẤU HÌNH =====
const IMAGE_LIST = 'image_list.txt';
const OUTPUT_DIR = 'image';
const BASE_URLS = [
    'https://your-cdn-domain.com/',     // Thay bằng CDN gốc của game
    'https://another-cdn.com/',
    'http://127.0.0.1:8080/'            // Fallback local
];
const CONCURRENCY = 10;  // Số ảnh tải song song
const TIMEOUT = 10000;   // 10 giây timeout

// ===== ĐỌC DANH SÁCH ẢNH =====
const imagePaths = fs.readFileSync(IMAGE_LIST, 'utf8')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#'));

console.log(`📋 Tổng số ảnh cần tải: ${imagePaths.length}`);

// ===== TẢI 1 ẢNH =====
function downloadImage(imgPath) {
    return new Promise((resolve) => {
        // Bỏ prefix MOBILE_CONNECT/ nếu có
        let cleanPath = imgPath.replace(/^MOBILE_CONNECT\//, '');
        
        // Đường dẫn lưu file local
        const localPath = path.join(OUTPUT_DIR, cleanPath);
        const localDir = path.dirname(localPath);
        
        // Nếu đã tồn tại thì bỏ qua
        if (fs.existsSync(localPath) && fs.statSync(localPath).size > 0) {
            return resolve({ status: 'skip', path: imgPath });
        }
        
        // Tạo thư mục nếu chưa có
        if (!fs.existsSync(localDir)) {
            fs.mkdirSync(localDir, { recursive: true });
        }
        
        // Thử từng base URL
        let urlIndex = 0;
        
        function tryNext() {
            if (urlIndex >= BASE_URLS.length) {
                return resolve({ status: 'fail', path: imgPath });
            }
            const url = BASE_URLS[urlIndex] + cleanPath;
            urlIndex++;
            
            const client = url.startsWith('https') ? https : http;
            const req = client.get(url, { timeout: TIMEOUT }, (res) => {
                if (res.statusCode === 200) {
                    const file = fs.createWriteStream(localPath);
                    res.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        resolve({ status: 'ok', path: imgPath, size: fs.statSync(localPath).size });
                    });
                    file.on('error', () => {
                        fs.unlink(localPath, () => {});
                        tryNext();
                    });
                } else {
                    res.resume();
                    tryNext();
                }
            });
            req.on('error', () => tryNext());
            req.on('timeout', () => { req.destroy(); tryNext(); });
        }
        
        tryNext();
    });
}

// ===== CHẠY SONG SONG =====
async function main() {
    let ok = 0, fail = 0, skip = 0;
    const failed = [];
    
    for (let i = 0; i < imagePaths.length; i += CONCURRENCY) {
        const batch = imagePaths.slice(i, i + CONCURRENCY);
        const results = await Promise.all(batch.map(downloadImage));
        
        results.forEach(r => {
            if (r.status === 'ok') ok++;
            else if (r.status === 'skip') skip++;
            else { fail++; failed.push(r.path); }
        });
        
        // In tiến độ mỗi 100 ảnh
        if ((i + CONCURRENCY) % 100 === 0 || i + CONCURRENCY >= imagePaths.length) {
            const done = Math.min(i + CONCURRENCY, imagePaths.length);
            console.log(`⏳ ${done}/${imagePaths.length} | ✅ ${ok} | ⏭️ ${skip} | ❌ ${fail}`);
        }
    }
    
    console.log('\n============================================================');
    console.log(`✅ Thành công: ${ok}`);
    console.log(`⏭️  Bỏ qua (đã có): ${skip}`);
    console.log(`❌ Thất bại: ${fail}`);
    
    if (failed.length > 0) {
        fs.writeFileSync('failed_images.txt', failed.join('\n'));
        console.log(`📝 Danh sách ảnh lỗi lưu ở: failed_images.txt`);
    }
}

main();
