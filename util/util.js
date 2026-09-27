// util.js - Utility functions
console.log('✅ util.js loaded');

// ============ LOGGING ============
function put_error_log(msg) {
    console.log('[Error Log]:', msg);
    if (window.PHP && window.PHP.put_error_log) {
        window.PHP.put_error_log(msg);
    }
}

function put_debug_log(msg) {
    if (window.CDN && window.CDN.debug) {
        console.log('[Debug]:', msg);
    }
}

// ============ DOM HELPERS ============
function getElement(id) {
    const el = document.getElementById(id);
    if (!el) {
        console.warn(`Element not found: #${id}`);
    }
    return el;
}

function getElementStyle(id) {
    const el = getElement(id);
    return el ? el.style : null;
}

function setElementStyle(id, styles) {
    const style = getElementStyle(id);
    if (style) {
        Object.assign(style, styles);
    }
}

// ============ STRING HELPERS ============
function formatNumber(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// ============ STORAGE HELPERS ============
function saveData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Save error:', e);
        return false;
    }
}

function loadData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Load error:', e);
        return null;
    }
}

// ============ NETWORK HELPERS ============
function fetchAPI(endpoint, options = {}) {
    const baseUrl = window.CDN ? window.CDN.api_url : 'http://localhost:8080/api';
    const url = endpoint.startsWith('http') ? endpoint : baseUrl + endpoint;
    
    return fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        }
    }).then(res => res.json());
}

// ============ EXPORT ============
window.Utils = window.Utils || {};
window.Utils = {
    put_error_log: put_error_log,
    put_debug_log: put_debug_log,
    getElement: getElement,
    getElementStyle: getElementStyle,
    setElementStyle: setElementStyle,
    formatNumber: formatNumber,
    getQueryParam: getQueryParam,
    saveData: saveData,
    loadData: loadData,
    fetchAPI: fetchAPI
};

console.log('✅ util.js initialized');
