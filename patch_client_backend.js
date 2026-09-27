// ==================== CLIENT BACKEND V2 ====================
// Thay thế server2.js khi chạy static host (Netlify, Vercel)
// =========================================================
(function() {
    console.log('[CLIENT-BE-V2] 🚀 Khởi động');

    var STORAGE_KEY = 'gtd_user_data_v2';
    var INIT_FLAG = 'gtd_initialized_v2';

    // ============================================================
    // DATA MẶC ĐỊNH (fallback)
    // ============================================================
    function makeDefaultData() {
        return {
            raw: {
                RESULT: 'OK',
                VALUE: {
                    normal: { result: 'OK', value: { UNIQ_ID: 'ATV91285', HOST_ID: '58owl85@gmail.com', USER_NAME: 'TESTER_036', LEVEL: '1' } },
                    rubydiagold: { result: 'OK', value: { RUBY: '50000', DIA: '50000', GOLD: '5000000', MILEAGE: '0', MAGIC: '1000', P_TICKET: '0', N_TICKET: '0' } },
                    tower: { result: 'OK', value: { selected_tower: '5037,5038,5039,5040,5001', bou_tower: '', rainbow_card: '114' } },
                    hero: { result: 'OK', value: { selected_hero: '', bou_hero: '', selected_hero_max: '5' } },
                    stage: { result: 'OK', value: { DATA_EASY: '', DATA_NORMAL: '', DATA_HARD: '' } },
                    gongji: { result: 'OK', value: '' },
                    mailbox: { result: 'NONE', value: '' },
                    item: { result: 'OK', value: '1:0,2:0,3:0,4:0,5:0' },
                    charbook: { result: 'OK', value: { tower: '0', hero: '0', monster: '0' } },
                    quest: { result: 'OK', value: { weekly: '' } },
                    upgrade: { result: 'OK', value: '0,0,0' },
                    payinfo: { result: 'OK', value: { payor_user: 0, monthly_pay_is: 0 } },
                    etc: { result: 'OK', value: {} },
                    daytry: { result: 'OK', value: { ticket: '3' } },
                    guild: { result: 'OK', value: {} },
                    travel: { result: 'NONE' },
                    myths: { result: 'OK', value: {} },
                    segong: { result: 'NONE' },
                    draw_mileage: { result: 'OK', value: {} },
                    unit: { result: 'OK', value: { selected_unit: '', bou_unit: '' } },
                    black_list: { result: 'NONE', value: 'ok' },
                    gichapo: '',
                    is_test_play_id: false,
                    has_user_key: 'no',
                    user_key_remain_time: 0
                },
                COMMENT: 'empty'
            },
            action_log: [],
            last_updated: new Date().toISOString()
        };
    }

    // ============================================================
    // LOAD/SAVE DATA
    // ============================================================
    function loadData() {
        try {
            var json = localStorage.getItem(STORAGE_KEY);
            if (json) return JSON.parse(json);
        } catch(e) {
            console.error('[CLIENT-BE-V2] Load lỗi:', e.message);
        }
        return makeDefaultData();
    }

    function saveData(data) {
        try {
            data.last_updated = new Date().toISOString();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch(e) {
            console.error('[CLIENT-BE-V2] Save lỗi:', e.message);
        }
    }

    // ============================================================
    // KHỞI TẠO LẦN ĐẦU — FETCH user_data.json
    // ============================================================
    function initFromJson() {
        if (localStorage.getItem(INIT_FLAG)) {
            console.log('[CLIENT-BE-V2] ✅ Đã init, bỏ qua');
            return Promise.resolve();
        }

        console.log('[CLIENT-BE-V2] 📥 Fetch user_data.json (lần đầu)...');
        return fetch('user_data.json?t=' + Date.now())
            .then(function(r) {
                if (!r.ok) throw new Error('HTTP ' + r.status);
                return r.json();
            })
            .then(function(data) {
                if (!data || !data.raw) throw new Error('Thiếu .raw');
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
                localStorage.setItem(INIT_FLAG, '1');
                var ruby = data.raw.VALUE.rubydiagold ? data.raw.VALUE.rubydiagold.value.RUBY : '?';
                var towers = data.raw.VALUE.tower ? (data.raw.VALUE.tower.value.bou_tower || '').split(',').length : 0;
                console.log('[CLIENT-BE-V2] ✅ Import OK | Ruby: ' + ruby + ' | Tháp: ' + towers);
            })
            .catch(function(err) {
                console.warn('[CLIENT-BE-V2] ⚠️ Fetch lỗi:', err.message, '→ Dùng default');
                localStorage.setItem(INIT_FLAG, '1');
                saveData(makeDefaultData());
            });
    }

    // ============================================================
    // GACHA POOL
    // ============================================================
    var GACHA_POOL = [];
    for (var i = 5001; i <= 5048; i++) GACHA_POOL.push(String(i));
    [6019,6020,6021,6025,6026,6027,6028,6029,6030,6031,6032,6033,6034,6035,6036,6037,6038,6039,6040,6041,6042,6043,6044,6045].forEach(function(id) { GACHA_POOL.push(String(id)); });
    GACHA_POOL.push('7034', '7035', '7036');
    console.log('[CLIENT-BE-V2] 🎲 Pool:', GACHA_POOL.length, 'tháp');

    // ============================================================
    // SYNC
    // ============================================================
    function syncSelected(bouStr, selectedStr, maxCount) {
        if (selectedStr && selectedStr.indexOf('|') >= 0) return selectedStr;
        if (!bouStr) return selectedStr || '';
        var bouIds = bouStr.split(',').map(function(x) { return x.split(':')[0]; }).filter(Boolean);
        var selectedIds = selectedStr ? selectedStr.split(',').filter(Boolean) : [];
        var newSelected = selectedIds.filter(function(id) { return bouIds.indexOf(id) >= 0; });
        if (maxCount && newSelected.length > maxCount) newSelected = newSelected.slice(0, maxCount);
        return newSelected.join(',');
    }

    // ============================================================
    // HANDLERS
    // ============================================================
    function handleBridgeRequest() {
        var data = loadData();
        var raw = data.raw;
        if (raw.VALUE.tower && raw.VALUE.tower.value) {
            var t = raw.VALUE.tower.value;
            if (t.bou_tower) t.selected_tower = syncSelected(t.bou_tower, t.selected_tower, 10);
        }
        if (raw.VALUE.hero && raw.VALUE.hero.value) {
            var h = raw.VALUE.hero.value;
            if (h.bou_hero) h.selected_hero = syncSelected(h.bou_hero, h.selected_hero, parseInt(h.selected_hero_max) || 5);
        }
        return raw;
    }

    function handleGacha(body) {
        var comment = (body && body.COMMENT) || '';
        var cardCount = 10;
        var m = comment.match(/pay(\d+)/);
        if (m) cardCount = Math.min(parseInt(m[1]) || 1, 10);

        var data = loadData();
        var raw = data.raw;

        var results = [];
        for (var i = 0; i < cardCount; i++) {
            results.push(GACHA_POOL[Math.floor(Math.random() * GACHA_POOL.length)]);
        }
        console.log('[CLIENT-BE-V2] 🎲 Gacha', cardCount, '→', results.join(','));

        var cost = cardCount === 10 ? 3000 : 300;
        var curDia = parseInt(raw.VALUE.rubydiagold.value.DIA) || 0;
        raw.VALUE.rubydiagold.value.DIA = String(Math.max(0, curDia - cost));

        var bou = raw.VALUE.tower.value.bou_tower || '';
        var bouIds = bou.split(',').map(function(x) { return x.split(':')[0]; });
        results.forEach(function(id) {
            if (bouIds.indexOf(id) < 0) {
                bou += (bou ? ',' : '') + id + ':1:0';
                bouIds.push(id);
            }
        });
        raw.VALUE.tower.value.bou_tower = bou;

        saveData(data);

        return {
            RESULT: 'OK',
            VALUE: {
                result: results.join(','),
                gage: 1, ad_time: 0,
                soul_arr: [0,0,0,0,0,0,0,0,0,0,0],
                selected_tower: raw.VALUE.tower.value.selected_tower,
                bou_tower: raw.VALUE.tower.value.bou_tower,
                rainbow_card: raw.VALUE.tower.value.rainbow_card || '114',
                RUBY: raw.VALUE.rubydiagold.value.RUBY,
                DIA: raw.VALUE.rubydiagold.value.DIA
            }
        };
    }

    function handleLapThap(body) {
        var data = loadData();
        var raw = data.raw;
        if (body.BOU_TOWER) raw.VALUE.tower.value.bou_tower = body.BOU_TOWER;
        if (body.SELECTED_TOWER !== undefined) raw.VALUE.tower.value.selected_tower = body.SELECTED_TOWER;
        raw.VALUE.tower.value.selected_tower = syncSelected(raw.VALUE.tower.value.bou_tower, raw.VALUE.tower.value.selected_tower, 10);
        saveData(data);
        return { RESULT: 'OK', VALUE: raw.VALUE.tower.value };
    }

    function handleThaoThap(body) {
        var data = loadData();
        var raw = data.raw;
        if (body.SELECTED_TOWER !== undefined) raw.VALUE.tower.value.selected_tower = body.SELECTED_TOWER;
        if (body.BOU_TOWER !== undefined) raw.VALUE.tower.value.bou_tower = body.BOU_TOWER;
        saveData(data);
        return { RESULT: 'OK', VALUE: raw.VALUE.tower.value };
    }

    function handleHero(body) {
        var data = loadData();
        var raw = data.raw;
        if (body.BOU_HERO) raw.VALUE.hero.value.bou_hero = body.BOU_HERO;
        if (body.SELECTED_HERO !== undefined) raw.VALUE.hero.value.selected_hero = body.SELECTED_HERO;
        if (body.SELECTED_HERO_MAX) raw.VALUE.hero.value.selected_hero_max = body.SELECTED_HERO_MAX;
        if (!(raw.VALUE.hero.value.selected_hero || '').match(/\|/)) {
            raw.VALUE.hero.value.selected_hero = syncSelected(raw.VALUE.hero.value.bou_hero, raw.VALUE.hero.value.selected_hero, parseInt(raw.VALUE.hero.value.selected_hero_max) || 5);
        }
        saveData(data);
        return { RESULT: 'OK', VALUE: raw.VALUE.hero.value };
    }

    // ============================================================
    // HOOK FETCH
    // ============================================================
    var _origFetch = window.fetch;

    window.fetch = function(url, opts) {
        var urlStr = String(url);

        // Bỏ qua file tĩnh + user_data.json
        if (urlStr.indexOf('user_data.json') >= 0 ||
            urlStr.match(/\.(js|css|png|jpg|jpeg|gif|ico|woff|woff2|ttf|mp3|wav|ogg)(\?|$)/i)) {
            return _origFetch.apply(this, arguments);
        }

        var body = {};
        try {
            if (opts && opts.body && typeof opts.body === 'string') body = JSON.parse(opts.body);
        } catch(e) {}

        var fakeResp = null;

        if (urlStr.indexOf('/bridge-request') >= 0) {
            fakeResp = { RESULT: 'OK', VALUE: handleBridgeRequest().VALUE };
            console.log('[CLIENT-BE-V2] 📥 /bridge-request');
        } else if (urlStr.indexOf('/bridge-put') >= 0) {
            fakeResp = { RESULT: 'OK' };
        } else if (urlStr.indexOf('/api/gacha') >= 0) {
            fakeResp = { RESULT: 'OK', parsed: handleGacha(body) };
            console.log('[CLIENT-BE-V2] 🎲 /api/gacha');
        } else if (urlStr.indexOf('/api/lap-thap') >= 0) {
            fakeResp = { ok: true, payload: body, output: JSON.stringify(handleLapThap(body)) };
            console.log('[CLIENT-BE-V2] 🔨 /api/lap-thap');
        } else if (urlStr.indexOf('/api/thao-thap') >= 0) {
            fakeResp = { ok: true, payload: body, output: JSON.stringify(handleThaoThap(body)) };
            console.log('[CLIENT-BE-V2] 💥 /api/thao-thap');
        } else if (urlStr.indexOf('/api/hero') >= 0) {
            fakeResp = { ok: true, payload: body, output: JSON.stringify(handleHero(body)) };
            console.log('[CLIENT-BE-V2] 🦸 /api/hero');
        }

        if (fakeResp !== null) {
            return Promise.resolve(new Response(JSON.stringify(fakeResp), {
                status: 200, headers: { 'Content-Type': 'application/json' }
            }));
        }

        return _origFetch.apply(this, arguments);
    };

    console.log('[CLIENT-BE-V2] ✅ Đã hook fetch');

    initFromJson();

    window.__CLIENT_BE_V2 = {
        loaded: true,
        reset: function() {
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(INIT_FLAG);
            location.reload();
        },
        exportData: function() { return JSON.stringify(loadData(), null, 2); }
    };

    console.log('[CLIENT-BE-V2] 📦 Sẵn sàng');
})();
