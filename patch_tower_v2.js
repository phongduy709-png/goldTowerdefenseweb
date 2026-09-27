// ==================== PATCH V17b: || format + dồn slot ====================
(function() {
    console.log('[PATCH-V17b] Khởi động');
    var installed = false, checkCount = 0;

    window.__pendingTowerId = null;
    window.__pendingRemoveId = null;

    function install() {
        checkCount++;
        if (typeof PHP === 'undefined' || typeof STORAGE === 'undefined' || typeof STORAGE.encode_tower !== 'function') {
            if (checkCount < 100) setTimeout(install, 100);
            return;
        }
        if (installed) return;
        installed = true;
        console.log('[PATCH-V17b] ✅ PHP + STORAGE OK');

        // Lấy ID từ mảng slot
        function slotsToIds(slots) {
            return slots.filter(function(x){ return x && x !== 0; });
        }

        // Gửi server: format slot-based "ID1,ID2||...||...||N"
        function slotsToServerStr(slots) {
            var ids = slotsToIds(slots);
            var deckCSV = ids.join(',');
            return deckCSV + '||||||3';  // 3 deck (deck 1 có tháp, 2-3 rỗng)
        }

        // Dồn mảng
        function compactSlots(slots) {
            var ids = slotsToIds(slots);
            var newSlots = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (var i = 0; i < ids.length && i < 11; i++) newSlots[i] = ids[i];
            return newSlots;
        }

        function setSlots(newSlots, bouStr) {
            try {
                var compacted = compactSlots(newSlots);

                STORAGE.tower_selected.length = 0;
                compacted.forEach(function(x) { STORAGE.tower_selected.push(x); });
                console.log('[PATCH-V17b] ✅ tower_selected =', JSON.stringify(STORAGE.tower_selected));

                var deckIdx = STORAGE.tower_deck_selected || 1;
                if (Array.isArray(STORAGE.tower_deck) && STORAGE.tower_deck[deckIdx]) {
                    STORAGE.tower_deck[deckIdx].length = 0;
                    compacted.forEach(function(x) { STORAGE.tower_deck[deckIdx].push(x); });
                }

                setTimeout(function() {
                    try {
                        if (ChangeScene.after_s === 'S_MAKETEAM_TOWER' && window.S_MAKETEAM_TOWER) {
                            if (typeof S_MAKETEAM_TOWER.make_screen_selected === 'function') {
                                S_MAKETEAM_TOWER.make_screen_selected();
                            }
                            if (typeof S_MAKETEAM_TOWER.make_screen_bou === 'function') {
                                S_MAKETEAM_TOWER.make_screen_bou();
                            }
                            console.log('[PATCH-V17b] 🎨 Đã vẽ lại UI');
                        }
                    } catch(e) { console.log('[PATCH-V17b] ❌ redraw:', e.message); }
                }, 100);
            } catch(e) {
                console.log('[PATCH-V17b] ❌ setSlots:', e.message);
            }
        }

        function getSlots() {
            if (Array.isArray(STORAGE.tower_selected)) {
                return STORAGE.tower_selected.slice();
            }
            return [0,0,0,0,0,0,0,0,0,0,0];
        }

        // Load selected ban đầu — parse từ server
        fetch('/bridge-request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' })
        .then(function(r) { return r.json(); })
        .then(function(d) {
            if (d.VALUE && d.VALUE.tower && d.VALUE.tower.value) {
                var sel = d.VALUE.tower.value.selected_tower || '';
                console.log('[PATCH-V17b] 📊 server selected:', sel);

                // Parse từ server → mảng slot
                var ids = [];
                if (sel.indexOf('||') >= 0) {
                    // Slot-based: lấy deck 1
                    var deck1 = sel.split('||')[0];
                    ids = deck1.split(',').map(function(x){return x.trim();}).filter(Boolean);
                } else if (sel.indexOf(',') >= 0) {
                    ids = sel.split(',').map(function(x){return x.trim();}).filter(Boolean);
                } else if (sel) {
                    ids = [sel.trim()];
                }

                // Ghi đè STORAGE.tower_selected với data từ server
                var newSlots = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (var i = 0; i < ids.length && i < 11; i++) {
                    newSlots[i] = parseInt(ids[i]);
                }
                STORAGE.tower_selected.length = 0;
                newSlots.forEach(function(x) { STORAGE.tower_selected.push(x); });
                console.log('[PATCH-V17b] ✅ Sync STORAGE:', JSON.stringify(STORAGE.tower_selected));

                // Nếu đang ở scene TOWER, vẽ lại
                setTimeout(function() {
                    if (ChangeScene.after_s === 'S_MAKETEAM_TOWER' && window.S_MAKETEAM_TOWER) {
                        if (typeof S_MAKETEAM_TOWER.make_screen_selected === 'function') {
                            S_MAKETEAM_TOWER.make_screen_selected();
                        }
                    }
                }, 500);
            }
        }).catch(function(e) { console.log('[PATCH-V17b] ⚠️', e.message); });

        var hookScene = setInterval(function() {
            if (window.S_MAKETEAM_TOWER && typeof S_MAKETEAM_TOWER.add_tower_to_selected === 'function') {
                if (S_MAKETEAM_TOWER.__hooked_v17b) { clearInterval(hookScene); return; }
                S_MAKETEAM_TOWER.__hooked_v17b = true;
                clearInterval(hookScene);
                console.log('[PATCH-V17b] 🎯 Hook scene');

                var _origAdd = S_MAKETEAM_TOWER.add_tower_to_selected;
                var _origDel = S_MAKETEAM_TOWER.del_tower_to_selected;

                S_MAKETEAM_TOWER.add_tower_to_selected = function() {
                    var args = Array.from(arguments);
                    for (var i = 0; i < args.length; i++) {
                        if (typeof args[i] === 'number' && args[i] > 100) { window.__pendingTowerId = String(args[i]); break; }
                        if (typeof args[i] === 'string' && /^\d+$/.test(args[i]) && parseInt(args[i]) > 100) { window.__pendingTowerId = args[i]; break; }
                    }
                    return _origAdd.apply(this, arguments);
                };

                S_MAKETEAM_TOWER.del_tower_to_selected = function() {
                    var args = Array.from(arguments);
                    for (var i = 0; i < args.length; i++) {
                        if (typeof args[i] === 'number' && args[i] > 100) { window.__pendingRemoveId = String(args[i]); break; }
                        if (typeof args[i] === 'string' && /^\d+$/.test(args[i]) && parseInt(args[i]) > 100) { window.__pendingRemoveId = args[i]; break; }
                    }
                    return _origDel.apply(this, arguments);
                };

                console.log('[PATCH-V17b] ✅ Đã hook scene');
            }
        }, 500);

        PHP.put_userinfo_tower = function(comment, cb) {
            console.log('[PATCH-V17b] 🎯 comment:', comment);

            var isRemove = /해제|제거/i.test(comment || '');
            var isSelect = /선택/i.test(comment || '') && !isRemove;

            var e;
            try { e = STORAGE.encode_tower(); } catch(err) { e = null; }
            if (!e) { if (cb) cb(); return; }

            var bou = String(e.bou_tower || '');
            var slots = getSlots();

            if (isSelect) {
                var addId = window.__pendingTowerId;
                if (!addId) { if (cb) cb({RESULT:'SKIP'}); return; }
                var numAdd = parseInt(addId);

                if (slots.indexOf(numAdd) >= 0) {
                    console.log('[PATCH-V17b] ⚠️ Tháp', numAdd, 'đã có');
                    window.__pendingTowerId = null;
                    if (cb) cb({RESULT:'DUP'});
                    return;
                }

                slots = compactSlots(slots);
                var emptyIdx = slots.indexOf(0);
                if (emptyIdx < 0) {
                    console.log('[PATCH-V17b] ⚠️ Hết slot');
                    window.__pendingTowerId = null;
                    if (cb) cb({RESULT:'FULL'});
                    return;
                }
                slots[emptyIdx] = numAdd;
                var serverStr = slotsToServerStr(slots);

                console.log('[PATCH-V17b] 🔨 LẮP', numAdd, 'vào slot', emptyIdx, '→ server:', serverStr);
                window.__pendingTowerId = null;

                var payload = {
                    UNIQ_ID: (window.gEntrix && window.gEntrix.uniq_id) || 'TDM270533qAb',
                    HOST_ID: (window.gEntrix && window.gEntrix.host_id) || 'le0912760@gmail.com',
                    SELECTED_TOWER: serverStr,
                    BOU_TOWER: bou,
                    COMMENT: 'Lắp ' + numAdd
                };

                fetch('/api/lap-thap', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                })
                .then(function(r) { return r.json(); })
                .then(function(json) {
                    console.log('[PATCH-V17b] ✅ LẮP done | ok:', json.ok);
                    setSlots(slots, bou);
                    if (cb) cb(json);
                })
                .catch(function(err) { console.log('[PATCH-V17b] ❌', err.message); if (cb) cb({RESULT:'FAIL'}); });
                return;
            }

            if (isRemove) {
                var remId = window.__pendingRemoveId;
                if (!remId) {
                    var m2 = (comment || '').match(/index:(\d+)/);
                    var idx = m2 ? parseInt(m2[1]) : -1;
                    if (idx >= 1 && idx <= 11) remId = slots[idx - 1];
                }
                if (!remId) { if (cb) cb({RESULT:'NOOP'}); return; }
                var numRem = parseInt(remId);

                var remIdx = slots.indexOf(numRem);
                if (remIdx < 0) {
                    console.log('[PATCH-V17b] ⚠️ Không tìm thấy', numRem);
                    window.__pendingRemoveId = null;
                    if (cb) cb({RESULT:'NOT_FOUND'});
                    return;
                }

                slots[remIdx] = 0;
                slots = compactSlots(slots);
                var serverStr2 = slotsToServerStr(slots);

                console.log('[PATCH-V17b] 💥 THÁO', numRem, '→ dồn → server:', serverStr2);
                window.__pendingRemoveId = null;

                var payload2 = {
                    UNIQ_ID: (window.gEntrix && window.gEntrix.uniq_id) || 'TDM270533qAb',
                    HOST_ID: (window.gEntrix && window.gEntrix.host_id) || 'le0912760@gmail.com',
                    SELECTED_TOWER: serverStr2,
                    BOU_TOWER: bou,
                    COMMENT: 'Tháo ' + numRem
                };

                fetch('/api/lap-thap', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload2)
                })
                .then(function(r) { return r.json(); })
                .then(function(json) {
                    console.log('[PATCH-V17b] ✅ THÁO done | ok:', json.ok);
                    setSlots(slots, bou);
                    if (cb) cb(json);
                })
                .catch(function(err) { console.log('[PATCH-V17b] ❌', err.message); if (cb) cb({RESULT:'FAIL'}); });
                return;
            }

            if (cb) cb({RESULT:'UNKNOWN'});
        };

        PHP.put_userinfo_hero = function(comment, cb) {
            var e;
            try { e = STORAGE.encode_hero(); } catch(err) { if (cb) cb(); return; }
            if (!e) { if (cb) cb(); return; }
            var payload = {
                UNIQ_ID: (window.gEntrix && window.gEntrix.uniq_id) || 'TDM270533qAb',
                HOST_ID: (window.gEntrix && window.gEntrix.host_id) || 'le0912760@gmail.com',
                SELECTED_HERO: e.selected_hero + '',
                BOU_HERO: e.bou_hero + '',
                SELECTED_HERO_MAX: (STORAGE.hero_selected_max || 5) + '',
                COMMENT: comment || 'Hero'
            };
            fetch('/api/hero', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
            .then(function(r) { return r.json(); })
            .then(function(json) { if (cb) cb(json); })
            .catch(function(err) { if (cb) cb({RESULT:'FAIL'}); });
        };

        console.log('[PATCH-V17b] ✅ ĐÃ OVERRIDE');
    }

    setTimeout(install, 3000);
})();
