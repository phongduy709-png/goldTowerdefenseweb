// fix_gloplatform.js - Chạy TRƯỚC define.js để chặn gloplatform = null
(function() {
    console.log('🔧 [Fix] Loading gloplatform protection...');
    
    var gloplatformObj = {
        version: '2.0.0',
        server_url: 'http://localhost:8080',
        api_url: 'http://localhost:8080/api',
        user: {
            id: 'user_001',
            username: 'GoldMaster',
            gold: 999999,
            ruby: 9999,
            level: 99
        },
        isConnected: function() { return true; },
        ping: function() { return Promise.resolve({ status: 'success' }); },
        request: function(url, data) {
            console.log('[gloplatform] request:', url);
            return Promise.resolve({ status: 'success', result: '0', data: {} });
        },
        send: function() { return Promise.resolve({ status: 'success', result: '0' }); },
        get: function() { return Promise.resolve({ status: 'success', result: '0' }); },
        post: function() { return Promise.resolve({ status: 'success', result: '0' }); },
        init: function() { return true; },
        start: function() { return true; },
        stop: function() { return true; }
    };
    
    window.__glopValue = gloplatformObj;
    
    try {
        Object.defineProperty(window, 'gloplatform', {
            get: function() { 
                if (!window.__glopValue || window.__glopValue === null) {
                    window.__glopValue = gloplatformObj;
                }
                return window.__glopValue;
            },
            set: function(v) { 
                if (v === null || v === undefined) {
                    console.log('🔒 [Fix] Blocked gloplatform = null');
                    return;
                }
                window.__glopValue = v;
            },
            configurable: false,
            enumerable: true
        });
        console.log('🔒 [Fix] gloplatform protected');
    } catch(e) {
        console.log('⚠️ [Fix] Cannot use defineProperty:', e.message);
        window.gloplatform = gloplatformObj;
    }
})();
