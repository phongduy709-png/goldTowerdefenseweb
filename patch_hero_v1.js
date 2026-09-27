// ==================== PATCH HERO V3: 10 slot, index 0 luôn = 0 ====================
(function() {
    console.log('[PATCH-HERO-V3] Khởi động');
    var installed = false, checkCount = 0;

    function install() {
        checkCount++;
        if (typeof PHP === 'undefined' || typeof STORAGE === 'undefined' || typeof STORAGE.encode_hero !== 'function') {
            if (checkCount < 100) setTimeout(install, 100);
            return;
        }
        if (installed) return;
        installed = true;
        console.log('[PATCH-HERO-V3] ✅ PHP + STORAGE OK');

        // Mảng 10 phần tử, index 0 luôn = 0
        function makeEmptySlots() {
            return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }

        function slotsToStr(slots) {
            // Bỏ index 0 + bỏ 0
            return slots.slice(1).filter(function(x){ return x && x !== 0; }).join('|');
        }

        // Dồn hero lên, KHÔNG đụng index 0 (luôn = 0)
        function compactSlots(slots) {
            var ids = slots.slice(1).filter(function(x){ return x && x !== 0; });
            var newSlots = makeEmptySlots();
            for (var i = 0; i < ids.length && i < 10; i++) {
                newSlots[i + 1] = ids[i];  // Bắt đầu từ index 1
            }
            return newSlots;
        }

        function setSlots(newSlots) {
            try {
                var compacted = compactSlots(newSlots);

                STORAGE.hero_selected.length = 0;
                compacted.forEach(function(x) { STORAGE.hero_selected.push(x); });
                console.log('[PATCH-HERO-V3] ✅ hero_selected =', JSON.stringify(STORAGE.hero_selected));

                setTimeout(function() {
                    try {
                        if (ChangeScene.after_s === 'S_MAKETEAM_HERO' && window.S_MAKETEAM_HERO) {
                            if (typeof S_MAKETEAM_HERO.make_screen_selected === 'function') {
                                S_MAKETEAM_HERO.make_screen_selected();
                            }
                            if (typeof S_MAKETEAM_HERO.make_screen_bou === 'function') {
                                S_MAKETEAM_HERO.make_screen_bou();
                            }
                            console.log('[PATCH-HERO-V3] 🎨 Đã vẽ lại UI');
                        }
                    } catch(e) { console.log('[PATCH-HERO-V3] ❌ redraw:', e.message); }
                }, 100);
            } catch(e) {
                console.log('[PATCH-HERO-V3] ❌ setSlots:', e.message);
            }
        }

        // Đọc slots hiện tại, CHUẨN HÓA về mảng 10 phần tử
        function getSlots() {
            var cur = Array.isArray(STORAGE.hero_selected) ? STORAGE.hero_selected.slice() : [];
            // Đảm bảo 10 phần tử
            while (cur.length < 10) cur.push(0);
            // Index 0 = 0
            cur[0] = 0;
            return cur;
        }

        var hookScene = setInterval(function() {
            if (window.S_MAKETEAM_HERO && typeof S_MAKETEAM_HERO.add_hero_to_selected === 'function') {
                if (S_MAKETEAM_HERO.__hooked_hero_v3) { clearInterval(hookScene); return; }
                S_MAKETEAM_HERO.__hooked_hero_v3 = true;
                clearInterval(hookScene);
                console.log('[PATCH-HERO-V3] 🎯 Hook scene OK');
            }
        }, 500);

        PHP.put_userinfo_hero = function(comment, cb) {
            console.log('[PATCH-HERO-V3] 🎯 comment:', comment);

            var isRemove = /해제|제거/i.test(comment || '');
            var isSelect = /선택/i.test(comment || '') && !isRemove;

            var e;
            try { e = STORAGE.encode_hero(); } catch(err) { e = null; }
            if (!e) { if (cb) cb(); return; }

            var bou = String(e.bou_hero || '');
            var slots = getSlots();
            var maxHero = parseInt(STORAGE.hero_selected_max) || 9;

            console.log('[PATCH-HERO-V3] 📋 current:', slotsToStr(slots));

            // ============ LẮP ============
            if (isSelect) {
                var m = (comment || '').match(/:(\d+)/);
                var addId = m ? parseInt(m[1]) : null;
                if (!addId) { if (cb) cb({RESULT:'SKIP'}); return; }

                if (slots.indexOf(addId) >= 0) {
                    console.log('[PATCH-HERO-V3] ⚠️ Hero', addId, 'đã có');
                    if (cb) cb({RESULT:'DUP'});
                    return;
                }

                slots = compactSlots(slots);

                // Đếm số hero hiện có (bỏ index 0)
                var currentCount = slots.slice(1).filter(function(x){ return x && x !== 0; }).length;
                if (currentCount >= maxHero) {
                    console.log('[PATCH-HERO-V3] ⚠️ Đã đủ', maxHero, 'hero');
                    if (cb) cb({RESULT:'FULL'});
                    return;
                }

                // Tìm slot trống TỪ INDEX 1
                var emptyIdx = -1;
                for (var i = 1; i < slots.length; i++) {
                    if (slots[i] === 0) { emptyIdx = i; break; }
                }
                if (emptyIdx < 0) { if (cb) cb({RESULT:'FULL'}); return; }

                slots[emptyIdx] = addId;
                var newStr = slotsToStr(slots);

                console.log('[PATCH-HERO-V3] 🔨 LẮP', addId, 'vào slot', emptyIdx, '→', newStr);

                var payload = {
                    UNIQ_ID: (window.gEntrix && window.gEntrix.uniq_id) || 'TDM270533qAb',
                    HOST_ID: (window.gEntrix && window.gEntrix.host_id) || 'le0912760@gmail.com',
                    SELECTED_HERO: newStr,
                    BOU_HERO: bou,
                    SELECTED_HERO_MAX: String(maxHero),
                    COMMENT: 'Lắp hero ' + addId
                };

                fetch('/api/hero', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                })
                .then(function(r) { return r.json(); })
                .then(function(json) {
                    console.log('[PATCH-HERO-V3] ✅ LẮP done | ok:', json.ok);
                    setSlots(slots);
                    if (cb) cb(json);
                })
                .catch(function(err) { console.log('[PATCH-HERO-V3] ❌', err.message); if (cb) cb({RESULT:'FAIL'}); });
                return;
            }

            // ============ THÁO ============
            if (isRemove) {
                var m3 = (comment || '').match(/:(\d+)/);
                var remId = m3 ? parseInt(m3[1]) : null;
                if (!remId) { if (cb) cb({RESULT:'NOOP'}); return; }

                var remIdx = slots.indexOf(remId);
                if (remIdx < 0) {
                    console.log('[PATCH-HERO-V3] ⚠️ Không tìm thấy', remId);
                    if (cb) cb({RESULT:'NOT_FOUND'});
                    return;
                }

                slots[remIdx] = 0;
                slots = compactSlots(slots);
                var newStr2 = slotsToStr(slots);

                console.log('[PATCH-HERO-V3] 💥 THÁO', remId, '→ dồn →', newStr2);

                var payload2 = {
                    UNIQ_ID: (window.gEntrix && window.gEntrix.uniq_id) || 'TDM270533qAb',
                    HOST_ID: (window.gEntrix && window.gEntrix.host_id) || 'le0912760@gmail.com',
                    SELECTED_HERO: newStr2,
                    BOU_HERO: bou,
                    SELECTED_HERO_MAX: String(maxHero),
                    COMMENT: 'Tháo hero ' + remId
                };

                fetch('/api/hero', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload2)
                })
                .then(function(r) { return r.json(); })
                .then(function(json) {
                    console.log('[PATCH-HERO-V3] ✅ THÁO done | ok:', json.ok);
                    setSlots(slots);
                    if (cb) cb(json);
                })
                .catch(function(err) { console.log('[PATCH-HERO-V3] ❌', err.message); if (cb) cb({RESULT:'FAIL'}); });
                return;
            }

            if (cb) cb({RESULT:'UNKNOWN'});
        };

        console.log('[PATCH-HERO-V3] ✅ ĐÃ OVERRIDE');
    }

    setTimeout(install, 3000);
})();
