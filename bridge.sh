#!/data/data/com.termux/files/usr/bin/bash
# bridge.sh - Gọi API và ghi response vào file

cd /storage/emulated/0/goldTowerdefenseweb

# Gọi API
RESPONSE=$(curl -s -X POST http://127.0.0.1:8080/get_user_data_all_AES2.php \
    -H "X-Requested-With: busidol.mobile.tower" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    --data-urlencode "DATA=test")

# Ghi raw response
echo "$RESPONSE" > bridge_response.txt

# Decrypt bằng Node.js
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
}
" "$RESPONSE"

echo "✅ Đã ghi bridge_decrypted.json"
