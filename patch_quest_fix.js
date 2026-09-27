// ==================== FIX QUEST/MISSION V5 ====================
// Đơn giản: chỉ hook click menu8, luôn chuyển scene
// =========================================================
(function() {
    console.log('[QUEST-FIX] 🚀 v5');

    var lastClick = 0;

    document.addEventListener('mousedown', function(e) {
        try {
            var target = e.target;
            if (!target) return;
            
            var tid = target.id || '';
            var pid = (target.parentElement && target.parentElement.id) || '';
            
            var isQuestBtn = tid === 'MM_menu8_icon' ||
                             tid === 'MM_menu8_txt' ||
                             pid === 'MM_menu8_icon';
            
            if (!isQuestBtn) return;
            
            var now = Date.now();
            if (now - lastClick < 500) return;
            lastClick = now;
            
            console.log('[QUEST-FIX] 🎯 Click Nhiệm vụ');
            
            setTimeout(function() {
                try {
                    if (typeof S_QUEST !== 'undefined' && typeof ChangeScene !== 'undefined') {
                        if (typeof S_QUEST.init === 'function') S_QUEST.init();
                        var cur = ChangeScene.after_s || 'S_MAINMENU';
                        ChangeScene.start(cur, 'S_QUEST', S_QUEST, ChangeScene.TYPE_NORMAL || 1);
                        console.log('[QUEST-FIX] ✅ Chuyển S_QUEST từ', cur);
                    }
                } catch(err) {
                    console.error('[QUEST-FIX] ❌', err.message);
                }
            }, 50);
            
        } catch(err) {}
    }, true);

    console.log('[QUEST-FIX] ✅ v5');
})();
