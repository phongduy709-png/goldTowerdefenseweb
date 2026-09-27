// bridge_auto.js - Chỉ load data 1 lần khi game khởi động
(function() {
    console.log('[BRIDGE-AUTO] Loading...');
    
    var loaded = false;
    var retryCount = 0;
    
    function loadBridge() {
        if (loaded) return;
        
        retryCount++;
        if (retryCount > 30) {
            console.log('[BRIDGE-AUTO] ❌ Timeout sau 30 lần thử');
            return;
        }
        
        fetch('/bridge_decrypted.json?t=' + Date.now())
            .then(function(r) {
                if (!r.ok) throw new Error('HTTP ' + r.status);
                return r.text();
            })
            .then(function(text) {
                if (!text || text.length < 100) {
                    if (retryCount % 5 === 0) console.log('[BRIDGE-AUTO] Chờ data... (' + retryCount + ')');
                    setTimeout(loadBridge, 1000);
                    return;
                }
                
                console.log('[BRIDGE-AUTO] ✅ Nhận data:', text.length, 'bytes');
                
                try {
                    var json = JSON.parse(text);
                    console.log('[BRIDGE-AUTO] VALUE keys:', Object.keys(json.VALUE));
                    
                    if (typeof STORAGE !== 'undefined' && STORAGE.decode_data_all) {
                        STORAGE.decode_data_all(json.VALUE);
                        loaded = true;
                        
                        console.log('[BRIDGE-AUTO] ✅ Data loaded!');
                        console.log('[BRIDGE-AUTO] USER.ruby:', USER.ruby);
                        console.log('[BRIDGE-AUTO] USER.gold:', USER.gold);
                        console.log('[BRIDGE-AUTO] USER.tower_bou:', USER.tower_bou);
                        
                        // Force chuyển scene
                        setTimeout(function() {
                            if (glo.scene.cur === 'S_LOGO' || glo.scene.cur === null) {
                                forceScene();
                            }
                        }, 1500);
                    }
                } catch(e) {
                    console.log('[BRIDGE-AUTO] Parse error:', e.message);
                    setTimeout(loadBridge, 1000);
                }
            })
            .catch(function(e) {
                if (retryCount % 5 === 0) console.log('[BRIDGE-AUTO] Lỗi:', e.message);
                setTimeout(loadBridge, 1000);
            });
    }
    
    function forceScene() {
        console.log('[BRIDGE-AUTO] Force chuyển scene...');
        setTimeout(function(){
            try { if (typeof S_GONGJI !== 'undefined') { S_GONGJI.init && S_GONGJI.init(); S_GONGJI.make_screen && S_GONGJI.make_screen(); glo.scene.cur = S_GONGJI; console.log('[BRIDGE-AUTO] → S_GONGJI'); } } catch(e) {}
            setTimeout(function(){
                try { if (typeof S_ATTENDANCE !== 'undefined') { S_ATTENDANCE.init && S_ATTENDANCE.init(); S_ATTENDANCE.make_screen && S_ATTENDANCE.make_screen(); glo.scene.cur = S_ATTENDANCE; console.log('[BRIDGE-AUTO] → S_ATTENDANCE'); } } catch(e) {}
                setTimeout(function(){
                    try { if (typeof S_MAINMENU !== 'undefined') { S_MAINMENU.init && S_MAINMENU.init(); S_MAINMENU.make_screen && S_MAINMENU.make_screen(); S_MAINMENU.make_screen_top && S_MAINMENU.make_screen_top(); glo.scene.cur = S_MAINMENU; console.log('[BRIDGE-AUTO] → S_MAINMENU'); console.log('[BRIDGE-AUTO] 🎮 Main Menu!'); } } catch(e) {}
                }, 1500);
            }, 1500);
        }, 500);
    }
    
    // Đợi game load xong rồi mới bắt đầu
    var startCheck = setInterval(function() {
        if (typeof STORAGE === 'undefined') return;
        if (typeof STORAGE.decode_data_all !== 'function') return;
        clearInterval(startCheck);
        
        console.log('[BRIDGE-AUTO] Game ready, load data...');
        loadBridge();
    }, 500);
    
    console.log('[BRIDGE-AUTO] Patch loaded');
})();
