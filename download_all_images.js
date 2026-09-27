// TẢI TẤT CẢ ẢNH TỪ SERVER CŨ
const fs = require('fs');
const path = require('path');
const http = require('http');

const BASE_URL = 'http://103.143.208.187/busidol_traffic/GTD/TOT';
const IMAGE_DIR = path.join(__dirname, 'image');
const LIST_FILE = path.join(__dirname, 'image_list.txt');

// Đọc danh sách ảnh
const imageList = fs.readFileSync(LIST_FILE, 'utf8')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('http'))
    .map(l => l.replace(/^\d+\.\s*/, ''));  // Bỏ số thứ tự

console.log(`📋 Tổng số ảnh cần tải: ${imageList.length}`);
console.log(`📁 Thư mục đích: ${IMAGE_DIR}`);
console.log('');

let success = 0;
let failed = 0;
let skipped = 0;

function downloadImage(imagePath, callback) {
    // Chuẩn hóa đường dẫn
    let cleanPath = imagePath.replace(/^\.\//, '').replace(/^\//, '');
    
    // Thêm 'image/' nếu chưa có
    if (!cleanPath.startsWith('image/')) {
        cleanPath = 'image/' + cleanPath;
    }
    
    const localPath = path.join(__dirname, cleanPath);
    
    // Bỏ qua nếu đã có
    if (fs.existsSync(localPath) && fs.statSync(localPath).size > 100) {
        skipped++;
        return callback(null, 'skipped');
    }
    
    // Tạo thư mục
    fs.mkdirSync(path.dirname(localPath), { recursive: true });
    
    // URL gốc
    const url = `${BASE_URL}/${cleanPath}`;
    
    const req = http.get(url, { timeout: 15000 }, (res) => {
        if (res.statusCode !== 200) {
            failed++;
            return callback(new Error(`HTTP ${res.statusCode}`));
        }
        
        const file = fs.createWriteStream(localPath);
        res.pipe(file);
        
        file.on('finish', () => {
            file.close();
            const size = fs.statSync(localPath).size;
            if (size < 100) {
                fs.unlinkSync(localPath);
                failed++;
                return callback(new Error('File too small'));
            }
            success++;
            callback(null, `✅ ${size} bytes`);
        });
    });
    
    req.on('error', (e) => {
        failed++;
        callback(e);
    });
    
    req.on('timeout', () => {
        req.destroy();
        failed++;
        callback(new Error('Timeout'));
    });
}

// Tải song song (5 luồng)
let index = 0;
let active = 0;
const CONCURRENT = 5;

function next() {
    if (index >= imageList.length) {
        if (active === 0) {
            console.log('');
            console.log('============================================================');
            console.log(`✅ HOÀN THÀNH!`);
            console.log(`   📥 Tải mới: ${success}`);
            console.log(`   ⏭️  Bỏ qua (đã có): ${skipped}`);
            console.log(`   ❌ Thất bại: ${failed}`);
            console.log(`   📊 Tổng: ${imageList.length}`);
            console.log('============================================================');
        }
        return;
    }
    
    if (active >= CONCURRENT) {
        return setTimeout(next, 50);
    }
    
    const img = imageList[index++];
    active++;
    
    downloadImage(img, (err, msg) => {
        active--;
        
        const total = success + failed + skipped;
        if (total % 100 === 0) {
            console.log(`📊 [${total}/${imageList.length}] ✅ ${success} | ⏭️  ${skipped} | ❌ ${failed}`);
        }
        
        if (err) {
            // Chỉ log lỗi quan trọng
            if (failed < 20) {
                console.log(`❌ ${img}: ${err.message}`);
            }
        }
        
        next();
    });
    
    next();
}

console.log('🚀 Bắt đầu tải...');
console.log('');
next();
