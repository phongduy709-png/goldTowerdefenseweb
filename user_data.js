// user_data.js - Quản lý user data + log
const fs = require('fs');
const path = require('path');

const USER_DATA_FILE = path.join(__dirname, 'user_data.json');
const MAX_LOGS = 10000;

// ============ LOAD USER DATA ============
function loadUserData() {
    if (fs.existsSync(USER_DATA_FILE)) {
        try {
            var data = JSON.parse(fs.readFileSync(USER_DATA_FILE, 'utf8'));
            console.log('[USER-DATA] Loaded từ file, updated:', data.last_updated);
            return data;
        } catch(e) {
            console.log('[USER-DATA] Lỗi parse, tạo mới');
        }
    }
    return null;
}

// ============ SAVE USER DATA ============
function saveUserData(data) {
    data.last_updated = new Date().toISOString();
    fs.writeFileSync(USER_DATA_FILE, JSON.stringify(data, null, 2));
    console.log('[USER-DATA] Saved, updated:', data.last_updated);
}

// ============ LOG ACTION ============
function logAction(action, details) {
    var data = loadUserData() || { action_log: [] };
    if (!data.action_log) data.action_log = [];
    
    data.action_log.push({
        time: new Date().toISOString(),
        action: action,
        details: details
    });
    
    // Giữ 10,000 log gần nhất
    if (data.action_log.length > MAX_LOGS) {
        data.action_log = data.action_log.slice(-MAX_LOGS);
    }
    
    saveUserData(data);
}

// ============ MERGE DATA TỪ SERVER VÀO FILE ============
function mergeServerData(serverData) {
    var existing = loadUserData();
    
    var newData = {
        profile: {
            uniq_id: serverData.VALUE.normal.value.UNIQ_ID,
            host_id: serverData.VALUE.normal.value.HOST_ID,
            user_name: serverData.VALUE.normal.value.USER_NAME,
            user_name2: serverData.VALUE.normal.value.USER_NAME2,
            level: serverData.VALUE.normal.value.LEVEL,
            level_exp: serverData.VALUE.normal.value.LEVEL_EXP,
            chul_num: serverData.VALUE.normal.value.CHUL_NUM,
            lang: serverData.VALUE.normal.value.LANG
        },
        tower: {
            bou_tower: serverData.VALUE.tower.value.bou_tower,
            selected_tower: serverData.VALUE.tower.value.selected_tower,
            rainbow_card: serverData.VALUE.tower.value.rainbow_card
        },
        hero: {
            bou_hero: serverData.VALUE.hero.value.bou_hero,
            selected_hero: serverData.VALUE.hero.value.selected_hero,
            selected_hero_max: serverData.VALUE.hero.value.selected_hero_max
        },
        rubydiagold: {
            RUBY: serverData.VALUE.rubydiagold.value.RUBY,
            DIA: serverData.VALUE.rubydiagold.value.DIA,
            GOLD: serverData.VALUE.rubydiagold.value.GOLD,
            MAGIC: serverData.VALUE.rubydiagold.value.MAGIC,
            MILEAGE: serverData.VALUE.rubydiagold.value.MILEAGE
        },
        stage: {
            DATA_EASY: serverData.VALUE.stage.value.DATA_EASY,
            DATA_NORMAL: serverData.VALUE.stage.value.DATA_NORMAL,
            DATA_HARD: serverData.VALUE.stage.value.DATA_HARD
        },
        raw: serverData.VALUE,
        last_updated: new Date().toISOString(),
        action_log: existing && existing.action_log ? existing.action_log : []
    };
    
    saveUserData(newData);
    logAction('LOAD_FROM_SERVER', { uniq_id: newData.profile.uniq_id });
    return newData;
}

// ============ UPDATE TOWER ============
function updateTower(bouTower, selectedTower, rainbowCard) {
    var data = loadUserData();
    if (!data) return;
    
    data.tower.bou_tower = bouTower;
    data.tower.selected_tower = selectedTower;
    if (rainbowCard !== undefined) data.tower.rainbow_card = rainbowCard;
    
    logAction('UPDATE_TOWER', {
        selected_count: selectedTower.split(',').filter(function(x) { return x; }).length,
        bou_count: bouTower.split(',').filter(function(x) { return x; }).length
    });
    
    saveUserData(data);
}

// ============ UPDATE HERO ============
function updateHero(bouHero, selectedHero, maxHero) {
    var data = loadUserData();
    if (!data) return;
    
    data.hero.bou_hero = bouHero;
    data.hero.selected_hero = selectedHero;
    if (maxHero !== undefined) data.hero.selected_hero_max = maxHero;
    
    logAction('UPDATE_HERO', {
        selected_count: selectedHero.split(',').filter(function(x) { return x; }).length,
        bou_count: bouHero.split(',').filter(function(x) { return x; }).length
    });
    
    saveUserData(data);
}

// ============ UPDATE RUBY/GOLD/DIA ============
function updateResources(ruby, dia, gold, magic, mileage) {
    var data = loadUserData();
    if (!data) return;
    
    data.rubydiagold = {
        RUBY: String(ruby),
        DIA: String(dia),
        GOLD: String(gold),
        MAGIC: String(magic),
        MILEAGE: String(mileage)
    };
    
    logAction('UPDATE_RESOURCES', { ruby: ruby, dia: dia, gold: gold });
    saveUserData(data);
}

// ============ UPDATE STAGE ============
function updateStage(dataEasy, dataNormal, dataHard) {
    var data = loadUserData();
    if (!data) return;
    
    data.stage = {
        DATA_EASY: dataEasy,
        DATA_NORMAL: dataNormal,
        DATA_HARD: dataHard
    };
    
    logAction('UPDATE_STAGE', { easy: dataEasy.length, normal: dataNormal.length, hard: dataHard.length });
    saveUserData(data);
}

// ============ GET USER DATA (DÙNG ĐỂ TRẢ VỀ GAME) ============
function getUserData() {
    var data = loadUserData();
    if (!data || !data.raw) return null;
    return data.raw;
}

module.exports = {
    loadUserData: loadUserData,
    saveUserData: saveUserData,
    logAction: logAction,
    mergeServerData: mergeServerData,
    updateTower: updateTower,
    updateHero: updateHero,
    updateResources: updateResources,
    updateStage: updateStage,
    getUserData: getUserData,
    USER_DATA_FILE: USER_DATA_FILE
};
