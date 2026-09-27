const crypto = require('crypto');
const http = require('http');

const KGET = Buffer.from('gksekfidjrqjfwk1', 'utf8');
const IVGET = Buffer.from('towerdefense_amo', 'utf8');

function enc(d) {
    const c = crypto.createCipheriv('aes-128-cbc', KGET, IVGET);
    return c.update(JSON.stringify(d).replace(/\s+/g, ''), 'utf8', 'base64') + c.final('base64');
}
function dec(d) {
    try {
        const c = crypto.createDecipheriv('aes-128-cbc', KGET, IVGET);
        return (c.update(d.trim(), 'base64', 'utf8') + c.final('utf8')).replace(/[\x00-\x1F\x7F-\x9F]/g, '');
    } catch(e) { return null; }
}

const payload = {
    UNIQ_ID: 'ATV91285',
    HOST_ID: '58owl85@gmail.com',
    LANG: 'ENG',
    COMMENT: 'test_guild',
    GICHAPO: 'test'
};

const DATA = enc(payload);
const body = 'DATA=' + encodeURIComponent(DATA);

const endpoints = [
    '/TOWERDEFENCE_COMMON/GUILD/get_guild_boss_AES2.php',
    '/TOWERDEFENCE_COMMON/GUILD/get_guild_info_for_war_AES.php',
    '/TOWERDEFENCE_COMMON/GUILD/update_guild3_AES.php'
];

function test(path) {
    return new Promise((resolve) => {
        const req = http.request({
            hostname: '211.253.26.47', port: 8093,
            path: path, method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'busidol.mobile.tower',
                'Content-Length': Buffer.byteLength(body)
            }
        }, (res) => {
            let b = '';
            res.on('data', d => b += d);
            res.on('end', () => {
                console.log('=== ' + path + ' ===');
                console.log('HTTP:', res.statusCode, '| Len:', b.length);
                const d = dec(b);
                if (d) console.log('✅ Decoded:', d.substring(0, 400));
                else console.log('❌ Decrypt fail | Raw:', b.substring(0, 200));
                console.log('');
                resolve();
            });
        });
        req.on('error', e => { console.log('❌ ' + path + ':', e.message); resolve(); });
        req.write(body);
        req.end();
    });
}

(async () => {
    for (const ep of endpoints) await test(ep);
    console.log('Done');
})();
