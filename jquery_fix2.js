// BỔ SUNG $.ajaxSetup + các hàm jQuery khác
(function() {
    console.log('=== jQuery fix2 loading ===');
    
    var check = setInterval(function() {
        if (window.jQuery && !window.jQuery.__fixedAjaxSetup) {
            clearInterval(check);
            window.jQuery.__fixedAjaxSetup = true;
            
            // $.ajaxSetup
            window.jQuery.ajaxSetup = function(options) {
                console.log('[jQuery] ajaxSetup called:', JSON.stringify(options).substring(0, 200));
                return window.jQuery;
            };
            
            // $.ajaxPrefilter, $.ajaxTransport (một số game dùng)
            window.jQuery.ajaxPrefilter = function() { return window.jQuery; };
            window.jQuery.ajaxTransport = function() { return window.jQuery; };
            
            // $.param
            window.jQuery.param = function(obj) {
                var parts = [];
                for (var k in obj) {
                    if (obj.hasOwnProperty(k)) {
                        parts.push(encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]));
                    }
                }
                return parts.join('&');
            };
            
            // $.getScript
            window.jQuery.getScript = function(url, callback) {
                var script = document.createElement('script');
                script.src = url;
                script.onload = callback;
                document.head.appendChild(script);
                return { done: function(cb) { if (cb) cb(); return this; }, fail: function() { return this; } };
            };
            
            // $.when (đợi nhiều promise)
            window.jQuery.when = function() {
                var args = arguments;
                return {
                    done: function(cb) { if (cb) cb.apply(null, args); return this; },
                    fail: function() { return this; },
                    always: function(cb) { if (cb) cb(); return this; },
                    then: function(cb) { if (cb) cb.apply(null, args); return this; }
                };
            };
            
            // $.Deferred (tạo promise)
            window.jQuery.Deferred = function() {
                var callbacks = [];
                var def = {
                    resolve: function() { 
                        callbacks.forEach(function(cb) { if (cb) cb(); }); 
                        return def; 
                    },
                    reject: function() { return def; },
                    promise: function() { return def; },
                    done: function(cb) { callbacks.push(cb); return def; },
                    fail: function() { return def; },
                    always: function(cb) { if (cb) cb(); return def; },
                    then: function(cb) { callbacks.push(cb); return def; }
                };
                return def;
            };
            
            // $.Callbacks
            window.jQuery.Callbacks = function() {
                var cbs = [];
                return {
                    add: function(cb) { cbs.push(cb); return this; },
                    fire: function() { cbs.forEach(function(cb) { if (cb) cb.apply(null, arguments); }); return this; },
                    remove: function() { return this; },
                    empty: function() { cbs = []; return this; },
                    disable: function() { return this; },
                    disabled: function() { return false; },
                    lock: function() { return this; },
                    locked: function() { return false; },
                    fired: function() { return false; },
                    has: function() { return cbs.length > 0; }
                };
            };
            
            console.log('✅ $.ajaxSetup + các hàm jQuery khác đã patch');
        }
    }, 50);
    
    setTimeout(function() { clearInterval(check); }, 5000);
})();
