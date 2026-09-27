// util_Global.js - Định nghĩa glo object
console.log('✅ util_Global.js loaded');

var gloObj = {
    platform: 'AMO',
    PLATFORM: {
        ATV: 'ATV',
        AMO: 'AMO',
        SKB: 'SKB',
        KT: 'KT'
    },
    app_release: 'RELEASE',
    app_name: 'TOWER_DEFENCE_AMO',
    version: 'TD_AMO_20240621',
    URL_prefix: 'http://localhost:8080/TOWERDEFENCE_AMO/',
    
    scene: {
        cur: { name: 'main', id: 0 },
        next: null,
        prev: null
    },
    
    S: {
        SELECTSTAGE: { name: 'SELECTSTAGE', id: 1 },
        MAINMENU: { name: 'MAINMENU', id: 0 },
        GAME: { name: 'GAME', id: 2 },
        LOADING: { name: 'LOADING', id: 3 },
        TITLE: { name: 'TITLE', id: 4 }
    },
    
    mouse: { use: 1, x: 0, y: 0, down: false },
    is_numkey: true,
    
    user: {
        id: 'user_001',
        username: 'GoldMaster',
        gold: 999999,
        ruby: 9999,
        level: 99
    },
    
    URLs: {
        server: 'http://localhost:8080',
        api: 'http://localhost:8080/api',
        cdn: 'http://localhost:8080'
    },
    
    isReady: function() { return true; },
    init: function() { return true; },
    start: function() { return true; },
    update: function() { return true; },
    render: function() { return true; },
    
    gloplatform: null
};

window.__gloValue = gloObj;
try {
    Object.defineProperty(window, 'glo', {
        get: function() { 
            if (!window.__gloValue || window.__gloValue === null) {
                window.__gloValue = gloObj;
            }
            return window.__gloValue; 
        },
        set: function(v) { 
            if (v === null || v === undefined) {
                console.log('[Locked] Prevented glo = null');
                return;
            }
            window.__gloValue = v; 
        },
        configurable: false,
        enumerable: true
    });
    console.log('🔒 Locked: glo');
} catch(e) {
    window.glo = gloObj;
    console.log('✅ Created: glo');
}

// Gán gloplatform vào glo
if (window.gloplatform) {
    gloObj.gloplatform = window.gloplatform;
}

console.log('✅ util_Global.js initialized');
