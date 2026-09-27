// ==================== PLAYER MODE (LOCK + HIDE PANELS) ====================
// Nếu URL có "?admin" → Admin mode (bình thường)
// Nếu không → Player mode (lock landscape + ẩn panels)
// =========================================================================
(function() {
    var isAdmin = location.search.indexOf('admin') >= 0;

    // ============================================================
    // ADMIN MODE — Không làm gì
    // ============================================================
    if (isAdmin) {
        console.log('[MODE] 🛠️ Admin mode');
        return;
    }

    console.log('[MODE] 🎮 Player mode — Ẩn panels + Lock landscape');

    // ============================================================
    // 1. ẨN CONSOLE + LOG + CONTROL PANEL
    // ============================================================
    var PANEL_IDS = [
        'error-panel',         // Log panel
        'console-panel',       // Console panel
        'ctrl-panel',          // Control panel
        'ctrl-toggle',         // Nút Control
        'toggle-error-panel',  // Nút Log
        'toggle-console-panel' // Nút Console
    ];

    // Inject CSS ẩn ngay
    var style = document.createElement('style');
    style.id = '__player_mode_css';
    style.textContent = 
        '#error-panel, #console-panel, #ctrl-panel, ' +
        '#ctrl-toggle, #toggle-error-panel, #toggle-console-panel {' +
        '  display: none !important;' +
        '  visibility: hidden !important;' +
        '  pointer-events: none !important;' +
        '}';
    (document.head || document.documentElement).appendChild(style);

    // Hàm ẩn panel
    function hidePanels() {
        PANEL_IDS.forEach(function(id) {
            var el = document.getElementById(id);
            if (el) {
                el.style.display = 'none';
                el.style.visibility = 'hidden';
                el.style.pointerEvents = 'none';
            }
        });
    }

    // Chạy ngay + đợi DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hidePanels);
    } else {
        hidePanels();
    }

    // Backup ẩn định kỳ (nếu panel tự tạo lại)
    setInterval(hidePanels, 1000);

    // Vô hiệu hoá hàm toggle
    window.toggleErrorPanel = function() {};
    window.toggleConsolePanel = function() {};

    // ============================================================
    // 2. CHẶN ZOOM
    // ============================================================
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    });

    document.addEventListener('touchmove', function(e) {
        if (e.touches.length > 1) e.preventDefault();
    }, { passive: false });

    var lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        var now = Date.now();
        if (now - lastTouchEnd <= 300) e.preventDefault();
        lastTouchEnd = now;
    }, false);

    // Meta viewport
    function setViewport() {
        var meta = document.querySelector('meta[name="viewport"]');
        var content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover';
        if (meta) {
            meta.setAttribute('content', content);
        } else {
            var m = document.createElement('meta');
            m.name = 'viewport';
            m.content = content;
            document.head.appendChild(m);
        }
    }
    setViewport();
    setInterval(setViewport, 2000);

    // ============================================================
    // 3. LOCK LANDSCAPE
    // ============================================================
    function lockLandscape() {
        try {
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock('landscape').then(function() {
                    console.log('[LOCK] ✅ Locked landscape');
                }).catch(function(e) {});
            }
        } catch(e) {}
    }
    setTimeout(lockLandscape, 500);
    setTimeout(lockLandscape, 2000);

    // Overlay yêu cầu xoay ngang
    var overlay = null;
    function checkOrientation() {
        var isPortrait = window.innerHeight > window.innerWidth;
        if (isPortrait) {
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = '__rotate_overlay';
                overlay.style.cssText = 
                    'position:fixed;top:0;left:0;right:0;bottom:0;' +
                    'background:#000;color:#fff;z-index:99999999;' +
                    'display:flex;align-items:center;justify-content:center;' +
                    'flex-direction:column;font-family:sans-serif;';
                overlay.innerHTML = 
                    '<div style="font-size:80px;margin-bottom:20px;">📱↻</div>' +
                    '<div style="font-weight:bold;font-size:24px;margin-bottom:10px;">Vui lòng xoay ngang</div>' +
                    '<div style="font-size:16px;opacity:0.7;">Please rotate your device</div>';
                document.body.appendChild(overlay);
            }
            overlay.style.display = 'flex';
        } else {
            if (overlay) overlay.style.display = 'none';
        }
    }
    
    if (document.body) checkOrientation();
    else document.addEventListener('DOMContentLoaded', checkOrientation);

    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', function() {
        setTimeout(checkOrientation, 200);
    });
    setInterval(checkOrientation, 1000);

    // Fullscreen khi tap lần đầu
    var fsRequested = false;
    function requestFS() {
        if (fsRequested) return;
        fsRequested = true;
        try {
            var el = document.documentElement;
            if (el.requestFullscreen) {
                el.requestFullscreen().then(lockLandscape).catch(function() {});
            } else if (el.webkitRequestFullscreen) {
                el.webkitRequestFullscreen();
                lockLandscape();
            }
        } catch(e) {}
    }
    document.addEventListener('touchstart', requestFS, { once: true });
    document.addEventListener('click', requestFS, { once: true });

    console.log('[MODE] ✅ Player mode đã cài đặt');
})();
