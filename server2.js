// ==================== GOLD TOWER DEFENSE SERVER (LOCAL) ====================
const express = require('express');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const { exec } = require('child_process');
const querystring = require('querystring');
const http = require('http');

const app = express();
const PORT = 8080;
const USER_DATA_FILE = path.join(__dirname, 'user_data.json');
const MAX_LOGS = 10000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

app.use((req, res, next) => {
    if (!req.originalUrl.match(/\.(js|css|png|jpg|jpeg|gif|ico|woff|woff2|ttf|mp3|wav|ogg|json)$/i)) {
        console.log('[' + new Date().toISOString() + '] ' + req.method + ' -> ' + req.originalUrl);
    }
    next();
});

// ==================== AES ====================
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

// ==================== USER DATA ====================
function loadUserData() {
    if (fs.existsSync(USER_DATA_FILE)) {
        try { return JSON.parse(fs.readFileSync(USER_DATA_FILE, 'utf8')); } catch(e) { return null; }
    }
    return null;
}

function saveUserData(data) {
    data.last_updated = new Date().toISOString();
    if (!data.action_log) data.action_log = [];
    if (data.action_log.length > MAX_LOGS) data.action_log = data.action_log.slice(-MAX_LOGS);
    fs.writeFileSync(USER_DATA_FILE, JSON.stringify(data, null, 2));
}

function logAction(action, details) {
    var data = loadUserData() || { action_log: [] };
    if (!data.action_log) data.action_log = [];
    data.action_log.push({ time: new Date().toISOString(), action: action, details: details });
    if (data.action_log.length > MAX_LOGS) data.action_log = data.action_log.slice(-MAX_LOGS);
    saveUserData(data);
}

// ==================== DATA MẶC ĐỊNH ====================
const DEF_TOWER = '6032:1:1,6028:1:2,6027:1:2,6025:1:1,6021:1:1,6020:1:1,5048:1:1,5047:1:1,5046:1:1,5044:1:1,5040:2:0,5039:1:1,5038:2:0,5037:2:0,5036:1:1,5035:2:1,5034:2:1,5033:3:1,5032:2:2,5031:3:2,5030:3:1,5029:3:0,5026:5:0,5024:2:3,5023:3:2,5022:2:4,5020:1:1,5019:2:2,5018:3:3,5017:2:1,5016:2:1,5015:2:1,5014:2:1,5013:2:0,5012:2:0,5011:3:3,5010:3:1,5009:2:0,5008:2:5,5007:3:1,5006:3:1,5005:2:2,5004:3:3,5003:3:1,5002:2:0,5001:3:1,4033:1:24,4032:3:18,4031:5:24,4030:3:29,4029:3:32,4027:5:0,4026:3:0,4025:5:3,4024:1:25,4023:1:30,4022:1:48,4021:1:19,4020:2:13,4019:1:13,4018:2:15,4017:1:29,4016:1:19,4015:1:43,4014:1:35,4013:1:41,4012:1:25,4011:1:38,4010:1:14,4009:3:17,4008:1:13,4007:1:19,4006:4:5,4005:5:14,4004:5:11,4003:1:28,4002:1:33,4001:1:26,3027:1:96,3026:1:167,3025:1:32,3024:2:146,3023:4:206,3022:2:168,3021:1:151,3020:1:42,3019:3:154,3018:5:175,3017:5:181,3016:4:171,3015:3:159,3014:5:131,3013:4:162,3012:5:162,3011:4:190,3010:5:162,3009:4:132,3008:3:167,3007:2:163,3006:3:155,3005:2:181,3004:1:119,3003:1:175,3002:5:148,3001:3:169,2027:1:79,2026:5:112,2025:1:15,2024:5:120,2023:1:134,2022:2:108,2021:2:158,2020:1:17,2019:4:156,2018:1:126,2017:4:125,2016:4:160,2015:5:178,2014:3:124,2013:5:156,2012:5:145,2011:4:126,2010:1:131,2009:3:159,2008:5:140,2007:1:151,2006:1:124,2005:1:135,2004:1:58,2003:1:128,2002:2:131,2001:2:121,1027:1:112,1026:5:127,1025:1:38,1024:2:137,1023:2:130,1022:2:172,1021:5:115,1020:1:118,1019:4:129,1018:5:140,1017:5:119,1016:5:150,1015:5:168,1014:5:124,1013:5:164,1012:5:154,1011:4:117,1010:2:141,1009:5:140,1008:5:165,1007:1:102,1006:5:150,1005:3:140,1004:1:124,1003:4:145,1002:1:112,1001:1:137';

const DEF_TOWER_SEL = '5037,5038,5039,5040,5001';
const DEF_HERO = '1:70:77519326:1,2:70:77519326:1,3:70:77519326:1,4:90:83753386:1,5:90:83753386:1,6:90:83753386:1,7:90:1141637:1,8:90:1141637:1,9:90:1141637:1,10:50:373747:1,11:50:373747:1,12:50:373747:1,13:60:624529:1,14:60:624529:1,15:60:624529:1,16:1:0:1,17:1:0:1,18:1:0:0,19:60:1694958:1,20:60:1694958:1,21:60:1694958:1,22:130:248670:1,23:130:248670:1,24:130:248670:1,25:1:0:0,26:1:0:1,27:1:0:0,28:31:3786:1,29:31:3786:1,30:31:3786:1,31:200:24500589:1,32:200:24500589:1,33:200:24500589:1,34:150:1414241:1,35:150:1414241:1,36:150:1414241:1,37:66:20628949:1,38:66:20628949:1,39:66:20628949:1,40:53:9578282:1,41:53:9578282:1,42:53:9578282:1,43:1:0:1,44:1:0:1,45:1:0:1,46:60:42268100:1,47:60:42268100:1,48:60:42268100:1,49:52:0:1,50:52:0:1,51:52:0:1,52:51:796102:1,53:51:796102:1,54:51:796102:1,55:53:3247961:1,56:53:3247961:1,57:53:3247961:1,58:54:4934274:1,59:54:4934274:1,60:54:4934274:1,61:52:24413:1,62:52:24413:1,63:52:24413:1,64:51:303960:1,65:51:303960:1,66:51:303960:1,67:55:268200:1,68:55:268200:1,69:55:268200:1';

