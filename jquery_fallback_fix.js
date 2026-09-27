// BỔ SUNG .fail(), .done(), .always() cho jQuery fallback
(function() {
    console.log('=== jQuery fallback fix loading ===');
    
    // Đợi jQuery load
    var check = setInterval(function() {
        if (window.jQuery && window.jQuery.ajax && !window.jQuery.__fixedFail) {
            clearInterval(check);
            window.jQuery.__fixedFail = true;
            
            // Patch $.post, $.get, $.ajax để trả về promise có .fail()
            var patchAjax = function(fnName) {
                var orig = window.jQuery[fnName];
                window.jQuery[fnName] = function() {
                    var result;
                    try {
                        result = orig.apply(this, arguments);
                    } catch(e) {
                        result = null;
                    }
                    
                    // Đảm bảo result có .fail(), .done(), .always()
                    if (result && typeof result.then === 'function') {
                        if (!result.fail) {
                            result.fail = function(cb) {
                                return this.catch ? this.catch(cb) : this;
                            };
                        }
                        if (!result.done) {
                            result.done = function(cb) {
                                return this.then ? this.then(cb) : this;
                            };
                        }
                        if (!result.always) {
                            result.always = function(cb) {
                                if (cb) cb();
                                return this;
                            };
                        }
                    } else {
                        // Trả về promise giả
                        result = {
                            done: function(cb) { if (cb) cb({}); return this; },
                            fail: function(cb) { return this; },
                            always: function(cb) { if (cb) cb(); return this; },
                            then: function(cb) { if (cb) cb({}); return this; },
                            catch: function() { return this; }
                        };
                    }
                    return result;
                };
            };
            
            patchAjax('ajax');
            patchAjax('post');
            patchAjax('get');
            patchAjax('getJSON');
            
            console.log('✅ jQuery .fail/.done/.always patched');
        }
    }, 50);
    
    setTimeout(function() { clearInterval(check); }, 5000);
})();
