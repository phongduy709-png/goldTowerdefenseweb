const fs = require('fs');
let content = fs.readFileSync('sever2.js', 'utf8');

// Tìm endpoint put_userinfo_hero_AES.php
const startIdx = content.indexOf("app.post('/put_userinfo_hero_AES.php'");
if (startIdx < 0) {
    console.log('❌ Không tìm thấy endpoint');
    process.exit(1);
}

const endIdx = content.indexOf("});", startIdx) + 3;

// Endpoint mới trả data đầy đủ
const newEndpoint = `app.post('/put_userinfo_hero_AES.php', function(req, res) {
    console.log('[API] put_userinfo_hero_AES.php');
    
    // Parse data từ req.body.DATA
    var postData = req.body.DATA || '';
    if (postData) {
        try {
            var dec = decryptData(postData);
            if (dec) {
                var p = JSON.parse(dec);
                console.log('[API] Received:');
                console.log('  SELECTED_HERO:', p.SELECTED_HERO);
                console.log('  SELECTED_HERO_MAX:', p.SELECTED_HERO_MAX);
                console.log('  BOU_HERO length:', p.BOU_HERO ? p.BOU_HERO.length : 0);
                
                if (p.BOU_HERO) STATE.bou_hero = p.BOU_HERO;
                if (p.SELECTED_HERO) STATE.selected_hero = p.SELECTED_HERO;
                if (p.SELECTED_HERO_MAX) STATE.selected_hero_max = p.SELECTED_HERO_MAX;
                
                // Sync selected với bou
                STATE.selected_hero = syncSelected(STATE.bou_hero, STATE.selected_hero, parseInt(STATE.selected_hero_max) || 9);
                console.log('[API] STATE.selected_hero:', STATE.selected_hero);
            }
        } catch(e) { console.log('[API] Decode error:', e.message); }
    }
    
    // TRẢ VỀ DATA ĐẦY ĐỦ
    var data = {
        RESULT: "OK",
        VALUE: {
            selected_hero: STATE.selected_hero,
            bou_hero: STATE.bou_hero,
            selected_hero_max: STATE.selected_hero_max,
            auto_skill: STATE.auto_skill
        }
    };
    var encrypted = encryptData(data);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(encrypted);
    console.log('[API] Sent:', encrypted.length, 'bytes');
});`;

content = content.substring(0, startIdx) + newEndpoint + content.substring(endIdx);

// Tương tự cho put_userinfo_tower_AES.php
const towerStartIdx = content.indexOf("app.post('/put_userinfo_tower_AES.php'");
if (towerStartIdx >= 0) {
    const towerEndIdx = content.indexOf("});", towerStartIdx) + 3;
    
    const newTower = `app.post('/put_userinfo_tower_AES.php', function(req, res) {
    console.log('[API] put_userinfo_tower_AES.php');
    
    var postData = req.body.DATA || '';
    if (postData) {
        try {
            var dec = decryptData(postData);
            if (dec) {
                var p = JSON.parse(dec);
                console.log('[API] Received:');
                console.log('  SELECTED_TOWER:', p.SELECTED_TOWER);
                console.log('  BOU_TOWER length:', p.BOU_TOWER ? p.BOU_TOWER.length : 0);
                
                if (p.BOU_TOWER) STATE.bou_tower = p.BOU_TOWER;
                if (p.SELECTED_TOWER) STATE.selected_tower = p.SELECTED_TOWER;
                
                STATE.selected_tower = syncSelected(STATE.bou_tower, STATE.selected_tower, 10);
                console.log('[API] STATE.selected_tower:', STATE.selected_tower);
            }
        } catch(e) { console.log('[API] Decode error:', e.message); }
    }
    
    var data = {
        RESULT: "OK",
        VALUE: {
            selected_tower: STATE.selected_tower,
            bou_tower: STATE.bou_tower,
            rainbow_card: STATE.rainbow_card
        }
    };
    var encrypted = encryptData(data);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(encrypted);
    console.log('[API] Sent:', encrypted.length, 'bytes');
});`;
    
    content = content.substring(0, towerStartIdx) + newTower + content.substring(towerEndIdx);
    console.log('✅ Đã sửa tower endpoint');
}

fs.writeFileSync('sever2.js', content);
console.log('✅ Đã sửa hero endpoint');