const DEF_HERO_SEL = '38,41,50,53,56';
const DEF_HERO_MAX = '5';

function makeDefaultData() {
    var now = new Date();
    return {
        RESULT: 'OK',
        VALUE: {
            black_list: { result: 'NONE', value: 'ok' },
            normal: { result: 'OK', value: { UNIQ_ID: 'TDM270533qAb', HOST_ID: 'le0912760@gmail.com', USER_NAME: 'QuAnDepZ', USER_NAME2: 'Green72', SO_CODE: '1', MODEL_NAME: 'V2026', COUNTRY: 'VN', LANG: '3', IP: '127.0.0.1', PLATFORM: 'AMO', VERSION: 'TD_AMO_20240621', SOUND_BGM: '1', SOUND_EFFECT: '1', SAFEMODE: '0', CHUL_DATE: String(now.getFullYear()) + ('0'+(now.getMonth()+1)).slice(-2) + ('0'+now.getDate()).slice(-2), CHUL_NUM: '1', GUIDE_LINE: '0', GACHA_TIME: '0', LEVEL: '1', LEVEL_EXP: '0', IS_NUMKEY: '0', VIBRATION: '1', SHORTCUT: 'QWERT1234567809', IS_AUTO_ATTACK: '1' } },
            stage: { result: 'OK', value: { DATA_EASY: Array(80).fill('C').join(',') + ',T', DATA_NORMAL: Array(80).fill('C').join(',') + ',T', DATA_HARD: Array(80).fill('C').join(',') + ',T' } },
            rubydiagold: { result: 'OK', value: { RUBY: '50000', DIA: '50000', GOLD: '5000000', MILEAGE: '0', MAGIC: '1000', P_TICKET: '0', N_TICKET: '0' } },
            tower: { result: 'OK', value: { selected_tower: DEF_TOWER_SEL, bou_tower: DEF_TOWER, rainbow_card: '114' } },
            hero: { result: 'OK', value: { selected_hero: DEF_HERO_SEL, bou_hero: DEF_HERO, selected_hero_max: DEF_HERO_MAX, auto_skill: '0' } },
            item: { result: 'OK', value: '1:0,2:0,3:0,4:0,5:0' },
            charbook: { result: 'OK', value: { tower: '0', hero: '0', monster: '0' } },
            quest: { result: 'OK', value: { weekly: '0:0,0:0,0:0,0:0,0:0,0:0,0:0,0:0,0:0,0:0' } },
            gongji: { result: 'OK', value: '' },
            mailbox: { result: 'NONE', value: '' },
            upgrade: { result: 'OK', value: '0,0,0' },
            payinfo: { result: 'OK', value: { payor_user: 0, monthly_pay_is: 0 } },
            etc: { result: 'OK', value: { timestamp: String(Date.now()), year: String(now.getFullYear()), mon: ('0'+(now.getMonth()+1)).slice(-2), day: ('0'+now.getDate()).slice(-2), hour: ('0'+now.getHours()).slice(-2), min: ('0'+now.getMinutes()).slice(-2), sec: ('0'+now.getSeconds()).slice(-2), yoil: String(now.getDay()), week: '1', gichapo: '', run_count: 1, attendance_event: { TOT_STAMP: '0', ATT_STAMP: '0', DAY_STAMP: '0', PVP_STAMP: '0', REWARD_STAMP: '0', PVP_COUNT: '0', SHOW_STAMP: '0' }, adinfo_REWARD_MAIN_count: 0, adinfo_REWARD_ITEM_count: 0 } },
            daytry: { result: 'OK', value: { ticket: '3', easy: '0', normal: '0', hard: '0' } },
            guild: { result: 'OK', value: { bunho: '0', name: '', jang: '0', date_join: '2000-01-01 00:00:00', date_leave: '2000-01-01 00:00:00', date_kick: '2000-01-01 00:00:00', date_request: '2000-01-01 00:00:00', message: '', stage_buff_cnt: '0', buffer: '0' } },
            opt_in_count: 0, honeygain_opt_in: 0, honeygain_opt_in_count: 0,
            travel: { result: 'NONE' },
            myths: { result: 'OK', value: { pass: '0000-00-00 00:00:00', floor: '1', max_clear: '0', max_first_clear: '0', soul: '0', reward: '0:0:0', quest: '0:0,0:0,0:0,0:0,0:0,0:0,0:0,0:0,0:0,0:0' }, result2: 'OK', value2: { soul: '0', quest: '0:0,0:0,0:0,0:0,0:0,0:0,0:0,0:0,0:0,0:0' }, value3: { soul_arr: '0,0,0,0,0,0,0,0,0,0' } },
            segong: { result: 'NONE' },
            draw_mileage: { value: { nun_mileage: 0, blossom_mileage: 0, thorn_mileage: 0, orchid_mileage: 0, mum_mileage: 0, bamboo_mileage: 0, wolf_mileage: 0 }, result: 'OK' },
            gichapo: 'TD6KBOHX',
            unit: { result: 'OK', value: { selected_unit: '0,0,0,0,0,0,0,0', bou_unit: '1:1:0,2:1:0,3:1:0,4:1:0,5:1:0,6:1:0,7:1:0,8:1:0,9:1:0,10:1:0,11:1:0,12:1:0,13:1:0,14:1:0' } },
            is_test_play_id: false, has_user_key: 'no', user_key_remain_time: 0,
            ad_user_exp_time: '', ad_user_exp_multi: 10, ad_user_new: true
        },
        COMMENT: 'empty'
    };
}

