// ==================== AUTO LOGIN — Không cần form ====================
// Tự động fetch data từ bridge → decode → vào game
// ===================================================================
(function() {
    console.log('[AUTO-LOGIN] 🚀 Khởi động');

    // Format mặc định nếu không có data
    var DEFAULT_UNIQ = 'ATV91285';
    var DEFAULT_HOST = '58owl85@gmail.com';

    // Parse data — xử lý nhiều format
    function parseVALUE(json) {
        if (!json) return null;
        if (json.VALUE) return json.VALUE;
        if (json.raw && json.raw.VALUE) return json.raw.VALUE;
        if (json.data && json.data.VALUE) return json.data.VALUE;
        if (json.data && json.data.raw && json.data.raw.VALUE) return json.data.raw.VALUE;
        if (json.normal || json.tower || json.rubydiagold) return json;
        return null;
    }

    // Fix charbook — wrap .data nếu thiếu, hoặc bỏ nếu có
    function fixCharbook(V) {
        if (!V || !V.charbook || !V.charbook.value) return;
        var val = V.charbook.value;
        
        // Nếu có .data → bỏ (vì decode_charbook cần trực tiếp tower/hero/monster)
        if (val.data && !val.tower && !val.hero && !val.monster) {
            console.log('[AUTO-LOGIN] 🔧 Bỏ charbook.value.data');
            V.charbook.value = val.data;
        } else if (!val.data && (val.tower || val.hero || val.monster)) {
            // Có trực tiếp → giữ nguyên
            console.log('[AUTO-LOGIN] ✅ charbook.value đúng format');
        } else {
            // Cả 2 đều thiếu → tạo mặc định
            console.log('[AUTO-LOGIN] 🔧 Tạo charbook mặc định');
            V.charbook.value = { tower: '', hero: '', monster: '' };
        }
        
        // Đảm bảo đủ field
        var v = V.charbook.value;
        if (v.tower === undefined) v.tower = '';
        if (v.hero === undefined) v.hero = '';
        if (v.monster === undefined) v.monster = '';
    }

    // Chuyển scene
    function forceScene() {
        console.log('[AUTO-LOGIN] Force chuyển scene...');
        setTimeout(function() {
            try {
                if (typeof S_GONGJI !== 'undefined') {
                    S_GONGJI.init && S_GONGJI.init();
                    S_GONGJI.make_screen && S_GONGJI.make_screen();
                    if (typeof glo !== 'undefined' && glo.scene) glo.scene.cur = S_GONGJI;
                    console.log('→ S_GONGJI');
                }
            } catch(e) {}

            setTimeout(function() {
                try {
                    if (typeof S_ATTENDANCE !== 'undefined') {
                        S_ATTENDANCE.init && S_ATTENDANCE.init();
                        S_ATTENDANCE.make_screen && S_ATTENDANCE.make_screen();
                        if (typeof glo !== 'undefined' && glo.scene) glo.scene.cur = S_ATTENDANCE;
                        console.log('→ S_ATTENDANCE');
                    }
                } catch(e) {}

                setTimeout(function() {
                    try {
                        if (typeof S_MAINMENU !== 'undefined') {
                            S_MAINMENU.init && S_MAINMENU.init();
                            S_MAINMENU.make_screen && S_MAINMENU.make_screen();
                            S_MAINMENU.make_screen_top && S_MAINMENU.make_screen_top();
                            if (typeof glo !== 'undefined' && glo.scene) glo.scene.cur = S_MAINMENU;
                            console.log('→ S_MAINMENU');
                            console.log('🎮 Main Menu!');
                        }
                    } catch(e) {}
                }, 1500);
            }, 1500);
        }, 500);
    }

    // Fetch data từ bridge
    function fetchData() {
        console.log('[AUTO-LOGIN] 📥 Fetch data từ bridge...');
        
        // Lấy uniq_id từ localStorage (nếu có), không thì dùng default
        var uniqId = localStorage.getItem('gtd_uniq_id') || DEFAULT_UNIQ;
        var email = localStorage.getItem('gtd_email') || DEFAULT_HOST;
        
        // Lưu lại
        localStorage.setItem('gtd_uniq_id', uniqId);
        localStorage.setItem('gtd_email', email);
        localStorage.setItem('host_id', email);
        localStorage.setItem('uniq_id', uniqId);

        fetch('/bridge-request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uniq_id: uniqId, host_id: email })
        })
        .then(function(r) {
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return r.json();
        })
        .then(function(json) {
            console.log('[AUTO-LOGIN] 📥 Nhận JSON. Top keys:', Object.keys(json).join(','));
            
            var V = parseVALUE(json);
            if (!V) {
                console.log('[AUTO-LOGIN] ⚠️ Không parse được VALUE');
                return;
            }
            
            console.log('[AUTO-LOGIN] ✅ VALUE có', Object.keys(V).length, 'entries');
            
            // Fix charbook trước khi decode
            fixCharbook(V);
            
            // ✅ FIX: Init charbook TRƯỚC khi decode
            if (typeof STORAGE !== 'undefined' && STORAGE.init_charbook) {
                try {
                    STORAGE.init_charbook();
                    console.log('[AUTO-LOGIN] ✅ init_charbook OK');
                } catch(e) {
                    console.log('[AUTO-LOGIN] ⚠️ init_charbook lỗi:', e.message);
                }
            }
            
            // Decode
            if (typeof STORAGE !== 'undefined' && STORAGE.decode_data_all) {
                try {
                    STORAGE.decode_data_all(V);
                    console.log('[AUTO-LOGIN] ✅ decode_data_all OK');
                    console.log('[AUTO-LOGIN] USER.ruby:', typeof USER !== 'undefined' ? USER.ruby : 'N/A');
                } catch(e) {
                    console.log('[AUTO-LOGIN] ❌ decode lỗi:', e.message);
                    console.log('[AUTO-LOGIN] Stack:', e.stack);
                }
            }
            
            // Chuyển scene
            setTimeout(forceScene, 1000);
        })
        .catch(function(e) {
            console.log('[AUTO-LOGIN] ❌ Lỗi fetch:', e.message);
            // Thử chuyển scene dù không có data
            setTimeout(forceScene, 2000);
        });
    }

    // Chạy sau khi game load
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(fetchData, 2000);
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(fetchData, 2000);
        });
    }

    console.log('[AUTO-LOGIN] ✅ Đã cài đặt — sẽ auto login sau 2s');
})();
