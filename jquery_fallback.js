console.log('Loading jQuery fallback...');
window.jQuery = window.$ = function(selector) {
    if (typeof selector === 'function') {
        if (document.readyState === 'complete') return selector();
        return document.addEventListener('DOMContentLoaded', selector);
    }
    var elements = [];
    if (typeof selector === 'string') elements = document.querySelectorAll(selector);
    else if (selector instanceof Element) elements = [selector];
    else if (selector && selector.nodeType) elements = [selector];
    var obj = {
        length: elements.length, 0: elements[0],
        each: function(fn) { for (var i = 0; i < elements.length; i++) fn.call(elements[i], i, elements[i]); return obj; },
        css: function(k, v) { for (var i = 0; i < elements.length; i++) { if (typeof k === 'object') { for (var key in k) elements[i].style[key] = k[key]; } else elements[i].style[k] = v; } return obj; },
        attr: function(k, v) { for (var i = 0; i < elements.length; i++) elements[i].setAttribute(k, v); return obj; },
        append: function(c) { for (var i = 0; i < elements.length; i++) { if (typeof c === 'string') elements[i].insertAdjacentHTML('beforeend', c); else if (c.nodeType) elements[i].appendChild(c); } return obj; },
        html: function(v) { if (v !== undefined) { for (var i = 0; i < elements.length; i++) elements[i].innerHTML = v; return obj; } return elements[0] ? elements[0].innerHTML : ''; },
        text: function(v) { if (v !== undefined) { for (var i = 0; i < elements.length; i++) elements[i].textContent = v; return obj; } return elements[0] ? elements[0].textContent : ''; },
        val: function(v) { if (v !== undefined) { for (var i = 0; i < elements.length; i++) elements[i].value = v; return obj; } return elements[0] ? elements[0].value : ''; },
        on: function(e, fn) { for (var i = 0; i < elements.length; i++) elements[i].addEventListener(e, fn); return obj; },
        off: function() { return obj; },
        click: function(fn) { if (fn) return obj.on('click', fn); for (var i = 0; i < elements.length; i++) elements[i].click(); return obj; },
        addClass: function(c) { for (var i = 0; i < elements.length; i++) elements[i].classList.add(c); return obj; },
        removeClass: function(c) { for (var i = 0; i < elements.length; i++) elements[i].classList.remove(c); return obj; },
        hide: function() { for (var i = 0; i < elements.length; i++) elements[i].style.display = 'none'; return obj; },
        show: function() { for (var i = 0; i < elements.length; i++) elements[i].style.display = ''; return obj; },
        width: function() { return elements[0] ? elements[0].offsetWidth : 0; },
        height: function() { return elements[0] ? elements[0].offsetHeight : 0; },
        remove: function() { for (var i = 0; i < elements.length; i++) if (elements[i].parentNode) elements[i].parentNode.removeChild(elements[i]); return obj; },
        empty: function() { for (var i = 0; i < elements.length; i++) elements[i].innerHTML = ''; return obj; },
        find: function(s) { var f = []; for (var i = 0; i < elements.length; i++) { var els = elements[i].querySelectorAll(s); for (var j = 0; j < els.length; j++) f.push(els[j]); } return window.$(f); },
        eq: function(i) { return window.$(elements[i]); },
        children: function() { var f = []; for (var i = 0; i < elements.length; i++) { var ch = elements[i].children; for (var j = 0; j < ch.length; j++) f.push(ch[j]); } return window.$(f); },
        parent: function() { var f = []; for (var i = 0; i < elements.length; i++) if (elements[i].parentNode) f.push(elements[i].parentNode); return window.$(f); },
        data: function(k, v) { if (v !== undefined) { for (var i = 0; i < elements.length; i++) elements[i].setAttribute('data-' + k, v); return obj; } return elements[0] ? elements[0].getAttribute('data-' + k) : undefined; }
    };
    return obj;
};

jQuery.fn = jQuery.prototype = { jquery: '3.4.1-fallback' };

// Promise-like helper
function makePromiseLike(result) {
    if (!result || typeof result !== 'object') result = {};
    if (typeof result.fail !== 'function') result.fail = function(cb) { return this; };
    if (typeof result.done !== 'function') result.done = function(cb) { if (cb) cb({}); return this; };
    if (typeof result.always !== 'function') result.always = function(cb) { if (cb) cb(); return this; };
    if (typeof result.then !== 'function') result.then = function(cb) { if (cb) cb({}); return this; };
    if (typeof result.catch !== 'function') result.catch = function() { return this; };
    if (typeof result.success !== 'function') result.success = function(cb) { if (cb) cb({}); return this; };
    if (typeof result.error !== 'function') result.error = function(cb) { return this; };
    if (typeof result.complete !== 'function') result.complete = function(cb) { if (cb) cb(); return this; };
    return result;
}

jQuery.ajax = function() { return makePromiseLike({}); };
jQuery.get = function() { return makePromiseLike({}); };
jQuery.post = function() { return makePromiseLike({}); };
jQuery.getJSON = function() { return makePromiseLike({}); };
jQuery.ajaxSetup = function() { return jQuery; };
jQuery.ajaxPrefilter = function() { return jQuery; };
jQuery.ajaxTransport = function() { return jQuery; };
jQuery.param = function(obj) { var p = []; for (var k in obj) if (obj.hasOwnProperty(k)) p.push(encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])); return p.join('&'); };
jQuery.each = function(arr, fn) { if (arr && arr.length !== undefined) for (var i = 0; i < arr.length; i++) fn.call(arr[i], i, arr[i]); return arr; };
jQuery.extend = function() { var args = Array.prototype.slice.call(arguments); var target = args[0] || {}; for (var i = 1; i < args.length; i++) { var src = args[i]; if (src) for (var k in src) if (src.hasOwnProperty(k)) target[k] = src[k]; } return target; };
jQuery.trim = function(s) { return String(s || '').trim(); };
jQuery.isArray = Array.isArray;
jQuery.isFunction = function(f) { return typeof f === 'function'; };
jQuery.isNumeric = function(n) { return !isNaN(parseFloat(n)) && isFinite(n); };
jQuery.inArray = function(v, arr) { if (!arr) return -1; for (var i = 0; i < arr.length; i++) if (arr[i] === v) return i; return -1; };
jQuery.parseJSON = function(s) { try { return JSON.parse(s); } catch(e) { return null; } };
jQuery.noop = function() {};
jQuery.when = function() { var args = arguments; return makePromiseLike({}); };
jQuery.Deferred = function() { var def = makePromiseLike({}); def.resolve = function() { return def; }; def.reject = function() { return def; }; def.promise = function() { return def; }; return def; };

console.log('✅ jQuery fallback created với .fail/.done/.always');
