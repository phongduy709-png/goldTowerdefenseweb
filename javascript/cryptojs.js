// cryptojs.js - CryptoJS base (aes.js sẽ override phần lớn)
console.log('✅ cryptojs.js loaded');

if (typeof window.CryptoJS === 'undefined') {
    // Base với extend đúng chuẩn CryptoJS
    var Base = {
        extend: function(overrides) {
            var subtype = Object.create(this);
            if (overrides) {
                for (var key in overrides) {
                    if (Object.prototype.hasOwnProperty.call(overrides, key)) {
                        subtype[key] = overrides[key];
                    }
                }
            }
            subtype.extend = this.extend;
            return subtype;
        },
        create: function() {
            var instance = Object.create(this);
            if (instance.init) instance.init.apply(instance, arguments);
            return instance;
        },
        init: function() {},
        mixIn: function(properties) {
            for (var key in properties) {
                if (Object.prototype.hasOwnProperty.call(properties, key)) {
                    this[key] = properties[key];
                }
            }
            return this;
        },
        clone: function() {
            var clone = Object.create(this);
            for (var key in this) {
                if (Object.prototype.hasOwnProperty.call(this, key)) {
                    clone[key] = this[key];
                }
            }
            return clone;
        }
    };
    
    window.CryptoJS = {
        lib: {
            Base: Base
        },
        enc: {
            Utf8: {
                parse: function(str) { return { words: [], sigBytes: (str || '').length }; },
                stringify: function() { return ''; }
            },
            Latin1: {
                parse: function(str) { return { words: [], sigBytes: (str || '').length }; },
                stringify: function() { return ''; }
            },
            Hex: {
                parse: function(str) { return { words: [], sigBytes: ((str || '').length / 2) }; },
                stringify: function() { return ''; }
            },
            Base64: {
                parse: function(str) { return { words: [], sigBytes: (str || '').length }; },
                stringify: function() { return ''; }
            }
        },
        mode: { CBC: {}, ECB: {}, CFB: {}, OFB: {}, CTR: {} },
        pad: { Pkcs7: {}, AnsiX923: {}, Iso10126: {}, Iso97971: {}, ZeroPadding: {}, NoPadding: {} },
        algo: {},
        AES: {
            encrypt: function(m, k, o) { return { toString: function() { return ''; } }; },
            decrypt: function(m, k, o) { return { toString: function() { return ''; } }; }
        },
        MD5: function() { return { toString: function() { return ''; } }; },
        SHA1: function() { return { toString: function() { return ''; } }; },
        SHA256: function() { return { toString: function() { return ''; } }; },
        HmacMD5: function() { return { toString: function() { return ''; } }; },
        HmacSHA1: function() { return { toString: function() { return ''; } }; },
        HmacSHA256: function() { return { toString: function() { return ''; } }; }
    };
    
    console.log('✅ [CryptoJS] Base created (aes.js sẽ bổ sung)');
}
