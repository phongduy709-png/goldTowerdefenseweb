// ==================== ALLOW GUILD URL ====================
// Cho phép URL chứa GUILD đi qua, không bị chặn bởi LOCAL-ONLY
// + Proxy qua server2.js (tránh CORS)
// =========================================================
(function() {
    console.log('[ALLOW-GUILD] 🚀 Khởi động');

    // Danh sách pattern URL được PHÉP đi qua
    var ALLOWED_PATTERNS = [
        '/GUILD/',
        'guild_',
        '_guild',
        'check_guild',
        'update_guild',
        'get_guild',
        'put_guild'
    ];

    function isGuildUrl(url) {
        var s = String(url);
        for (var i = 0; i < ALLOWED_PATTERNS.length; i++) {
            if (s.indexOf(ALLOWED_PATTERNS[i]) >= 0) return true;
        }
        return false;
    }

    // Wrap fetch
    var _origFetch = window.fetch;
    window.fetch = function(url, opts) {
        var urlStr = String(url);
        
        if (isGuildUrl(urlStr)) {
            console.log('[ALLOW-GUILD] 🔓 Cho phép guild URL:', urlStr.substring(0, 150));
            
            // Rewrite URL → proxy qua server2.js
            // http://211.253.26.47:8093/TOWERDEFENCE_COMMON/GUILD/xxx.php
            // → http://127.0.0.1:8080/proxy-guild/TOWERDEFENCE_COMMON/GUILD/xxx.php
            
            var proxyUrl = urlStr
                .replace(/^https?:\/\/[^\/]+/, '')  // Bỏ host
                .replace(/^\/+/, '/');                // Chuẩn hoá
            
            var fullProxyUrl = '/proxy-guild' + proxyUrl;
            console.log('[ALLOW-GUILD] → Proxy:', fullProxyUrl.substring(0, 150));
            
            return _origFetch.call(this, fullProxyUrl, opts);
        }
        
        return _origFetch.apply(this, arguments);
    };

    // Wrap XMLHttpRequest
    var _origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
        var urlStr = String(url);
        
        if (isGuildUrl(urlStr)) {
            console.log('[ALLOW-GUILD] 🔓 XHR guild:', urlStr.substring(0, 150));
            
            var proxyUrl = urlStr
                .replace(/^https?:\/\/[^\/]+/, '')
                .replace(/^\/+/, '/');
            
            var fullProxyUrl = '/proxy-guild' + proxyUrl;
            console.log('[ALLOW-GUILD] → Proxy XHR:', fullProxyUrl.substring(0, 150));
            
            return _origOpen.call(this, method, fullProxyUrl);
        }
        
        return _origOpen.apply(this, arguments);
    };

    console.log('[ALLOW-GUILD] ✅ Đã wrap fetch + XHR');
})();
