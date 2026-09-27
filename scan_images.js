// QUÉT TẤT CẢ ẢNH TỪ GTD.min.js + define.js
const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const gameFile = path.join(baseDir, 'min', 'GTD.min_20260702_0950.js');
const defineFile = path.join(baseDir, 'define', 'define.js');

console.log('🔍 BẮT ĐẦU QUÉT ẢNH');
console.log('='.repeat(60));
console.log('📁 Game file:', gameFile);
console.log('📁 Define file:', defineFile);
console.log('');

let allImages = new Set();

// 1. Quét GTD.min.js
if (fs.existsSync(gameFile)) {
    const content = fs.readFileSync(gameFile, 'utf8');
    console.log('📖 Đang quét GTD.min.js (' + (content.length / 1024 / 1024).toFixed(2) + ' MB)...');
    
    // Các pattern tìm ảnh
    const patterns = [
        // ./image/xxx/yyy.png
        /\.\/image\/[a-zA-Z0-9_/.\-]+\.(jpg|jpeg|png|gif|svg|ico|webp)/g,
        // "/image/xxx/yyy.png"
        /"\/image\/[a-zA-Z0-9_/.\-]+\.(jpg|jpeg|png|gif|svg|ico|webp)"/g,
        // '/image/xxx/yyy.png'
        /'\/image\/[a-zA-Z0-9_/.\-]+\.(jpg|jpeg|png|gif|svg|ico|webp)'/g,
        // /image/xxx/yyy.png (không dấu ngoặc)
        /\/image\/[a-zA-Z0-9_/.\-]+\.(jpg|jpeg|png|gif|svg|ico|webp)/g,
        // ./image/xxx/yyy.png với các ký tự đặc biệt
        /\.\/image\/[^\s"'<>)]+\.(jpg|jpeg|png|gif|svg|ico|webp)/gi
    ];
    
    patterns.forEach((pattern, idx) => {
        const matches = content.match(pattern);
        if (matches) {
            matches.forEach(m => {
                let clean = m
                    .replace(/^"|"$/g, '')
                    .replace(/^'|'$/g, '')
                    .replace(/^\.\//, '')
                    .replace(/^\/+/, '');
                // Loại bỏ query string
                clean = clean.split('?')[0];
                // Loại bỏ nếu có biến
                if (!clean.includes('+') && !clean.includes('${') && !clean.includes('undefined') && !clean.includes('null')) {
                    if (clean.startsWith('image/')) {
                        allImages.add(clean);
                    }
                }
            });
            console.log('  Pattern ' + (idx + 1) + ': ' + (matches.length || 0) + ' matches');
        }
    });
    
    // Tìm ảnh từ biến (ví dụ: "./image/mainmenu/mm_bg_" + S_LOGO.bg_name + ".jpg")
    const varPatterns = [
        /\.\/image\/([a-zA-Z0-9_/.\-]+_)["']\s*\+\s*([a-zA-Z0-9_.]+)\s*\+\s*["']\.(jpg|jpeg|png|gif)/g
    ];
    
    varPatterns.forEach(pattern => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
            console.log('  🔍 Biến động:', match[1] + '... + ' + match[2] + '... + .' + match[3]);
        }
    });
}

// 2. Quét define.js
if (fs.existsSync(defineFile)) {
    const content = fs.readFileSync(defineFile, 'utf8');
    console.log('');
    console.log('📖 Đang quét define.js (' + (content.length / 1024).toFixed(2) + ' KB)...');
    
    const patterns = [
        /\.\/image\/[a-zA-Z0-9_/.\-]+\.(jpg|jpeg|png|gif|svg|ico|webp)/g,
        /"\/image\/[a-zA-Z0-9_/.\-]+\.(jpg|jpeg|png|gif|svg|ico|webp)"/g,
        /'\/image\/[a-zA-Z0-9_/.\-]+\.(jpg|jpeg|png|gif|svg|ico|webp)'/g,
        /\/image\/[a-zA-Z0-9_/.\-]+\.(jpg|jpeg|png|gif|svg|ico|webp)/g
    ];
    
    patterns.forEach((pattern, idx) => {
        const matches = content.match(pattern);
        if (matches) {
            matches.forEach(m => {
                let clean = m
                    .replace(/^"|"$/g, '')
                    .replace(/^'|'$/g, '')
                    .replace(/^\.\//, '')
                    .replace(/^\/+/, '');
                clean = clean.split('?')[0];
                if (!clean.includes('+') && !clean.includes('${')) {
                    if (clean.startsWith('image/')) {
                        allImages.add(clean);
                    }
                }
            });
            console.log('  Pattern ' + (idx + 1) + ': ' + (matches.length || 0) + ' matches');
        }
    });
}

// 3. Thêm các ảnh từ MOBILE_CONNECT (đã biết)
allImages.add('MOBILE_CONNECT/image/mm_switch_mobile_en.png');
allImages.add('MOBILE_CONNECT/image/mm_connecting_tv_en.png');

// 4. Lưu danh sách
const imageList = Array.from(allImages).sort();
const listPath = path.join(baseDir, 'image_list.txt');
fs.writeFileSync(listPath, imageList.join('\n'));

console.log('');
console.log('='.repeat(60));
console.log('📊 KẾT QUẢ:');
console.log('   Tổng số ảnh:', imageList.length);
console.log('   Đã lưu vào:', listPath);
console.log('');
console.log('📋 50 ảnh đầu tiên:');
imageList.slice(0, 50).forEach((img, idx) => {
    console.log('   ' + (idx + 1) + '. ' + img);
});

if (imageList.length > 50) {
    console.log('   ... và ' + (imageList.length - 50) + ' ảnh nữa');
}

console.log('');
console.log('✅ HOÀN THÀNH QUÉT!');