function syncSelected(bouStr, selectedStr, maxCount) {
    if (selectedStr && selectedStr.indexOf("|") >= 0) return selectedStr;
    if (!bouStr) return selectedStr || '';
    var bouIds = bouStr.split(',').map(function(item) { return item.split(':')[0]; }).filter(function(id) { return id && id !== '0'; });
    var selectedIds = selectedStr ? selectedStr.split(',').filter(function(id) { return id && id !== '0'; }) : [];
    var newSelected = selectedIds.filter(function(id) { return bouIds.indexOf(id) >= 0; });
    if (maxCount && newSelected.length > maxCount) newSelected = newSelected.slice(0, maxCount);
    return newSelected.join(',');
}

// ==================== BRIDGE-REQUEST ====================
app.post('/bridge-request', function(req, res) {
    console.log('[BRIDGE] Request');
    var existingData = loadUserData();
    var fullData;
    if (existingData && existingData.raw) {
        fullData = existingData.raw;
        if (fullData.VALUE.tower.value.bou_tower) {
            fullData.VALUE.tower.value.selected_tower = syncSelected(fullData.VALUE.tower.value.bou_tower, fullData.VALUE.tower.value.selected_tower, 10);
        }
        if (fullData.VALUE.hero.value.bou_hero) {
            fullData.VALUE.hero.value.selected_hero = syncSelected(fullData.VALUE.hero.value.bou_hero, fullData.VALUE.hero.value.selected_hero, parseInt(fullData.VALUE.hero.value.selected_hero_max) || 5);
        }
    } else {
        fullData = makeDefaultData();
        saveUserData({ profile: fullData.VALUE.normal.value, tower: fullData.VALUE.tower.value, hero: fullData.VALUE.hero.value, rubydiagold: fullData.VALUE.rubydiagold.value, stage: fullData.VALUE.stage.value, raw: fullData, action_log: [] });
        logAction('CREATE_USER_DATA', {});
    }
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.send(JSON.stringify(fullData));
});

// ==================== BRIDGE-PUT ====================
app.post('/bridge-put', function(req, res) {
    console.log('[BRIDGE-PUT] Request');
    var endpoint = req.body.endpoint;
    var postData = req.body.data;
    if (!endpoint || !postData) return res.status(400).json({ error: 'Missing' });
    var dec = decryptData(postData);
    if (!dec) return res.status(400).json({ error: 'decrypt failed' });
    try {
        var p = JSON.parse(dec);
        var data = loadUserData();
        if (!data || !data.raw) data = { raw: makeDefaultData(), action_log: [] };
        if (endpoint.indexOf('tower') >= 0) {
            if (p.BOU_TOWER) data.raw.VALUE.tower.value.bou_tower = p.BOU_TOWER;
            if (p.SELECTED_TOWER !== undefined) data.raw.VALUE.tower.value.selected_tower = p.SELECTED_TOWER;
            data.raw.VALUE.tower.value.selected_tower = syncSelected(data.raw.VALUE.tower.value.bou_tower, data.raw.VALUE.tower.value.selected_tower, 10);
            logAction('UPDATE_TOWER', { selected: data.raw.VALUE.tower.value.selected_tower });
            saveUserData(data);
            res.json({ RESULT: 'OK', VALUE: data.raw.VALUE.tower.value });
        } else if (endpoint.indexOf('hero') >= 0) {
            if (p.BOU_HERO) data.raw.VALUE.hero.value.bou_hero = p.BOU_HERO;
            if (p.SELECTED_HERO !== undefined) data.raw.VALUE.hero.value.selected_hero = p.SELECTED_HERO;
            if (p.SELECTED_HERO_MAX) data.raw.VALUE.hero.value.selected_hero_max = p.SELECTED_HERO_MAX;
            data.raw.VALUE.hero.value.selected_hero = syncSelected(data.raw.VALUE.hero.value.bou_hero, data.raw.VALUE.hero.value.selected_hero, parseInt(data.raw.VALUE.hero.value.selected_hero_max) || 5);
            logAction('UPDATE_HERO', { selected: data.raw.VALUE.hero.value.selected_hero });
            saveUserData(data);
            res.json({ RESULT: 'OK', VALUE: data.raw.VALUE.hero.value });
        } else {
            res.json({ RESULT: 'OK', VALUE: { result: 'OK' } });
        }
    } catch(e) {
        res.status(500).json({ error: e.message });
    }
});

// ==================== PHP SIM: TOWER ====================
app.post('/put_userinfo_tower_AES.php', function(req, res) {
    console.log('[PHP-SIM] 📥 Tower request');
    try {
        var encBody = req.body.DATA;
        if (!encBody) return res.send('ERROR: Missing DATA');
        var dec = decryptData(encBody);
        if (!dec) return res.send('ERROR: decrypt failed');
        var p = JSON.parse(dec);
        
        var data = loadUserData();
        if (!data || !data.raw) data = { raw: makeDefaultData(), action_log: [] };
        
        if (p.BOU_TOWER) data.raw.VALUE.tower.value.bou_tower = p.BOU_TOWER;
        if (p.SELECTED_TOWER !== undefined) data.raw.VALUE.tower.value.selected_tower = p.SELECTED_TOWER;
        data.raw.VALUE.tower.value.selected_tower = syncSelected(data.raw.VALUE.tower.value.bou_tower, data.raw.VALUE.tower.value.selected_tower, 10);
        logAction('PHP_SIM_TOWER', { selected: data.raw.VALUE.tower.value.selected_tower, comment: p.COMMENT });
        saveUserData(data);
        
        var response = { RESULT: 'OK', VALUE: data.raw.VALUE.tower.value };
        res.send(encryptData(response));
    } catch(e) {
        res.send('ERROR: ' + e.message);
    }
});

