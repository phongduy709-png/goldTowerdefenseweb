// ==================== PATCH GACHA V19c ====================
// CHỈ FIX: 2 nút GC_btn1 và GC_btn2 bị display:none ở lần gacha thứ 2
// Đã xác định chính xác nguyên nhân: game set display:none khi thoát S_GACHA
// nhưng không reset lại khi vào lần sau
// =====================================================
(function() {
    console.log('[V19c] 🚀 Khởi động — Fix GC_btn1/GC_btn2');

    var FIX_IDS = ['GC_btn1', 'GC_btn2'];
    var patched = false;

    function restoreButtons() {
        var fixed = [];
        FIX_IDS.forEach(function(id) {
            var el = document.getElementById(id);
            if (!el) return;
            
            // Chỉ fix khi display = none
            if (el.style.display === 'none') {
                el.style.display = '';  // reset về mặc định (block)
                fixed.push(id);
            }
        });
        if (fixed.length > 0) {
            console.log('[V19c] ✅ Restored: ' + fixed.join(', '));
        }
        return fixed.length;
    }

    function patch() {
        if (patched) return;
        if (typeof S_GACHA === 'undefined' || typeof ChangeScene === 'undefined') {
            setTimeout(patch, 500);
            return;
        }
        patched = true;
        console.log('[V19c] ✅ Patch');

        // Hook S_GACHA.init — khi vào lại S_GACHA
        var _gInit = S_GACHA.init;
        S_GACHA.init = function() {
            var r = _gInit.apply(this, arguments);
            console.log('[V19c] 🎯 S_GACHA.init');
            // Restore sau khi game vẽ xong
            setTimeout(restoreButtons, 100);
            setTimeout(restoreButtons, 300);
            setTimeout(restoreButtons, 800);
            return r;
        };

        // Hook S_GACHA.make_screen — nếu game ghi đè ở đây
        if (typeof S_GACHA.make_screen === 'function') {
            var _makeScreen = S_GACHA.make_screen;
            S_GACHA.make_screen = function() {
                var r = _makeScreen.apply(this, arguments);
                setTimeout(restoreButtons, 50);
                setTimeout(restoreButtons, 200);
                return r;
            };
        }

        // Hook ChangeScene — khi scene chuyển về S_GACHA
        var _csStart = ChangeScene.start;
        ChangeScene.start = function(from, to, obj, type) {
            var r = _csStart.apply(this, arguments);
            if (to === 'S_GACHA') {
                console.log('[V19c] 🔄 Vào S_GACHA');
                setTimeout(restoreButtons, 100);
                setTimeout(restoreButtons, 300);
                setTimeout(restoreButtons, 700);
                setTimeout(restoreButtons, 1500);
            }
            return r;
        };

        console.log('[V19c] ✅ ĐÃ OVERRIDE');
    }

    // Chạy patch sau 3.5s (sau v19)
    setTimeout(patch, 3500);

    // Backup: mỗi 1s check nếu đang ở S_GACHA thì restore
    setInterval(function() {
        try {
            if (typeof ChangeScene !== 'undefined' && ChangeScene.after_s === 'S_GACHA') {
                restoreButtons();
            }
        } catch(e) {}
    }, 1000);

})();
