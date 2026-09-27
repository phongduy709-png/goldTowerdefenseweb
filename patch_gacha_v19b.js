// ==================== PATCH GACHA V19b ====================
// CHỈ FIX: Mất nút "Quay lại" + "Tháp" ở lần gacha thứ 2
// Không đụng gì đến logic v19, chỉ restore DOM elements
// =====================================================
(function() {
    console.log('[V19b] Khởi động — Fix mất nút lần 2');
    var patched = false;

    // Danh sách các ID nút cần restore trong S_GACHA
    var BUTTON_IDS = [
        'GC_gacha_board_btn_back',       // Nút quay lại
        'GC_gacha_board_img_tower',      // Nút tháp
        'GC_gacha_board_btn1',           // Nút quay 1
        'GC_gacha_board_btn3',           // Nút quay 10
        'GC_gacha_board_txt_title',
        'GC_gacha_board_btn3_txt',
        'GC_gacha_board_btn3_txt2'
    ];

    function restoreButtons() {
        var div = document.getElementById('S_GACHA_div');
        if (!div) return 0;

        var restored = 0;
        BUTTON_IDS.forEach(function(id) {
            var el = document.getElementById(id);
            if (!el) {
                // Nút không tồn tại → thử tìm trong div S_GACHA
                var found = div.querySelector('#' + CSS.escape(id));
                if (!found) {
                    console.warn('[V19b] ⚠️ Không tìm thấy nút:', id);
                    return;
                }
                el = found;
            }

            // Reset style về mặc định
            if (el.style.display === 'none') {
                el.style.display = '';
                restored++;
            }
            if (el.style.visibility === 'hidden') {
                el.style.visibility = '';
                restored++;
            }
            if (el.style.opacity === '0') {
                el.style.opacity = '';
                restored++;
            }
            if (el.style.pointerEvents === 'none') {
                el.style.pointerEvents = '';
                restored++;
            }
        });

        if (restored > 0) {
            console.log('[V19b] 🔧 Restored', restored, 'properties');
        }
        return restored;
    }

    function patch() {
        if (patched) return;
        if (typeof S_GACHA === 'undefined' || typeof ChangeScene === 'undefined') {
            setTimeout(patch, 500);
            return;
        }
        patched = true;
        console.log('[V19b] ✅ Patch');

        // Hook ChangeScene.start để detect khi về S_GACHA
        var _csStart = ChangeScene.start;
        ChangeScene.start = function(from, to, obj, type) {
            var r = _csStart.apply(this, arguments);

            // Khi vào S_GACHA → restore nút sau khi vẽ xong
            if (to === 'S_GACHA') {
                console.log('[V19b] 🔄 Vào S_GACHA → restore buttons');
                // Restore nhiều lần để chắc chắn (vì make_screen có thể chạy sau)
                setTimeout(restoreButtons, 200);
                setTimeout(restoreButtons, 500);
                setTimeout(restoreButtons, 1000);
                setTimeout(restoreButtons, 2000);
            }

            return r;
        };

        // Hook S_GACHA.init lần nữa — wrap thêm lớp ngoài
        var _gInit2 = S_GACHA.init;
        S_GACHA.init = function() {
            var r = _gInit2.apply(this, arguments);
            console.log('[V19b] 🔄 S_GACHA.init wrapped');
            setTimeout(restoreButtons, 300);
            setTimeout(restoreButtons, 800);
            return r;
        };

        console.log('[V19b] ✅ ĐÃ OVERRIDE');
    }

    setTimeout(patch, 3500);  // Chạy sau v19 (v19 ở 3000ms)

    // Backup: restore định kỳ mỗi 2s khi ở S_GACHA
    setInterval(function() {
        try {
            if (typeof ChangeScene !== 'undefined' && ChangeScene.after_s === 'S_GACHA') {
                restoreButtons();
            }
        } catch(e) {}
    }, 2000);

})();