// ==================== PHP SIM: HERO ====================
app.post('/put_userinfo_hero_AES.php', function(req, res) {
    console.log('[PHP-SIM] 📥 Hero request');
    try {
        var encBody = req.body.DATA;
        if (!encBody) return res.send('ERROR: Missing DATA');
        var dec = decryptData(encBody);
        if (!dec) return res.send('ERROR: decrypt failed');
        var p = JSON.parse(dec);
        
        var data = loadUserData();
        if (!data || !data.raw) data = { raw: makeDefaultData(), action_log: [] };
        
        if (p.BOU_HERO) data.raw.VALUE.hero.value.bou_hero = p.BOU_HERO;
        if (p.SELECTED_HERO !== undefined) data.raw.VALUE.hero.value.selected_hero = p.SELECTED_HERO;
        if (p.SELECTED_HERO_MAX) data.raw.VALUE.hero.value.selected_hero_max = p.SELECTED_HERO_MAX;
        if (data.raw.VALUE.hero.value.selected_hero && data.raw.VALUE.hero.value.selected_hero.indexOf("|") >= 0) {
            // Giữ nguyên
        } else {
            data.raw.VALUE.hero.value.selected_hero = syncSelected(data.raw.VALUE.hero.value.bou_hero, data.raw.VALUE.hero.value.selected_hero, parseInt(data.raw.VALUE.hero.value.selected_hero_max) || 5);
        }
        
        logAction('PHP_SIM_HERO', { selected: data.raw.VALUE.hero.value.selected_hero });
        saveUserData(data);
        
        res.send(encryptData({ RESULT: 'OK', VALUE: data.raw.VALUE.hero.value }));
    } catch(e) {
        res.send('ERROR: ' + e.message);
    }
});

// ==================== PHP SIM: MISSION/QUEST ====================
app.post('/put_userinfo_mission_AES.php', function(req, res) {
    console.log('[MISSION] 📥 Request');
    try {
        var encBody = req.body.DATA;
        if (!encBody) return res.send('ERROR: Missing DATA');
        var dec = decryptData(encBody);
        if (!dec) return res.send('ERROR: decrypt failed');
        var p = JSON.parse(dec);

        var data = loadUserData();
        if (!data || !data.raw) data = { raw: makeDefaultData(), action_log: [] };

        if (p.WEEKLY !== undefined) {
            data.raw.VALUE.quest.value.weekly = p.WEEKLY;
        }

        logAction('PHP_SIM_MISSION', { comment: p.COMMENT, weekly: p.WEEKLY });
        saveUserData(data);

        var response = {
            RESULT: 'OK',
            VALUE: {
                weekly: data.raw.VALUE.quest.value.weekly || '',
                reward: '0'
            }
        };

        res.send(encryptData(response));
    } catch(e) {
        res.send('ERROR: ' + e.message);
    }
});

// ==================== GET USER DATA ALL ====================
app.post('/get_user_data_all_AES2.php', function(req, res) {
    console.log('[USER-DATA-ALL] 📥 Request');
    try {
        var data = loadUserData();
        if (!data || !data.raw) {
            data = { raw: makeDefaultData(), action_log: [] };
            saveUserData(data);
        }
        
        var raw = data.raw;
        
        if (raw.VALUE.tower && raw.VALUE.tower.value && raw.VALUE.tower.value.bou_tower) {
            var t = raw.VALUE.tower.value;
            var bouIds = t.bou_tower.split(',').map(function(x){ return x.split(':')[0]; }).filter(Boolean);
            var selIds = t.selected_tower ? t.selected_tower.split('|')[0].split(',').filter(Boolean) : [];
            var newSel = selIds.filter(function(id){ return bouIds.indexOf(id) >= 0; }).slice(0, 10);
            if (!t.selected_tower || t.selected_tower.indexOf('|') < 0) {
                t.selected_tower = newSel.join(',');
            }
        }
        
        res.send(encryptData(raw));
    } catch(e) {
        res.send('ERROR: ' + e.message);
    }
});

// ==================== PROXY GUILD (cho server thật) ====================
app.use('/proxy-guild', function(req, res) {
    var targetPath = req.originalUrl.replace('/proxy-guild', '');
    
    console.log('[PROXY-GUILD] 📥', req.method, targetPath);
    
    var options = {
        hostname: '211.253.26.47',
        port: 8093,
        path: targetPath,
        method: req.method,
        headers: Object.assign({}, req.headers, {
            'Host': '211.253.26.47:8093'
        })
    };
    
    delete options.headers['host'];
    
    var proxyReq = http.request(options, function(proxyRes) {
        console.log('[PROXY-GUILD] ←', proxyRes.statusCode);
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        Object.keys(proxyRes.headers).forEach(function(key) {
            if (key !== 'access-control-allow-origin') {
                res.setHeader(key, proxyRes.headers[key]);
            }
        });
        
        res.writeHead(proxyRes.statusCode);
        proxyRes.pipe(res);
    });
    
    proxyReq.on('error', function(e) {
        console.error('[PROXY-GUILD] ❌', e.message);
        res.status(500).json({ error: e.message });
    });
    
    if (req.body && Object.keys(req.body).length > 0) {
        var bodyStr = querystring.stringify(req.body);
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyStr));
        proxyReq.write(bodyStr);
    }
    
    proxyReq.end();
});

