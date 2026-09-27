#!/data/data/com.termux/files/usr/bin/bash
# bridge_loop.sh - Gọi API 1 lần khi khởi động

cd /storage/emulated/0/goldTowerdefenseweb

echo "🔄 Bridge - Gọi API 1 lần"

# Xóa file cũ
rm -f bridge_decrypted.json

# Gọi API
RESPONSE=$(curl -s -X POST http://127.0.0.1:8080/get_user_data_all_AES2.php \
    -H "X-Requested-With: busidol.mobile.tower" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    --data-urlencode "DATA=test")

if [ -z "$RESPONSE" ] || [ ${#RESPONSE} -lt 100 ]; then
    echo "❌ API không trả về dữ liệu"
    exit 1
fi

echo "📦 Nhận response: ${#RESPONSE} bytes"

# Decrypt
node -e "
const crypto = require('crypto');
const fs = require('fs');
const key = Buffer.from('gksekfidjrqjfwk1', 'utf8');
const iv = Buffer.from('towerdefense_amo', 'utf8');
const enc = process.argv[1].trim();
try {
    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    let dec = decipher.update(enc, 'base64', 'utf8') + decipher.final('utf8');
    dec = dec.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
    fs.writeFileSync('bridge_decrypted.json', dec);
    console.log('✅ Decrypted: ' + dec.length + ' bytes');
} catch(e) {
    console.log('❌ Error: ' + e.message);
    process.exit(1);
}
" "$RESPONSE"

echo "✅ Đã ghi bridge_decrypted.json"
