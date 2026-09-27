// ==================== PATCH: PHP.put_userinfo_tower + hero qua /api/lap-thap + /api/hero ====================
(function() {
    console.log('[PATCH-PHP] Bắt đầu patch PHP.put_userinfo_tower/hero');

    function waitFor(cond, cb, tries) {
        tries = tries || 0;
        if (tries > 100) { console.log('[PATCH-PHP] ⏰ Timeout chờ'); return; }
        if (cond()) return cb();
        setTimeout(function() { waitFor(cond, cb, tries + 1); }, 100);
    }

    waitFor(function() { return typeof PHP !== 'undefined' && typeof STORAGE !== 'undefined' && STORAGE.encode_tower; }, function() {
        console.log('[PATCH-PHP] ✅ PHP + STORAGE đã sẵn sàng');

        // ============ TOWER ============
        PHP.put_userinfo_tower = function(comment, cb) {
            console.log('[PATCH-PHP] 🗼 put_userinfo_tower called:', comment);

            var e;
            try {
                e = STORAGE.encode_tower();
            } catch(err) {
                console.log('[PATCH-PHP] ❌ encode_tower lỗi:', err.message);
                if (typeof cb === 'function') cb({ RESULT: 'FAIL' });
                return;
            }

            console.log('[PATCH-PHP] 📤 SELECTED_TOWER:', e.selected_tower);
            console.log('[PATCH-PHP] 📤 BOU_TOWER len:', (e.bou_tower || '').split(',').length);

            // Xác định hành động: nếu SELECTED_TOWER rỗng hơn so với BOU → có thể là tháo
            // Nhưng để CHẮC CHẮN dùng đúng format node -e, ta gọi /api/lap-thap (hoặc /api/thao-thap nếu SELECTED rỗng)
            var endpoint = '/api/lap-thap';
            var payload = {
                UNIQ_ID: (window.gEntrix && window.gEntrix.uniq_id) || 'TDM270533qAb',
                HOST_ID: (window.gEntrix && window.gEntrix.host_id) || 'le0912760@gmail.com',
                SELECTED_TOWER: e.selected_tower + '',
                BOU_TOWER: e.bou_tower + '',
                COMMENT: comment || 'Tower update'
            };

            console.log('[PATCH-PHP] 🚀 Gọi:', endpoint);

            window.__REAL_FETCH(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(function(r) { return r.json(); })
            .then(function(json) {
                console.log('[PATCH-PHP] ✅ Response:', JSON.stringify(json).substring(0, 300));
                console.log('[PATCH-PHP] 📥 node -e output:', (json.output || '').substring(0, 500));

                // Parse output từ node -e để cập nhật STORAGE nếu cần
                if (json.ok && json.output) {
                    try {
                        var m = json.output.match(/\{[\s\S]*\}/);
                        if (m) {
                            var parsed = JSON.parse(m[0]);
                            if (parsed.VALUE && STORAGE.decode_tower) {
                                STORAGE.decode_tower(parsed.VALUE);
                                console.log('[PATCH-PHP] 🔄 Đã decode_tower từ node -e output');
                            }
                        }
                    } catch(pe) {
                        console.log('[PATCH-PHP] ⚠️ Không parse được output:', pe.message);
                    }
                }

                if (typeof cb === 'function') cb(json);
            })
            .catch(function(err) {
                console.log('[PATCH-PHP] ❌ Fetch lỗi:', err.message);
                if (typeof cb === 'function') cb({ RESULT: 'FAIL', error: err.message });
            });
        };

        // ============ HERO ============
        PHP.put_userinfo_hero = function(comment, cb) {
            console.log('[PATCH-PHP] 🦸 put_userinfo_hero called:', comment);

            var e;
            try {
                e = STORAGE.encode_hero();
            } catch(err) {
                console.log('[PATCH-PHP] ❌ encode_hero lỗi:', err.message);
                if (typeof cb === 'function') cb({ RESULT: 'FAIL' });
                return;
            }

            var payload = {
                UNIQ_ID: (window.gEntrix && window.gEntrix.uniq_id) || 'TDM270533qAb',
                HOST_ID: (window.gEntrix && window.gEntrix.host_id) || 'le0912760@gmail.com',
                SELECTED_HERO: e.selected_hero + '',
                BOU_HERO: e.bou_hero + '',
                SELECTED_HERO_MAX: e.selected_hero_max + '',
                COMMENT: comment || 'Hero update'
            };

            console.log('[PATCH-PHP] 🚀 Gọi: /api/hero');

            window.__REAL_FETCH('/api/hero', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(function(r) { return r.json(); })
            .then(function(json) {
                console.log('[PATCH-PHP] ✅ Hero response:', JSON.stringify(json).substring(0, 300));
                console.log('[PATCH-PHP] 📥 node -e output:', (json.output || '').substring(0, 500));

                if (json.ok && json.output) {
                    try {
                        var m = json.output.match(/\{[\s\S]*\}/);
                        if (m) {
                            var parsed = JSON.parse(m[0]);
                            if (parsed.VALUE && STORAGE.decode_hero) {
                                STORAGE.decode_hero(parsed.VALUE);
                                console.log('[PATCH-PHP] 🔄 Đã decode_hero từ node -e output');
                            }
                        }
                    } catch(pe) {}
                }

                if (typeof cb === 'function') cb(json);
            })
            .catch(function(err) {
                console.log('[PATCH-PHP] ❌ Hero fetch lỗi:', err.message);
                if (typeof cb === 'function') cb({ RESULT: 'FAIL', error: err.message });
            });
        };

        console.log('[PATCH-PHP] ✅ Đã patch put_userinfo_tower + put_userinfo_hero → /api/lap-thap + /api/hero');
    });
})();
