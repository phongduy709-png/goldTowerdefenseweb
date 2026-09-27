// ==================== FIX GUILD MENU v2 ====================
// Set data guild TRƯỚC + SAU khi init, hoặc override make_screen_quest
// =========================================================
(function() {
    console.log('[GUILD-FIX] 🚀 v2');

    // ============================================================
    // FIX DATA GUILD
    // ============================================================
    function fixGuildData() {
        if (typeof STORAGE === 'undefined') return;
        if (!STORAGE.guild) STORAGE.guild = {};
        
        var g = STORAGE.guild;
        var defaults = {
            bunho: 31834, name: 'Sunflower', jang: 0, message: '',
            buffer: 5, stage_buff_cnt: '1',
            amulet: { q1: 0, q2: 0, q3: 0, q4: 0 },
            quest: { q1: 0, q2: 0, q3: 0, q4: 0 }
        };
        Object.keys(defaults).forEach(function(k) {
            if (g[k] === undefined) g[k] = defaults[k];
        });
    }

    // ============================================================
    // SET INFO ĐẦY ĐỦ
    // ============================================================
    function setGuildInfo() {
        if (typeof S_GUILD_MAIN === 'undefined') return;
        
        var uniqId = (typeof gEntrix !== 'undefined' && gEntrix.uniq_id) || 
                     (typeof STORAGE !== 'undefined' && STORAGE.uniq_id) || 'ATV91285';
        
        S_GUILD_MAIN.info = {
            flag: { color: 1, flag: 0, symbol: 0, word: 0 },
            type: 1,
            guild_name: (STORAGE.guild && STORAGE.guild.name) || 'Sunflower',
            member: 1,
            max_member: 30,
            buffer: (STORAGE.guild && STORAGE.guild.buffer) || 5,
            guild_gold: 0, guild_point: 0, guild_notice: '',
            jang: 1,
            guild_quest: { q1: 0, q2: 0, q3: 0, q4: 0 },
            
            // ✅ THÊM: member_list
            member_list: {
                1: {
                    un: uniqId,
                    ti: '2026-09-22 12:00:00',
                    name: 'Sunflower',
                    jang: 1,
                    level: 3636,
                    lv: 3636,
                    exp: 0,
                    last_login: '2026-09-22 12:00:00',
                    today: 0,
                    reward: 0
                }
            },
            
            // ✅ THÊM: Các field khác
            notice: '',
            chat_list: {},
            reward_data: {},
            boss_data: {},
            war_data: {}
        };
        
        S_GUILD_MAIN.quest_define = {
            1: { max: 10, reward: 100 },
            2: { max: 20, reward: 200 },
            3: { max: 30, reward: 300 },
            4: { max: 50, reward: 500 }
        };
    }

    // ============================================================
    // WRAP make_screen_quest — chống lỗi q1
    // ============================================================
    function wrapMakeScreenQuest() {
        if (typeof S_GUILD_MAIN === 'undefined') return false;
        if (!S_GUILD_MAIN.make_screen_quest) return false;
        if (S_GUILD_MAIN.make_screen_quest.__wrapped) return true;
        
        var _orig = S_GUILD_MAIN.make_screen_quest;
        S_GUILD_MAIN.make_screen_quest = function() {
            // Đảm bảo info.guild_quest tồn tại
            if (!S_GUILD_MAIN.info) S_GUILD_MAIN.info = {};
            if (!S_GUILD_MAIN.info.guild_quest) {
                S_GUILD_MAIN.info.guild_quest = { q1: 0, q2: 0, q3: 0, q4: 0 };
            }
            if (!S_GUILD_MAIN.quest_define) {
                S_GUILD_MAIN.quest_define = {
                    1: { max: 10, reward: 100 },
                    2: { max: 20, reward: 200 },
                    3: { max: 30, reward: 300 },
                    4: { max: 50, reward: 500 }
                };
            }
            return _orig.apply(this, arguments);
        };
        S_GUILD_MAIN.make_screen_quest.__wrapped = true;
        console.log('[GUILD-FIX] ✅ Wrap make_screen_quest');
        return true;
    }

    // ============================================================
    // WRAP make_screen_quest_define (nếu có)
    // ============================================================
    function wrapAllMakeScreen() {
        if (typeof S_GUILD_MAIN === 'undefined') return;
        Object.keys(S_GUILD_MAIN).forEach(function(key) {
            if (key.indexOf('make_screen') === 0 && typeof S_GUILD_MAIN[key] === 'function' && !S_GUILD_MAIN[key].__wrapped) {
                var _orig = S_GUILD_MAIN[key];
                S_GUILD_MAIN[key] = function() {
                    // Set info trước khi chạy
                    setGuildInfo();
                    return _orig.apply(this, arguments);
                };
                S_GUILD_MAIN[key].__wrapped = true;
            }
        });
    }

    // ============================================================
    // WRAP init
    // ============================================================
    function wrapInit() {
        if (typeof S_GUILD_MAIN === 'undefined') return false;
        if (S_GUILD_MAIN.init.__wrapped) return true;
        
        var _origInit = S_GUILD_MAIN.init;
        S_GUILD_MAIN.init = function() {
            setGuildInfo();
            wrapAllMakeScreen();
            var result = _origInit.apply(this, arguments);
            // Set lại SAU init (phòng khi bị ghi đè)
            setGuildInfo();
            return result;
        };
        S_GUILD_MAIN.init.__wrapped = true;
        console.log('[GUILD-FIX] ✅ Wrap init');
        return true;
    }


    // ============================================================
    // OVERRIDE is_limit_time → luôn false (mở menu guild)
    // ============================================================
    function overrideLimitTime() {
        if (typeof S_GUILD_MAIN === 'undefined') return false;
        if (S_GUILD_MAIN.is_limit_time && S_GUILD_MAIN.is_limit_time.__patched) return true;
        
        S_GUILD_MAIN.is_limit_time = function() {
            console.log('[GUILD-FIX] is_limit_time → FALSE');
            return false;
        };
        S_GUILD_MAIN.is_limit_time.__patched = true;
        console.log('[GUILD-FIX] ✅ Override is_limit_time');
        return true;
    }

    // ============================================================
    // BẮT CLICK MENU4
    // ============================================================
    document.addEventListener('mousedown', function(e) {
        try {
            var target = e.target;
            if (!target) return;
            var tid = target.id || '';
            var pid = (target.parentElement && target.parentElement.id) || '';
            
            if (tid !== 'MM_menu4_icon' && tid !== 'MM_menu4_txt' && pid !== 'MM_menu4_icon') return;
            
            console.log('[GUILD-FIX] 🎯 Click Bang hội');
            
            setTimeout(function() {
                try {
                    fixGuildData();
                    setGuildInfo();
                    
                    var Scene = window['S_GUILD_MAIN'];
                    if (!Scene) return;
                    
                    // Wrap trước khi init
                    wrapInit();
                    wrapMakeScreenQuest();
                    wrapAllMakeScreen();
                    
                    if (typeof Scene.init === 'function') Scene.init();
                    var cur = ChangeScene.after_s || 'S_MAINMENU';
                    ChangeScene.start(cur, 'S_GUILD_MAIN', Scene, ChangeScene.TYPE_NORMAL || 1);
                    console.log('[GUILD-FIX] ✅ Chuyển S_GUILD_MAIN');
                } catch(err) {
                    console.error('[GUILD-FIX] ❌', err.message);
                }
            }, 100);
            
            e.preventDefault();
            e.stopPropagation();
        } catch(err) {}
    }, true);

    // ============================================================
    // RETRY
    // ============================================================
    var tries = 0;
    var iv = setInterval(function() {
        tries++;
        fixGuildData();
        wrapInit();
        wrapMakeScreenQuest();
        wrapAllMakeScreen();
        overrideLimitTime();
        if (tries >= 40) clearInterval(iv);
    }, 500);

    console.log('[GUILD-FIX] ✅ v2 cài đặt');
})();
