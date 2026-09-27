// ==================== PATCH: PHP.put_userinfo_tower → /api/thao-thap / /api/lap-thap ====================
(function() {
    console.log('[PATCH-TOWER] Khởi động, chờ 5s cho game load xong...');

    function install() {
        if (typeof PHP === 'undefined' || typeof STORAGE === 'undefined' || !STORAGE.encode_tower) {
            console.log('[PATCH-TOWER] ⏳ Chưa có PHP/STORAGE, retry...');
            setTimeout(install, 500);
            return;
        }

        console.log('[PATCH-TOWER] ✅ Bắt đầu cài đặt override');

        // Lưu selected ban đầu
        fetch('/bridge-request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{}'
        }).then(function(r) { return r.json(); }).then(function(d) {
            if (d.VALUE && d.VALUE.tower && d.VALUE.tower.value) {
                window.__lastSelectedTower = d.VALUE.tower.value.selected_tower || '';
                console.log('[PATCH-TOWER] 📊 selected ban đầu:', window.__lastSelectedTower);
            }
        }).catch(function(e) {
            console.log('[PATCH-TOWER] ⚠️ load selected lỗi:', e.message);
        });

        // Override — ghi đè HOÀN TOÀN
        var _original = PHP.put_userinfo_tower;

        PHP.put_userinfo_tower = function(comment, cb) {
            console.log('[PATCH-TOWER] 🎯 Called! comment:', comment);

            var e;
            try {
                e = STORAGE.encode_tower();
            } catch(err) {
                console.log('[PATCH-TOWER] ❌ encode_tower lỗi:', err.message);
                if (_original) return _original.call(this, comment, cb);
                if (typeof cb === 'function') cb({ RESULT: 'FAIL' });
                return;
            }

            if (!e) {
                console.log('[PATCH-TOWER] ⚠️ encode_tower trả về null');
                if (_original) return _original.call(this, comment, cb);
                if (typeof cb === 'function') cb();
                return;
            }

            var selected = e.selected_tower + '';
            var bou = e.bou_tower + '';

            console.log('[PATCH-TOWER] 📤 SELECTED:', selected);
            console.log('[PATCH-TOWER] 📤 BOU len:', bou.split(',').length);

            var isRemove = /해제|제거|remove|del|tháo/i.test(comment || '');
            var endpoint, payload;

            if (isRemove) {
                endpoint = '/api/thao-thap';
                var oldSelected = (window.__lastSelectedTower || '').split(',').map(function(s){return s.trim();}).filter(Boolean);
                var newSelected = selected.split(',').map(function(s){return s.trim();}).filter(Boolean);
                var removed = oldSelected.filter(function(id){ return newSelected.indexOf(id) < 0; });

                payload = {
                    UNIQ_ID: (window.gEntrix && window.gEntrix.uniq_id) || 'TDM270533qAb',
                    HOST_ID: (window.gEntrix && window.gEntrix.host_id) || 'le0912760@gmail.com',
                    SELECTED_TOWER: oldSelected.join(','),
                    BOU_TOWER: bou,
                    REMOVE_IDS: removed.join(','),
                    REMOVE_ALL: false,
                    COMMENT: comment || 'Tháo từ game'
                };
                console.log('[PATCH-TOWER] 💥 THÁO:', removed.join(','));
            } else {
                endpoint = '/api/lap-thap';
                payload = {
                    UNIQ_ID: (window.gEntrix && window.gEntrix.uniq_id) || 'TDM270533qAb',
                    HOST_ID: (window.gEntrix && window.gEntrix.host_id) || 'le0912760@gmail.com',
                    SELECTED_TOWER: selected,
                    BOU_TOWER: bou,
                    COMMENT: comment || 'Lắp từ game'
                };
                console.log('[PATCH-TOWER] 🔨 LẮP:', selected);
            }

            window.__lastSelectedTower = selected;

            console.log('[PATCH-TOWER] 🚀 POST', endpoint);

            fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(function(r) { return r.json(); })
            .then(function(json) {
                console.log('[PATCH-TOWER] ✅ Response:', JSON.stringify(json).substring(0, 400));
                if (json.output) console.log('[PATCH-TOWER] 📥 node -e output:', json.output.substring(0, 600));
                if (json.ok && json.output) {
                    try {
                        var m = json.output.match(/\{[\s\S]*\}/);
                        if (m) {
                            var parsed = JSON.parse(m[0]);
                            if (parsed.VALUE && STORAGE.decode_tower) {
                                STORAGE.decode_tower(parsed.VALUE);
                                console.log('[PATCH-TOWER] 🔄 decode_tower OK');
                            }
                        }
                    } catch(pe) {
                        console.log('[PATCH-TOWER] ⚠️ parse lỗi:', pe.message);
                    }
                }
                if (typeof cb === 'function') cb(json);
            })
            .catch(function(err) {
                console.log('[PATCH-TOWER] ❌ fetch lỗi:', err.message);
                if (typeof cb === 'function') cb({ RESULT: 'FAIL', error: err.message });
            });
        };

        console.log('[PATCH-TOWER] ✅ ĐÃ OVERRIDE. Kiểm tra:', typeof PHP.put_userinfo_tower);
    }

    // Delay 5s để chắc chắn mọi patch cũ đã chạy
    setTimeout(install, 5000);
})();
