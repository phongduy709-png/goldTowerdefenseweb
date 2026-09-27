const crypto = require('crypto');
const http = require('http');

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

// Payload giống game gửi
const payload = {
    UNIQ_ID: 'ATV91285',
    HOST_ID: '58owl85@gmail.com',
    LANG: 'ENG',
    COMMENT: 'test_guild_info',
    GICHAPO: 'test'
};

const DATA = encryptData(payload);
console.log('📤 Payload encrypted:', DATA.substring(0, 50) + '...');
console.log('');

// Endpoint 1: get_guild_info_for_war
const endpoints = [
    '/TOWERDEFENCE_COMMON/GUILD/get_guild_info_for_war_AES.php',
    '/TOWERDEFENCE_COMMON/GUILD/update_guild3_AES.php',
    '/TOWERDEFENCE_COMMON/GUILD/get_guild_stage_info_AES2_new.php'
];

function testEndpoint(path) {
    return new Promise((resolve) => {
        const body = 'DATA=' + encodeURIComponent(DATA);
        
        const req = http.request({
            hostname: '211.253.26.47',
            port: 8093,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'busidol.mobile.tower',
                'Content-Length': Buffer.byteLength(body)
            }
        }, (res) => {
            let b = '';
            res.on('data', (d) => b += d);
            res.on('end', () => {
                console.log('=== ' + path + ' ===');
                console.log('Status:', res.statusCode);
                console.log('Length:', b.length);
                console.log('Raw:', b.substring(0, 100));
                
                // Decrypt
                const dec = decryptData(b);
                if (dec) {
                    console.log('✅ Decrypted:', dec.substring(0, 500));
                } else {
                    console.log('❌ Decrypt failed');
                    console.log('Full body:', b.substring(0, 300));
                }
                console.log('');
                resolve();
            });
        });
        
        req.on('error', (e) => {
            console.log('=== ' + path + ' ===');
            console.log('❌ Error:', e.message);
            console.log('');
            resolve();
        });
        
        req.write(body);
        req.end();
    });
}

(async () => {
    for (const ep of endpoints) {
        await testEndpoint(ep);
    }
    console.log('Done');
})();
