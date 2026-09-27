// ==================== BLOCK ALL REMOTE REQUESTS ====================
// Chặn TOÀN BỘ request đến server thật → dùng 100% file local
// ===================================================================
(function() {
    console.log('[LOCAL-ONLY] 🚀 Khởi động — Chỉ dùng file local');

    var REMOTE_HOSTS = [
        '211.253.26.47',
        '79.133.51.198',
        '103.143.208.187',
        '45.42.40.173',
        'TOWERDEFENCE_COMMON',
        'busidol_traffic'
    ];

    function isRemote(url) {
        var s = String(url);
        
        // CHO PHÉP các URL liên quan đến guild (gọi server chính)
        if (s.toLowerCase().indexOf('guild') >= 0) {
            console.log('[LOCAL-ONLY] ✅ Cho phép guild URL:', s.substring(0, 100));
            return false;
        }
        if (s.toLowerCase().indexOf('put_userinfo_guild') >= 0) {
            console.log('[LOCAL-ONLY] ✅ Cho phép guild API:', s.substring(0, 100));
            return false;
        }
        
        for (var i = 0; i < REMOTE_HOSTS.length; i++) {
            if (s.indexOf(REMOTE_HOSTS[i]) >= 0) return true;
        }
        return false;
    }

    // 1. Chặn fetch
    var _origFetch = window.fetch;
    window.fetch = function(url, opts) {
        if (isRemote(url)) {
            console.log('[LOCAL-ONLY] 🚫 fetch:', String(url).substring(0, 80));
            return Promise.resolve(new Response(JSON.stringify({
                RESULT: 'OK',
                VALUE: 'OK',
                version: 'TD_AMO_20240621'
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }));
        }
        return _origFetch.apply(this, arguments);
    };

    // 2. Chặn XHR — an toàn, KHÔNG abort
    var _origOpen = XMLHttpRequest.prototype.open;
    var _origSend = XMLHttpRequest.prototype.send;
    var _blockedXHR = new WeakSet();
    
    XMLHttpRequest.prototype.open = function(method, url) {
        if (isRemote(url)) {
            console.log('[LOCAL-ONLY] 🚫 XHR:', String(url).substring(0, 80));
            _blockedXHR.add(this);
        }
        return _origOpen.apply(this, arguments);
    };
    
    XMLHttpRequest.prototype.send = function() {
        if (_blockedXHR.has(this)) {
            var self = this;
            setTimeout(function() {
                try {
                    Object.defineProperty(self, 'readyState', { value: 4, configurable: true });
                    Object.defineProperty(self, 'status', { value: 200, configurable: true });
                    Object.defineProperty(self, 'responseText', { value: '{"RESULT":"OK"}', configurable: true });
                    Object.defineProperty(self, 'response', { value: '{"RESULT":"OK"}', configurable: true });
                    if (typeof self.onreadystatechange === 'function') self.onreadystatechange();
                    if (typeof self.onload === 'function') self.onload();
                } catch(e) {}
            }, 30);
            return;
        }
        return _origSend.apply(this, arguments);
    };

    // 3. Chặn script tag load từ remote
    var _origCreateElement = document.createElement;
    document.createElement = function(tag) {
        var el = _origCreateElement.apply(this, arguments);
        if (tag.toLowerCase() === 'script') {
            var _origSetAttr = el.setAttribute;
            el.setAttribute = function(name, value) {
                if (name === 'src' && isRemote(value)) {
                    var urlStr = String(value);
                    console.log('[LOCAL-ONLY] 🔄 Redirect:', urlStr.substring(0, 100));
                    
                    try {
                        var localSrc = '';
                        
                        // 1. GTD.min → local min folder
                        if (urlStr.indexOf('GTD.min') >= 0) {
                            localSrc = 'min/GTD.min_20260702_0950.js';
                        }
                        // 2. aes.js
                        else if (urlStr.indexOf('/CRYPTO/aes.js') >= 0 || urlStr.indexOf('CRYPTO/aes') >= 0) {
                            localSrc = 'javascript/aes.js';
                        }
                        // 3. path_data → javascript/path_data/
                        else if (urlStr.indexOf('path_data/') >= 0) {
                            // Lấy tên file cuối: path_map2, path_map101, ...
                            var fname = urlStr.substring(urlStr.lastIndexOf('/') + 1);
                            // Bỏ extension nếu có .js
                            if (fname.indexOf('.js') < 0) fname += '.js';
                            localSrc = 'javascript/path_data/' + fname;
                        }
                        // 4. Các file JS khác trong TOT/javascript/
                        else if (urlStr.indexOf('TOT/javascript/') >= 0) {
                            var fname2 = urlStr.substring(urlStr.lastIndexOf('TOT/javascript/') + 'TOT/javascript/'.length);
                            localSrc = 'javascript/' + fname2;
                        }
                        // 5. Đường dẫn khác
                        else {
                            localSrc = urlStr.substring(urlStr.lastIndexOf('/') + 1);
                        }
                        
                        console.log('[LOCAL-ONLY] → Local:', localSrc);
                        return _origSetAttr.call(this, name, localSrc);
                    } catch(e) {
                        console.error('[LOCAL-ONLY] ❌', e.message);
                        return;
                    }
                }
                return _origSetAttr.apply(this, arguments);
            };
        }
        return el;
    };

    // 4. KHÔNG chặn img — ảnh game dùng local
    // 5. KHÔNG chặn alert hay S_ERROR_POPUP — để biết lỗi thật

    console.log('[LOCAL-ONLY] ✅ Đã cài đặt');
})();
