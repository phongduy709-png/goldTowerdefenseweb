// ==================== CHẶN PVP ====================
// PvP cần WebSocket server thật → không chạy offline được
// → Chặn vào PvP, hiện thông báo "Không khả dụng offline"
// =========================================================
(function() {
    console.log('[BLOCK-PVP] 🚀 Khởi động');

    // Chặn WebSocket đến server thật
    var _origWS = window.WebSocket;
    window.WebSocket = function(url, protocols) {
        var urlStr = String(url);
        if (urlStr.indexOf('211.253.26.47') >= 0 ||
            urlStr.indexOf('busidol') >= 0 ||
            urlStr.indexOf('pvp') >= 0 ||
            urlStr.indexOf('TOWERDEFENCE') >= 0) {
            console.log('[BLOCK-PVP] 🚫 Chặn WebSocket:', urlStr.substring(0, 80));
            // Tạo WebSocket giả
            return {
                readyState: 3,
                url: urlStr,
                send: function() {},
                close: function() {},
                addEventListener: function() {},
                removeEventListener: function() {},
                onopen: null,
                onmessage: null,
                onerror: null,
                onclose: null
            };
        }
        return new _origWS(url, protocols);
    };
    window.WebSocket.CONNECTING = 0;
    window.WebSocket.OPEN = 1;
    window.WebSocket.CLOSING = 2;
    window.WebSocket.CLOSED = 3;
    window.WebSocket.prototype = _origWS.prototype;

    // Chặn click PvP → hiện thông báo
    document.addEventListener('mousedown', function(e) {
        try {
            var target = e.target;
            if (!target) return;
            var tid = target.id || '';
            var pid = (target.parentElement && target.parentElement.id) || '';
            
            // Nút PvP là menu3
            var isPvP = tid === 'MM_menu3_icon' ||
                        tid === 'MM_menu3_txt' ||
                        pid === 'MM_menu3_icon';
            
            if (!isPvp) return;
            
            console.log('[BLOCK-PVP] 🎯 Bấm PvP → thông báo');
            
            // Hiện thông báo
            var msg = document.createElement('div');
            msg.style.cssText = 
                'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);' +
                'background:rgba(0,0,0,0.95);color:#fff;padding:30px 40px;' +
                'border:3px solid #ff5252;border-radius:15px;z-index:99999999;' +
                'font-family:Arial,sans-serif;text-align:center;font-size:16px;' +
                'box-shadow:0 10px 40px rgba(0,0,0,0.8);';
            msg.innerHTML = 
                '<div style="font-size:40px;margin-bottom:15px;">🚫</div>' +
                '<div style="font-weight:bold;color:#ff5252;font-size:20px;">PVP KHÔNG KHẢ DỤNG</div>' +
                '<div style="margin-top:10px;color:#aaa;">Tính năng PvP cần kết nối server</div>' +
                '<div style="margin-top:5px;color:#aaa;font-size:13px;">(Chế độ offline không hỗ trợ)</div>' +
                '<button style="margin-top:20px;padding:12px 30px;background:#4CAF50;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:bold;cursor:pointer;" onclick="this.parentElement.remove()">ĐÃ HIỂU</button>';
            document.body.appendChild(msg);
            
            e.preventDefault();
            e.stopPropagation();
        } catch(err) {}
    }, true);

    console.log('[BLOCK-PVP] ✅ Đã cài đặt');
})();
