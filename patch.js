console.log('patch.js loaded');

// Patch defaultView
(function() {
    try { Object.defineProperty(window.document, 'defaultView', { get: function() { return window; }, configurable: true }); } catch(e) {}
    try { Object.defineProperty(Document.prototype, 'defaultView', { get: function() { return window; }, configurable: true }); } catch(e) {}
    console.log('defaultView patched');
})();

// KHÔNG override PHP - để game gọi server qua URL_prefix
console.log('patch.js done - PHP giữ nguyên theo file min');