// ==================== GUILD LOCAL API ====================
var GUILD_DATA = {
    bunho: 31834,
    name: 'Sunflower',
    jang: 0,
    leader_uniq: 'ATV91285',
    member: 1,
    max_member: 30,
    buffer: 5,
    stage_buff_cnt: 1,
    guild_gold: 1000000,
    guild_point: 10000,
    guild_notice: 'Chào mừng!',
    type: 1,
    flag: { color: 1, flag: 0, symbol: 0, word: 0 },
    amulet: { q1: 0, q2: 0, q3: 0, q4: 0 },
    quest: { q1: 0, q2: 0, q3: 0, q4: 0 },
    member_list: {
        1: {
            un: 'ATV91285', name: 'Sunflower', jang: 0,
            lv: 3636, level: 3636, exp: 0,
            ti: '2026-04-01 21:21:29',
            last_login: '2026-09-23 12:00:00',
            today: 0, reward: 0
        }
    },
    chat_list: {},
    boss_data: { level: 1, hp: 0, max_hp: 100, score: 0 },
    war_data: { score: 0, rank: 0 },
    stage_data: { stage: 0, clear: 0 },
    territory_data: {}
};

function respondGuild(res, data) {
    var response = { RESULT: 'OK', VALUE: data };
    res.send(encryptData(response));
}

