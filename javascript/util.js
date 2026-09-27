// util.js - Object util cho game (LOCKED)
console.log('✅ util.js loaded');

// Tạo object util
var _utilValue = {
    get_entry2: {},
    get_encrypt2: function(message) { 
        console.log('[util.get_encrypt2] called');
        return String(message); 
    },
    get_decrypt2: function(message) { 
        console.log('[util.get_decrypt2] called');
        return String(message); 
    }
};

// KHÓA KHÔNG CHO GHI ĐÈ THÀNH NULL
try {
    Object.defineProperty(window, 'util', {
        get: function() {
            if (_utilValue === null || _utilValue === undefined) {
                console.log('[Locked] util was null, restoring...');
                _utilValue = {
                    get_entry2: {},
                    get_encrypt2: function(m) { return String(m); },
                    get_decrypt2: function(m) { return String(m); }
                };
            }
            return _utilValue;
        },
        set: function(v) {
            if (v === null || v === undefined) {
                console.log('[Locked] Prevented util = null');
                return;
            }
            _utilValue = v;
        },
        configurable: false,
        enumerable: true
    });
    console.log('🔒 Locked: util');
} catch(e) {
    window.util = _utilValue;
    console.log('✅ Created: util');
}

console.log('✅ util object initialized');
