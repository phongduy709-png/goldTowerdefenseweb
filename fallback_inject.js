// fallback_inject.js - SẠCH
(function() {
    console.log('[FALLBACK] Loading...');

    // 1. USER
    var HOST_ID = "le0912760@gmail.com";
    var UNIQ_ID = "TDM270533qAb";
    localStorage.setItem("gtd_email", HOST_ID);
    localStorage.setItem("gtd_host_id", HOST_ID);
    localStorage.setItem("gtd_uniq_id", UNIQ_ID);
    localStorage.setItem("gtd_uid", UNIQ_ID);
    localStorage.setItem("host_id", HOST_ID);
    localStorage.setItem("uniq_id", UNIQ_ID);
    localStorage.setItem("TOWER_DEFENCE_AMO.uniq_id", UNIQ_ID);
    
    window.gEntrix = window.gEntrix || {};
    gEntrix.uniq_id = UNIQ_ID;
    gEntrix.host_id = HOST_ID;
    gEntrix.stb_id = UNIQ_ID;
    gEntrix.user_name = "Player";
    gEntrix.user_name2 = "Player";
    gEntrix.model_name = "Web";
    gEntrix.stb_model = "Web";
    gEntrix.stb_name = "Web";
    gEntrix.stb_ip = "127.0.0.1";
    gEntrix.stb_mac = "00:00:00:00:00:00";
    gEntrix.stb_addr = "127.0.0.1";
    gEntrix.pin_number = "0000";

    // 2. AndroidBridge
    if (!window.AndroidBridge) window.AndroidBridge = {};
    AndroidBridge.getSTBId = function() { return UNIQ_ID; };
    AndroidBridge.getSTBName = function() { return 'Web'; };
    AndroidBridge.getSTBModel = function() { return 'Web'; };
    AndroidBridge.getSTBIp = function() { return '127.0.0.1'; };
    AndroidBridge.getSTBAddr = function() { return '127.0.0.1'; };
    AndroidBridge.getSTBMac = function() { return '00:00:00:00:00:00'; };
    AndroidBridge.getSTBMacAddr = function() { return '00:00:00:00:00:00'; };
    AndroidBridge.getMacAddress = function() { return '00:00:00:00:00:00'; };
    AndroidBridge.getAndroidId = function() { return UNIQ_ID; };
    AndroidBridge.getDeviceId = function() { return UNIQ_ID; };
    AndroidBridge.getSerial = function() { return UNIQ_ID; };
    AndroidBridge.getHostId = function() { return HOST_ID; };
    AndroidBridge.getEmail = function() { return HOST_ID; };
    AndroidBridge.getLang = function() { return 'vi'; };
    AndroidBridge.setKeyBlock = function() {};
    AndroidBridge.getPaymentFail = function() { return 0; };
    AndroidBridge.getPaymentFailList = function() { return '[]'; };
    AndroidBridge.checkPaymentMonth = function() { return 'N'; };
    AndroidBridge.hideSystemUI = function() {};
    AndroidBridge.showSystemUI = function() {};
    AndroidBridge.saveLocalData = function(k, v) { localStorage.setItem(k, v); };
    AndroidBridge.loadLocalData = function(k) { return localStorage.getItem(k) || ''; };

    // 3. glo + USER
    var now = new Date();
    window.glo = window.glo || {};
    glo.server_time = {
        year: now.getFullYear(), mon: now.getMonth() + 1, day: now.getDate(),
        hour: now.getHours(), min: now.getMinutes(), sec: now.getSeconds(),
        yoil: (now.getDay() + 1) % 7, week: 1, gichapo: "LOCAL"
    };
    glo.timestamp_start = Math.floor(Date.now() / 1000);

    window.util = window.util || {};
    util.get_gichapo = function() { return "LOCAL"; };
    util.log = function() {};

    window.USER = window.USER || {
        lang: 3, gold: 500000, dia: 8000, ruby: 50, mileage: 0,
        magic: 1000, level: 1, level_exp: 0,
        sound_bgm: 1, sound_effect: 1,
        chul_date: "20200101", chul_num: 0,
        guide_line: 0, gacha_time: 0, is_numkey: 0, vibration: 1
    };

    // 4. Date fix
    var OrigDate = window.Date;
    var FixedDate = function() {
        if (arguments.length === 0) return new OrigDate();
        try {
            var args = Array.prototype.slice.call(arguments);
            if (typeof args[0] === 'string') {
                var test = new OrigDate(args[0]);
                if (isNaN(test.getTime())) return new OrigDate();
                return test;
            }
            return new (Function.prototype.bind.apply(OrigDate, [null].concat(args)))();
        } catch(e) { return new OrigDate(); }
    };
    FixedDate.now = OrigDate.now;
    FixedDate.parse = OrigDate.parse;
    FixedDate.UTC = OrigDate.UTC;
    FixedDate.prototype = OrigDate.prototype;
    window.Date = FixedDate;

    // 5. Bỏ qua CORS
    window.addEventListener('error', function(e) {
        if (e.message && e.message.indexOf('Script error') >= 0) {
            e.preventDefault(); e.stopPropagation();
        }
    }, true);

    // 6. Bỏ qua popup lỗi
    var checkPopup = setInterval(function() {
        if (typeof S_ERROR_POPUP === 'undefined' || !S_ERROR_POPUP.start) return;
        clearInterval(checkPopup);
        var _orig = S_ERROR_POPUP.start;
        S_ERROR_POPUP.start = function(type, msg) {
            if (msg && (msg.indexOf('Network Error') >= 0 || msg.indexOf('심한거') >= 0)) return;
            return _orig.apply(this, arguments);
        };
    }, 100);

    // 7. Bỏ qua WebSocket lỗi
    var OrigWS = window.WebSocket;
    window.WebSocket = function(url, protocols) {
        try {
            var ws = new OrigWS(url, protocols);
            ws.addEventListener('error', function(e) { e.preventDefault(); e.stopPropagation(); });
            return ws;
        } catch(e) {
            return { readyState: 3, send: function() {}, close: function() {}, addEventListener: function() {} };
        }
    };
    window.WebSocket.prototype = OrigWS.prototype;

    // 8. Bỏ qua String lỗi
    function safeStr(v) {
        if (v === null || v === undefined) return '';
        if (typeof v === 'string') return v;
        try { return String(v); } catch(e) { return ''; }
    }
    ['split','substring','slice','charAt','indexOf','replace'].forEach(function(m) {
        var _orig = String.prototype[m];
        if (!_orig) return;
        String.prototype[m] = function() {
            try { return _orig.apply(safeStr(this), arguments); }
            catch(e) { return m === 'split' ? [] : (m === 'indexOf' ? -1 : ''); }
        };
    });

    // 9. has_user_key
    var checkKey = setInterval(function() {
        if (typeof STORAGE === 'undefined') return;
        clearInterval(checkKey);
        STORAGE.has_user_key = HOST_ID;
        setInterval(function() {
            if (!STORAGE.has_user_key || STORAGE.has_user_key === null) STORAGE.has_user_key = HOST_ID;
        }, 1000);
    }, 100);

    // 10. URL_prefix
    setInterval(function() {
        if (window.glo && glo.URL_prefix !== 'http://127.0.0.1:8080/') {
            try {
                Object.defineProperty(glo, 'URL_prefix', {
                    get: function() { return 'http://127.0.0.1:8080/'; },
                    set: function(v) {},
                    configurable: true
                });
            } catch(e) { glo.URL_prefix = 'http://127.0.0.1:8080/'; }
        }
    }, 100);

    // 11. Min localhost
    var _origCE = document.createElement;
    document.createElement = function(tagName) {
        var el = _origCE.apply(this, arguments);
        if (tagName && tagName.toLowerCase() === 'script') {
            var _src = '';
            try {
                Object.defineProperty(el, 'src', {
                    get: function() { return _src; },
                    set: function(v) {
                        if (v && v.indexOf('GTD.min') >= 0 && v.indexOf('/min/') < 0) _src = '/min/GTD.min_20260702_0950.js';
                        else _src = v;
                        try { el.setAttribute('src', _src); } catch(e) {}
                    },
                    configurable: true
                });
            } catch(e) {}
        }
        return el;
    };

    // 12. gEntrix cố định
    setInterval(function() {
        if (typeof gEntrix !== 'undefined' && gEntrix) {
            if (gEntrix.uniq_id !== UNIQ_ID) gEntrix.uniq_id = UNIQ_ID;
            if (gEntrix.host_id !== HOST_ID) gEntrix.host_id = HOST_ID;
            if (gEntrix.stb_id !== UNIQ_ID) gEntrix.stb_id = UNIQ_ID;
        }
    }, 100);

    // 13. Anti-cheat bypass
    var checkAC = setInterval(function() {
        if (typeof CAL === 'undefined' || typeof FAKE === 'undefined') return;
        clearInterval(checkAC);
        ['get_ruby','get_gold','get_dia','get_magic','get_mileage'].forEach(function(fn) {
            if (typeof CAL[fn] !== 'function') return;
            var _orig = CAL[fn];
            CAL[fn] = function() {
                try { var r = _orig.apply(this, arguments); if (r === undefined) return USER[fn.replace('get_', '')] || 0; return r; }
                catch(e) { return USER[fn.replace('get_', '')] || 0; }
            };
        });
        setInterval(function() {
            if (typeof USER.ruby === 'number') FAKE.ruby = USER.ruby + 3847;
            if (typeof USER.gold === 'number') FAKE.gold = USER.gold + 3847;
            if (typeof USER.dia === 'number') FAKE.dia = USER.dia + 3847;
        }, 500);
    }, 100);

    // 14. Crypto patch
    var cryptoPatched = false;
    var cryptoCheck = setInterval(function() {
        if (cryptoPatched) { clearInterval(cryptoCheck); return; }
        if (!window.util || typeof CryptoJS === 'undefined') return;
        if (typeof CryptoJS.AES === 'undefined' || typeof CryptoJS.enc === 'undefined') return;
        if (typeof CryptoJS.enc.Utf8 === 'undefined') return;
        
        util.get_encryt2 = function(message) {
            try {
                var k = CryptoJS.enc.Utf8.parse("gksekfidjrqjfwk1");
                var i = CryptoJS.enc.Utf8.parse("towerdefense_amo");
                var e = CryptoJS.AES.encrypt(JSON.stringify(message).replace(/\s+/g, ""), k, { iv: i });
                return e.toString();
            } catch(e) { return ''; }
        };
        
        util.get_decryt2 = function(message) {
            try {
                var k = CryptoJS.enc.Utf8.parse("gksekfidjrqjfwk1");
                var i = CryptoJS.enc.Utf8.parse("towerdefense_amo");
                var d = CryptoJS.AES.decrypt(message, k, { iv: i });
                return d.toString(CryptoJS.enc.Utf8) + "";
            } catch(e) { return ''; }
        };
        
        cryptoPatched = true;
        console.log('[FALLBACK] Crypto patched');
    }, 100);

    // 15. Auto Main.do_next
    var called = false;
    var mainCheck = setInterval(function() {
        if (called) { clearInterval(mainCheck); return; }
        if (typeof Main === 'undefined' || !Main.do_next) return;
        if (typeof S_LOGO === 'undefined' || !S_LOGO.init) return;
        if (typeof USER === 'undefined') return;
        if (window.glo && glo.scene && glo.scene.cur) { called = true; clearInterval(mainCheck); return; }
        console.log('[FALLBACK] Main.do_next()...');
        try { Main.do_next(); called = true; clearInterval(mainCheck); } catch(e) { console.log('[FALLBACK] Lỗi:', e.message); }
    }, 500);

    // 16. S_LOGO scene.cur → string
    setInterval(function() {
        if (!window.glo || !glo.scene) return;
        if (typeof glo.scene.cur === 'object' && glo.scene.cur !== null) {
            for (var k in window) {
                if (window[k] === glo.scene.cur) { glo.scene.cur = k; break; }
            }
        }
    }, 50);

    // 17. Patch eval [object Object]
    var _origEval = window.eval;
    window.eval = function(code) {
        try {
            if (typeof code === 'string' && code.indexOf('[object Object]') >= 0) return null;
            return _origEval.call(this, code);
        } catch(e) { return null; }
    };

    // 18. Patch PHP.put_userinfo qua bridge
    function patchPHP() {
        if (typeof PHP === 'undefined' || typeof STORAGE === 'undefined' || !STORAGE.encode_tower) {
            setTimeout(patchPHP, 50);
            return;
        }
        
        PHP.put_userinfo_tower = function(comment, cb) {
            console.log('[PHP-TOWER] Gọi bridge...');
            try {
                var e = STORAGE.encode_tower();
                if (!e) { if (cb) cb(); return; }
                var pd = util.get_encryt2(JSON.stringify({
                    UNIQ_ID: gEntrix.uniq_id, HOST_ID: gEntrix.host_id,
                    SELECTED_TOWER: e.selected_tower + '', BOU_TOWER: e.bou_tower + '',
                    RUN_COUNT: glo.run_count || 0, COMMENT: comment || '',
                    MOBILE_CONNECT: util.is_mobile_connect(), GICHAPO: util.get_gichapo()
                }));
                fetch('/bridge-put', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ endpoint: '/put_userinfo_tower_AES.php', data: pd })
                }).then(r => r.json()).then(json => {
                    console.log('[PHP-TOWER] ✅ Response:', JSON.stringify(json).substring(0, 100));
                    if (json.VALUE && STORAGE.decode_tower) STORAGE.decode_tower(json.VALUE);
                    if (cb) cb();
                }).catch(e => { console.log('[PHP-TOWER] ❌', e.message); if (cb) cb(); });
            } catch(e) { console.log('[PHP-TOWER] Error:', e.message); if (cb) cb(); }
        };
        
        PHP.put_userinfo_hero = function(comment, cb) {
            console.log('[PHP-HERO] Gọi bridge...');
            try {
                var e = STORAGE.encode_hero();
                if (!e) { if (cb) cb(); return; }
                var pd = util.get_encryt2(JSON.stringify({
                    UNIQ_ID: gEntrix.uniq_id, HOST_ID: gEntrix.host_id,
                    SELECTED_HERO: e.selected_hero + '', SELECTED_HERO_MAX: STORAGE.hero_selected_max || 5,
                    BOU_HERO: e.bou_hero + '',
                    RUN_COUNT: glo.run_count || 0, COMMENT: comment || '',
                    MOBILE_CONNECT: util.is_mobile_connect(), GICHAPO: util.get_gichapo()
                }));
                fetch('/bridge-put', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ endpoint: '/put_userinfo_hero_AES.php', data: pd })
                }).then(r => r.json()).then(json => {
                    console.log('[PHP-HERO] ✅ Response:', JSON.stringify(json).substring(0, 100));
                    if (json.VALUE && STORAGE.decode_hero) STORAGE.decode_hero(json.VALUE);
                    if (cb) cb();
                }).catch(e => { console.log('[PHP-HERO] ❌', e.message); if (cb) cb(); });
            } catch(e) { console.log('[PHP-HERO] Error:', e.message); if (cb) cb(); }
        };
        console.log('[FALLBACK] PHP patched');
    }
    patchPHP();

    console.log('[FALLBACK] Ready');
})();
