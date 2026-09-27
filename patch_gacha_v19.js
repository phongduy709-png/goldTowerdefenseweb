// ==================== PATCH GACHA V19 ====================
(function() {
    console.log('[PATCH-GACHA] Khởi động');
    var patched = false;
    var popupInterval = null;

    function fixPopupButtons() {
        var b1 = document.getElementById('PUT_btn1');
        var b2 = document.getElementById('PUT_btn2');
        if (!b1 || !b2) return false;
        b1.style.cssText = 'position:absolute;left:108px;top:302px;width:154px;height:72px;display:block;z-index:99999;transform:none;';
        b2.style.cssText = 'position:absolute;left:288px;top:302px;width:154px;height:72px;display:block;z-index:99999;transform:none;';
        return true;
    }

    function hidePopup() {
        var d = document.getElementById('S_POPUPTOT_div');
        if (d) {
            d.style.display = 'none';
            d.style.pointerEvents = 'none';
            d.style.visibility = 'hidden';
            d.style.zIndex = '-1';
        }
        if (popupInterval) {
            clearInterval(popupInterval);
            popupInterval = null;
            console.log('[PATCH-GACHA] 🛑 Clear interval');
        }
    }

    function showPopup() {
        var d = document.getElementById('S_POPUPTOT_div');
        if (d) {
            d.style.display = 'block';
            d.style.pointerEvents = 'auto';
            d.style.visibility = 'visible';
            d.style.zIndex = 'auto';
        }
    }

    function patch() {
        if (patched) return;
        if (typeof PHP === 'undefined' || typeof S_GACHA === 'undefined') {
            setTimeout(patch, 500);
            return;
        }
        patched = true;
        console.log('[PATCH-GACHA] ✅ Patch');

        var _gInit = S_GACHA.init;
        S_GACHA.init = function() {
            console.log('[PATCH-GACHA] 🎯 S_GACHA.init()');
            hidePopup();
            var r = _gInit.apply(this, arguments);
            setTimeout(function() {
                try {
                    S_GACHA.make_tag();
                    if (!S_GACHA.data_select) S_GACHA.data_select = { cur_gage:0, ad_time:0, currency_type:'dia', select_tower:0, select_attr:0 };
                    S_GACHA.make_screen();
                    console.log('[PATCH-GACHA] 🎨 make_screen OK');
                } catch(e) { console.log('[PATCH-GACHA] ❌', e.message); }
            }, 150);
            return r;
        };

        if (window.S_POPUPTOT && S_POPUPTOT.init) {
            var _pInit = S_POPUPTOT.init;
            S_POPUPTOT.init = function() {
                console.log('[PATCH-GACHA] 🎯 S_POPUPTOT.init()');
                window.__gacha_processing = false;

                if (popupInterval) {
                    clearInterval(popupInterval);
                    popupInterval = null;
                }

                var r = _pInit.apply(this, arguments);
                showPopup();

                var cnt = 0;
                popupInterval = setInterval(function() {
                    cnt++;
                    try {
                        var d = document.getElementById('S_POPUPTOT_div');
                        if (d && d.style.display === 'none') {
                            showPopup();
                        }
                        if (cnt % 4 === 0) fixPopupButtons();
                    } catch(e) {}
                    if (cnt > 100) {
                        clearInterval(popupInterval);
                        popupInterval = null;
                    }
                }, 100);
                setTimeout(fixPopupButtons, 200);
                return r;
            };
        }

        document.addEventListener('mousedown', function(e) {
            try {
                var scene = ChangeScene.after_s;
                var p1 = e.target ? e.target.id : '';
                var p2 = e.target && e.target.parentElement ? e.target.parentElement.id : '';

                if (scene === 'S_GACHA') {
                    if (p1 === 'GC_gacha_board_select_tower_btn_txt' ||
                        p1 === 'GC_gacha_board_select_tower_btn_bg' ||
                        p1 === 'GC_gacha_board_img_tower' ||
                        p2 === 'GC_gacha_board_select_tower_btn') {
                        if (!S_GACHA.select_tower_popup_on) {
                            console.log('[PATCH-GACHA] 🎯 Mở popup chọn tháp');
                            setTimeout(function() {
                                try { S_GACHA.make_select_tower_popup(); } catch(err) { console.log('[PATCH-GACHA] ❌', err.message); }
                            }, 50);
                        }
                    }
                }

                if (scene === 'S_POPUPTOT') {
                    if (p1 === 'PUT_btn1' || p1 === 'PUT_btn1_txt1' || p1 === 'PUT_btn1_bg' || p2 === 'PUT_btn1') {
                        if (window.__gacha_processing === true) {
                            console.log('[PATCH-GACHA] ⏭️ Đang xử lý');
                            e.preventDefault();
                            e.stopPropagation();
                            return false;
                        }
                        window.__gacha_processing = true;

                        var cmt = '타워선택:pay10';
                        console.log('[PATCH-GACHA] 🎯 Bấm CÓ → 10 thẻ |', cmt);

                        fetch('/api/gacha', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ COMMENT: cmt, UNIQ_ID: 'TDM270533qAb' })
                        })
                        .then(function(r) { return r.json(); })
                        .then(function(j) {
                            var parsed = j.parsed;
                            if (!parsed && j.output) {
                                try {
                                    var m = j.output.match(/\{[\s\S]*\}/);
                                    if (m) parsed = JSON.parse(m[0]);
                                } catch(e) {}
                            }

                            if (parsed && parsed.RESULT === 'OK' && parsed.VALUE) {
                                var v = parsed.VALUE;
                                var ra = (v.result || '').split(',').filter(Boolean);
                                console.log('[PATCH-GACHA] 🎲 Result:', v.result);
                                console.log('[PATCH-GACHA] 🎲 Số tháp:', ra.length);

                                if (v.RUBY && STORAGE.rubydiagold) STORAGE.rubydiagold.RUBY = v.RUBY;
                                if (v.DIA && STORAGE.rubydiagold) STORAGE.rubydiagold.DIA = v.DIA;

                                if (ra.length > 0 && window.S_GACHA_COMPLETE) {
                                    S_GACHA_COMPLETE.result_tower = ra;
                                    S_GACHA_COMPLETE.card_num = ra.length;

                                    var resultArr = [{}];
                                    ra.forEach(function(id, idx) {
                                        var col = idx % 5;
                                        var row = Math.floor(idx / 5);
                                        resultArr.push({
                                            tower_bunho_g: "TOWER:" + id,
                                            x: 240 + col * 180,
                                            y: 180 + row * 260,
                                            w: 168,
                                            h: 220
                                        });
                                    });
                                    S_GACHA_COMPLETE.result = resultArr;
                                    console.log('[PATCH-GACHA] 📦 card_num:', S_GACHA_COMPLETE.card_num);

                                    if (typeof STORAGE.decode_tower === 'function' && v.selected_tower) {
                                        STORAGE.decode_tower({selected_tower: v.selected_tower, bou_tower: v.bou_tower, rainbow_card: v.rainbow_card});
                                    }
                                }

                                hidePopup();
                                console.log('[PATCH-GACHA] 🚫 Ẩn popup');

                                setTimeout(function() {
                                    console.log('[PATCH-GACHA] 🎬 Chuyển S_GACHA_COMPLETE');
                                    try {
                                        if (window.ChangeScene && ChangeScene.start && window.S_GACHA_COMPLETE) {
                                            ChangeScene.start('S_POPUPTOT', 'S_GACHA_COMPLETE', S_GACHA_COMPLETE, ChangeScene.TYPE_NORMAL);
                                        }
                                        setTimeout(hidePopup, 100);
                                        setTimeout(hidePopup, 500);

                                        setTimeout(function() {
                                            try {
                                                if (window.S_GACHA_COMPLETE) {
                                                    if (typeof S_GACHA_COMPLETE.make_tag === 'function') S_GACHA_COMPLETE.make_tag();
                                                    if (typeof S_GACHA_COMPLETE.make_screen === 'function') S_GACHA_COMPLETE.make_screen();
                                                    if (typeof S_GACHA_COMPLETE.make_screen_card === 'function') S_GACHA_COMPLETE.make_screen_card();
                                                    console.log('[PATCH-GACHA] 🎨 S_GACHA_COMPLETE draw OK');
                                                }
                                            } catch(e) { console.log('[PATCH-GACHA] ❌', e.message); }
                                        }, 500);
                                    } catch(e) { console.log('[PATCH-GACHA] ❌ scene:', e.message); }
                                    window.__gacha_processing = false;
                                }, 300);
                            } else {
                                console.log('[PATCH-GACHA] ❌ parsed fail');
                                window.__gacha_processing = false;
                            }
                        })
                        .catch(function(err) {
                            console.log('[PATCH-GACHA] ❌ fetch:', err.message);
                            window.__gacha_processing = false;
                        });
                    }
                }
            } catch(err) {}
        }, true);

        PHP.put_userinfo_gacha = function(comment, cb) {
            console.log('[PATCH-GACHA] ⏭️ bypass:', comment);
            if (cb) cb({RESULT:'OK'});
        };

        console.log('[PATCH-GACHA] ✅ ĐÃ OVERRIDE');
    }

    setTimeout(patch, 3000);
})();