// WILDCARD match mọi URL có chứa TOWERDEFENCE_COMMON/GUILD (bao gồm ../)
// Dùng regex vì Express 5 không hỗ trợ *pattern
app.all(/TOWERDEFENCE_COMMON\/GUILD\//, function(req, res) {
    var originalUrl = req.originalUrl || req.url;
    var cleanUrl = originalUrl
        .replace(/\/\.\.\//g, '/')
        .replace(/\/\.\//g, '/')
        .replace(/\/{2,}/g, '/');
    
    console.log('[GUILD-LOCAL] 📥 Original:', originalUrl.substring(0, 150));
    console.log('[GUILD-LOCAL] 📥 Clean:', cleanUrl.substring(0, 150));
    
    var url = cleanUrl;
    
    if (url.indexOf('get_guild_boss') >= 0 || url.indexOf('put_guild_boss') >= 0) {
        return respondGuild(res, GUILD_DATA.boss_data);
    }
    if (url.indexOf('stage_info') >= 0) {
        return respondGuild(res, GUILD_DATA.stage_data);
    }
    if (url.indexOf('territory') >= 0) {
        return respondGuild(res, GUILD_DATA.territory_data);
    }
    if (url.indexOf('chat') >= 0) {
        return respondGuild(res, { result: 'OK', chat_list: {} });
    }
    if (url.indexOf('notice') >= 0) {
        return respondGuild(res, { result: 'OK', notice: '' });
    }
    if (url.indexOf('quest') >= 0) {
        return respondGuild(res, GUILD_DATA.quest);
    }
    if (url.indexOf('update_guild_user') >= 0) {
        return respondGuild(res, GUILD_DATA.member_list[1]);
    }
    if (url.indexOf('check_guild_name') >= 0) {
        return respondGuild(res, { result: 'OK', duplicate: false });
    }
    if (url.indexOf('guildwar_score') >= 0) {
        return respondGuild(res, { result: 'OK', score: 0 });
    }
    if (url.indexOf('guild_info_for_war') >= 0) {
        var warData = Object.assign({}, GUILD_DATA, {
            guild_war: 1,
            war_start_time: '2026-09-23 00:00:00',
            war_end_time: '2026-09-30 00:00:00',
            war_rank: 1,
            war_score: 0
        });
        return respondGuild(res, warData);
    }
    respondGuild(res, GUILD_DATA);
});

console.log('[GUILD-LOCAL] ✅ Đã thêm wildcard endpoint guild');

// ==================== GACHA ====================
var GACHA_POOL = [];

GACHA_POOL.push("6019", "6020", "6021", "6025", "6026", "6027", "6028", "6029", "6030");
GACHA_POOL.push("6031", "6032", "6033", "6034", "6035", "6036", "6037", "6038", "6039");
GACHA_POOL.push("6040", "6041", "6042", "6043", "6044", "6045");
GACHA_POOL.push("7034", "7035", "7036", "7037", "7038", "7039", "7040", "7041", "7042", "7043", "7044", "7045");

console.log("[GACHA] Pool có", GACHA_POOL.length, "tháp");

function pickRandomTowers(count) {
    var picks = [];
    for (var i = 0; i < count; i++) {
        picks.push(GACHA_POOL[Math.floor(Math.random() * GACHA_POOL.length)]);
    }
    return picks;
}

app.post("/put_userinfo_gacha_AES2.php", function(req, res) {
    console.log("[GACHA] 📥 Request");
    try {
        var encBody = req.body.DATA;
        if (!encBody) return res.send("ERROR: Missing DATA");
        var dec = decryptData(encBody);
        if (!dec) return res.send("ERROR: decrypt failed");
        var p = JSON.parse(dec);

        var comment = String(p.COMMENT || "");
        var is10 = /10+1|pay10|10pull/i.test(comment);
        var isPay = /:pay|:pay10/i.test(comment) && !/free/i.test(comment);
        var isFree = /free|무료/i.test(comment);

        var data = loadUserData();
        if (!data || !data.raw) data = { raw: makeDefaultData(), action_log: [] };

        var cost = 0;
        var count = 1;

        if (isPay) {
            if (is10) { cost = 3000; count = 10; }
            else { cost = 300; count = 1; }
        } else if (isFree) {
            cost = 0; count = 1;
        } else {
            cost = 300; count = 1;
        }

        var ruby = parseInt(data.raw.VALUE.rubydiagold.value.RUBY) || 0;
        if (cost > 0 && ruby < cost) {
            return res.send(encryptData({ RESULT: "ERROR", VALUE: "Not enough ruby" }));
        }

        if (cost > 0) {
            data.raw.VALUE.rubydiagold.value.RUBY = String(ruby - cost);
        }

        var picks = pickRandomTowers(count);

        var bou = data.raw.VALUE.tower.value.bou_tower || "";
        var bouIds = bou.split(",").map(function(x){ return x.split(":")[0]; });
        picks.forEach(function(id) {
            if (bouIds.indexOf(id) < 0) {
                bou += (bou ? "," : "") + id + ":1:0";
                bouIds.push(id);
            }
        });
        data.raw.VALUE.tower.value.bou_tower = bou;

        saveUserData(data);

        res.send(encryptData({
            RESULT: "OK",
            VALUE: {
                result: picks.join(","),
                gage: 1,
                ad_time: 0,
                soul_arr: [0,0,0,0,0,0,0,0,0,0,0],
                selected_tower: data.raw.VALUE.tower.value.selected_tower,
                bou_tower: data.raw.VALUE.tower.value.bou_tower,
                rainbow_card: data.raw.VALUE.tower.value.rainbow_card || "114",
                RUBY: data.raw.VALUE.rubydiagold.value.RUBY,
                DIA: data.raw.VALUE.rubydiagold.value.DIA
            }
        }));
    } catch(e) {
        res.send("ERROR: " + e.message);
    }
});

// ==================== RUN node -e ====================
function runNodeE(payload, phpEndpoint) {
    return new Promise((resolve) => {
        var payloadJson = JSON.stringify(payload);
        var endpoint = phpEndpoint || '/put_userinfo_tower_AES.php';
        
        var nodeCode = [
            'const crypto = require("crypto");',
            'const http = require("http");',
            'const KGET = Buffer.from("gksekfidjrqjfwk1", "utf8");',
            'const IVGET = Buffer.from("towerdefense_amo", "utf8");',
            'function enc(d) { const c = crypto.createCipheriv("aes-128-cbc", KGET, IVGET); return c.update(JSON.stringify(d).replace(/\\s+/g, ""), "utf8", "base64") + c.final("base64"); }',
            'function dec(d) { const c = crypto.createDecipheriv("aes-128-cbc", KGET, IVGET); return (c.update(d.trim(), "base64", "utf8") + c.final("utf8")).replace(/[\\x00-\\x1F\\x7F-\\x9F]/g, ""); }',
            'var payload = ' + payloadJson + ';',
            'var body = "DATA=" + encodeURIComponent(enc(payload));',
            'var req = http.request({ hostname: "127.0.0.1", port: 8080, path: "' + endpoint + '", method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", "X-Requested-With": "busidol.mobile.tower", "Content-Length": Buffer.byteLength(body) } }, function(res) {',
            '  var b = "";',
            '  res.on("data", function(d) { b += d; });',
            '  res.on("end", function() {',
            '    console.log("=== STATUS:", res.statusCode, "| LENGTH:", b.length, "===");',
            '    try { console.log(dec(b)); } catch(e) { console.log("[RAW]", b); }',
            '  });',
            '});',
            'req.on("error", function(e) { console.log("❌ Lỗi:", e.message); });',
            'req.write(body);',
            'req.end();'
        ].join('\n');
        
        var tmpFile = path.join(__dirname, '_tmp_node_e.js');
        fs.writeFileSync(tmpFile, nodeCode, 'utf8');
        
        var cmd = 'node ' + tmpFile;
        
        exec(cmd, { timeout: 30000, maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
            try { fs.unlinkSync(tmpFile); } catch(e) {}
            
            if (error) {
                resolve({ ok: false, error: error.message, stdout: stdout, stderr: stderr });
                return;
            }
            resolve({ ok: true, stdout: stdout, stderr: stderr });
        });
    });
}

// ==================== API: LẮP THÁP ====================
app.post('/api/lap-thap', async function(req, res) {
    try {
        var body = req.body;
        if (!body.SELECTED_TOWER) return res.json({ ok: false, error: 'SELECTED_TOWER rỗng' });
        
        var payload = {
            UNIQ_ID: body.UNIQ_ID || 'TDM270533qAb',
            HOST_ID: body.HOST_ID || 'le0912760@gmail.com',
            SELECTED_TOWER: body.SELECTED_TOWER,
            BOU_TOWER: body.BOU_TOWER || '',
            RUN_COUNT: 0,
            COMMENT: body.COMMENT || ('Lắp ' + body.SELECTED_TOWER.split(',').length + ' tháp'),
            MOBILE_CONNECT: '',
            GICHAPO: '선택된서버:베트남서버 ping:63ms'
        };
        
        var result = await runNodeE(payload, '/put_userinfo_tower_AES.php');
        res.json({ ok: result.ok, action: 'LAP', payload: payload, output: result.stdout, stderr: result.stderr, error: result.error });
    } catch(e) {
        res.status(500).json({ ok: false, error: e.message });
    }
});

// ==================== API: THÁO THÁP ====================
app.post('/api/thao-thap', async function(req, res) {
    try {
        var body = req.body;
        var finalSelected = body.SELECTED_TOWER || '';
        
        if (body.REMOVE_ALL === true) {
            finalSelected = '';
        } else if (body.REMOVE_IDS) {
            var removeList = body.REMOVE_IDS.split(',').map(function(s) { return s.trim(); }).filter(Boolean);
            var currentList = (body.SELECTED_TOWER || '').split(',').map(function(s) { return s.trim(); }).filter(Boolean);
            finalSelected = currentList.filter(function(id) { return removeList.indexOf(id) < 0; }).join(',');
        }
        
        var payload = {
            UNIQ_ID: body.UNIQ_ID || 'TDM270533qAb',
            HOST_ID: body.HOST_ID || 'le0912760@gmail.com',
            SELECTED_TOWER: finalSelected,
            BOU_TOWER: body.BOU_TOWER || '',
            RUN_COUNT: 0,
            COMMENT: body.COMMENT || (body.REMOVE_ALL ? 'Tháo TẤT CẢ tháp' : ('Tháo: ' + body.REMOVE_IDS)),
            MOBILE_CONNECT: '',
            GICHAPO: '선택된서버:베트남서버 ping:63ms'
        };
        
        var result = await runNodeE(payload, '/put_userinfo_tower_AES.php');
        res.json({ ok: result.ok, action: 'THAO', payload: payload, output: result.stdout, stderr: result.stderr, error: result.error });
    } catch(e) {
        res.status(500).json({ ok: false, error: e.message });
    }
});

// ==================== API: HERO ====================
app.post('/api/hero', async function(req, res) {
    try {
        var body = req.body;
        var payload = {
            UNIQ_ID: body.UNIQ_ID || 'TDM270533qAb',
            HOST_ID: body.HOST_ID || 'le0912760@gmail.com',
            SELECTED_HERO: body.SELECTED_HERO || '',
            BOU_HERO: body.BOU_HERO || '',
            SELECTED_HERO_MAX: body.SELECTED_HERO_MAX || '5',
            RUN_COUNT: 0,
            COMMENT: body.COMMENT || 'Hero từ web',
            MOBILE_CONNECT: '',
            GICHAPO: '선택된서버:베트남서버 ping:63ms'
        };
        var result = await runNodeE(payload, '/put_userinfo_hero_AES.php');
        res.json({ ok: result.ok, action: 'HERO', payload: payload, output: result.stdout, stderr: result.stderr, error: result.error });
    } catch(e) {
        res.status(500).json({ ok: false, error: e.message });
    }
});

// ==================== API: GACHA ====================
app.post('/api/gacha', async function(req, res) {
    try {
        var body = req.body;
        var payload = {
            UNIQ_ID: body.UNIQ_ID || 'TDM270533qAb',
            HOST_ID: body.HOST_ID || 'le0912760@gmail.com',
            PLATFORM: 'AMO',
            RUN_COUNT: 0,
            COMMENT: body.COMMENT || '타워선택:dia:1',
            MOBILE_CONNECT: '',
            GICHAPO: '선택된서버:베트남서버 ping:63ms'
        };

        var result = await runNodeE(payload, '/put_userinfo_gacha_AES2.php');

        var jsonResult = null;
        try {
            var m = (result.stdout || '').match(/\{[\s\S]*\}/);
            if (m) jsonResult = JSON.parse(m[0]);
        } catch(e) {}

        res.json({
            ok: result.ok,
            action: 'GACHA',
            payload: payload,
            output: result.stdout,
            parsed: jsonResult,
            stderr: result.stderr,
            error: result.error
        });
    } catch(e) {
        res.status(500).json({ ok: false, error: e.message });
    }
});

// ==================== STATIC ====================
app.get('/fallback_inject.js', function(req, res) { res.sendFile(path.join(__dirname, 'fallback_inject.js')); });
app.get('/gmail_panel.js', function(req, res) { res.sendFile(path.join(__dirname, 'gmail_panel.js')); });
app.get('/user_data.json', function(req, res) { res.sendFile(USER_DATA_FILE); });

app.use(express.static(path.resolve(__dirname)));
app.use('/CRYPTO', express.static(path.join(__dirname, 'CRYPTO')));
app.use('/javascript', express.static(path.join(__dirname, 'javascript')));
app.use('/image', express.static(path.join(__dirname, 'image')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/util', express.static(path.join(__dirname, 'util')));
app.use('/font', express.static(path.join(__dirname, 'font')));
app.use('/icon', express.static(path.join(__dirname, 'icon')));
app.use('/sound', express.static(path.join(__dirname, 'sound')));
app.use('/min', express.static(path.join(__dirname, 'min')));
app.use('/define', express.static(path.join(__dirname, 'define')));

// ==================== LISTEN ====================


// ==================== REWARD / MAILBOX ====================
// Data reward mailbox
var REWARD_DATA = {
    list: [],         // Danh sách reward trong hòm thư
    count: 0,         // Số lượng reward
    result: 'OK'
};

app.post('/Reward/get_rewards_AES.php', function(req, res) {
    console.log('[REWARD] 📥 get_rewards_AES.php');
    try {
        var encBody = req.body.DATA;
        if (!encBody) {
            console.log('[REWARD] ⚠️ Missing DATA');
            return res.send('ERROR: Missing DATA');
        }
        
        var dec = decryptData(encBody);
        if (!dec) {
            console.log('[REWARD] ❌ decrypt failed');
            return res.send('ERROR: decrypt failed');
        }
        
        var p = JSON.parse(dec);
        console.log('[REWARD] 📦 UNIQ_ID:', p.UNIQ_ID);
        
        var response = {
            RESULT: 'OK',
            VALUE: {
                list: [],       // Không có reward nào
                count: 0,
                reward_arr: '0,0,0,0,0,0,0,0,0,0',
                reward_data: ''
            }
        };
        
        console.log('[REWARD] ✅ Trả về 0 reward');
        res.send(encryptData(response));
    } catch(e) {
        console.log('[REWARD] ❌', e.message);
        res.send('ERROR: ' + e.message);
    }
});

// Wildcard cho mọi URL Reward
app.all(/\/Reward\//, function(req, res) {
    console.log('[REWARD-WILD] 📥', req.method, req.originalUrl.substring(0, 150));
    try {
        var encBody = req.body.DATA;
        if (encBody) {
            var dec = decryptData(encBody);
            if (dec) {
                var p = JSON.parse(dec);
                console.log('[REWARD-WILD] 📦 Payload:', JSON.stringify(p).substring(0, 200));
            }
        }
        
        res.send(encryptData({
            RESULT: 'OK',
            VALUE: {
                list: [],
                count: 0,
                reward_arr: '0,0,0,0,0,0,0,0,0,0',
                reward_data: ''
            }
        }));
    } catch(e) {
        console.log('[REWARD-WILD] ❌', e.message);
        res.send('ERROR: ' + e.message);
    }
});

console.log('[REWARD] ✅ Đã thêm endpoint Reward/get_rewards');




// ==================== EVENT MENU ====================
// Data mẫu cho event (Chuseok)
var EVENT_STAGE_LIST = [
    { idx: 1, stage: 1, name: 'Stage 1', reward: 100, clear: 0, max: 1, state: 0 },
    { idx: 2, stage: 2, name: 'Stage 2', reward: 200, clear: 0, max: 1, state: 0 },
    { idx: 3, stage: 3, name: 'Stage 3', reward: 300, clear: 0, max: 1, state: 0 }
];

var EVENT_GACHA_LIST = [
    { idx: 1, item: 1, count: 1, prob: 100, state: 0, need: 1, reward: 'tower_5001' },
    { idx: 2, item: 2, count: 1, prob: 100, state: 0, need: 1, reward: 'tower_5002' },
    { idx: 3, item: 3, count: 1, prob: 100, state: 0, need: 1, reward: 'tower_5003' }
];

var EVENT_SHOP_LIST = [
    { idx: 1, item: 1, price: 100, count: 1, buy: 0, max: 5, state: 0 },
    { idx: 2, item: 2, price: 200, count: 1, buy: 0, max: 5, state: 0 },
    { idx: 3, item: 3, price: 300, count: 1, buy: 0, max: 5, state: 0 }
];

app.all(/EVENT_MENU\//, function(req, res) {
    var originalUrl = req.originalUrl || req.url;
    var cleanUrl = originalUrl
        .replace(/\/\.\.\//g, '/')
        .replace(/\/\.\//g, '/')
        .replace(/\/{2,}/g, '/');
    
    console.log('[EVENT-LOCAL] 📥', cleanUrl.substring(0, 150));
    
    try {
        if (req.body && req.body.DATA) {
            var dec = decryptData(req.body.DATA);
            if (dec) {
                var p = JSON.parse(dec);
                console.log('[EVENT-LOCAL] 📦 COMMENT:', p.COMMENT, '| ADD:', p.ADD, '| USE:', p.USE);
            }
        }
    } catch(e) {}
    
    var url = cleanUrl;
    var value = {};
    var result = 'OK';
    
    if (url.indexOf('getput_eventmoney') >= 0) {
        value = {
            money: 10000,
            event_money: 10000,
            event_money_list: '10000,0,0,0,0,0,0,0,0,0',
            normal_stage_count: 0,
            event_dungeon_count: 0,
            daily_max: 15000,
            list: []
        };
        console.log('[EVENT-LOCAL] 💰 getput_eventmoney → money=10000');
    } else if (url.indexOf('eventmenu_stage') >= 0) {
        value = {
            result: 'OK',
            list: EVENT_STAGE_LIST,
            stage: 0,
            money: 10000,
            clear: 0,
            max_stage: 100,
            reward: '0'
        };
        console.log('[EVENT-LOCAL] 🎯 eventmenu_stage → ' + EVENT_STAGE_LIST.length + ' items');
    } else if (url.indexOf('eventmenu_shop_new') >= 0 || url.indexOf('eventmenu_shopping') >= 0) {
        value = {
            result: 'OK',
            list: EVENT_SHOP_LIST,
            buy_list: EVENT_SHOP_LIST,
            shop_list: EVENT_SHOP_LIST,
            money: 10000
        };
        console.log('[EVENT-LOCAL] 🛒 eventmenu_shop → ' + EVENT_SHOP_LIST.length + ' items');
    } else if (url.indexOf('eventmenu_gacha') >= 0) {
        value = {
            result: 'OK',
            list: EVENT_GACHA_LIST,
            gacha_list: EVENT_GACHA_LIST,
            pick_list: EVENT_GACHA_LIST,
            money: 10000
        };
        console.log('[EVENT-LOCAL] 🎰 eventmenu_gacha → ' + EVENT_GACHA_LIST.length + ' items');
    } else if (url.indexOf('gacha_event_100') >= 0) {
        value = {
            result: 'OK',
            list: EVENT_GACHA_LIST,
            ticket: 100
        };
        console.log('[EVENT-LOCAL] 🎲 gacha_event_100');
    } else {
        value = {
            result: 'OK',
            money: 10000,
            event_money: 10000,
            list: [],
            stage: 0,
            ticket: 0
        };
        console.log('[EVENT-LOCAL] 📦 default');
    }
    
    var response = { RESULT: result, VALUE: value };
    res.send(encryptData(response));
});

console.log('[EVENT-LOCAL] ✅ Đã thêm wildcard endpoint Event với data đầy đủ');


app.listen(PORT, '0.0.0.0', function() {
    console.log('');
    console.log('====================================================');
    console.log('🏰 GOLD TOWER DEFENSE SERVER (LOCAL)');
    console.log('✅ http://127.0.0.1:' + PORT);
    console.log('📁 user_data.json: ' + (fs.existsSync(USER_DATA_FILE) ? 'ĐÃ CÓ' : 'CHƯA CÓ'));
    console.log('🌉 /bridge-request + /bridge-put');
    console.log('🎮 /api/lap-thap + /api/thao-thap + /api/hero + /api/gacha');
    console.log('🔧 PHP-SIM: tower + hero + mission + gacha');
    console.log('🏰 GUILD-LOCAL: wildcard match');
    console.log('====================================================');
});
