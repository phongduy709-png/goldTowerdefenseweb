// gmail_panel.js - Form đăng nhập → gửi request đến Termux
(function() {
    console.log('[GMAIL-PANEL] Loading...');
    
    var isLoaded = false;
    
    function showForm() {
        if (document.getElementById('gmail-panel-overlay')) return;
        
        var overlay = document.createElement('div');
        overlay.id = 'gmail-panel-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);z-index:99999999;display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif;';
        overlay.innerHTML = '<div style="background:#1a1a2e;padding:30px;border-radius:15px;box-shadow:0 10px 40px rgba(0,0,0,0.8);max-width:400px;width:90%;border:2px solid #4CAF50;">'
            + '<h2 style="color:#4CAF50;margin:0 0 20px 0;text-align:center;font-size:22px;">🎮 GOLD TOWER DEFENCE</h2>'
            + '<p style="color:#fff;font-size:14px;margin-bottom:20px;text-align:center;">Nhập thông tin để vào game</p>'
            + '<label style="color:#aaa;font-size:12px;display:block;margin-bottom:5px;">🆔 UNIQ ID (TDM...)</label>'
            + '<input id="uniqid-input" type="text" placeholder="TDM123456" style="width:100%;padding:12px;font-size:14px;border:1px solid #444;border-radius:8px;background:#0d0d1a;color:#fff;box-sizing:border-box;margin-bottom:15px;outline:none;">'
            + '<label style="color:#aaa;font-size:12px;display:block;margin-bottom:5px;">📧 GMAIL</label>'
            + '<input id="gmail-input" type="email" placeholder="example@gmail.com" style="width:100%;padding:12px;font-size:14px;border:1px solid #444;border-radius:8px;background:#0d0d1a;color:#fff;box-sizing:border-box;margin-bottom:20px;outline:none;">'
            + '<button id="gmail-submit-btn" style="width:100%;padding:14px;font-size:16px;font-weight:bold;background:linear-gradient(45deg,#4CAF50,#8BC34A);color:#fff;border:none;border-radius:8px;cursor:pointer;">🚀 ĐĂNG NHẬP</button>'
            + '<p id="gmail-msg" style="color:#ff9800;font-size:13px;text-align:center;margin-top:15px;min-height:18px;"></p>'
            + '</div>';
        document.body.appendChild(overlay);
        
        var oldEmail = localStorage.getItem("gtd_email");
        var oldUniqId = localStorage.getItem("gtd_uniq_id");
        if (oldEmail) document.getElementById('gmail-input').value = oldEmail;
        if (oldUniqId) document.getElementById('uniqid-input').value = oldUniqId;
        
        function doSubmit() {
            var email = document.getElementById('gmail-input').value.trim();
            var uniqId = document.getElementById('uniqid-input').value.trim();
            var msg = document.getElementById('gmail-msg');
            
            if (!uniqId || uniqId.indexOf('TDM') !== 0) {
                msg.textContent = '❌ Uniq ID phải bắt đầu bằng TDM!';
                msg.style.color = '#f44336';
                return;
            }
            if (!email || email.indexOf('@') < 0) {
                msg.textContent = '❌ Gmail không hợp lệ!';
                msg.style.color = '#f44336';
                return;
            }
            
            msg.textContent = '⏳ Đang gửi request đến Termux...';
            msg.style.color = '#4CAF50';
            
            // Lưu localStorage
            localStorage.setItem("gtd_email", email);
            localStorage.setItem("gtd_host_id", email);
            localStorage.setItem("gtd_uniq_id", uniqId);
            localStorage.setItem("gtd_uid", uniqId);
            localStorage.setItem("host_id", email);
            localStorage.setItem("uniq_id", uniqId);
            localStorage.setItem("TOWER_DEFENCE_AMO.uniq_id", uniqId);
            
            // Gửi request đến Termux bridge
            fetch('/bridge-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ uniq_id: uniqId, host_id: email })
            })
            .then(function(r) {
                if (!r.ok) throw new Error('HTTP ' + r.status);
                return r.json();
            })
            .then(function(json) {
                console.log('[GMAIL-PANEL] ✅ Nhận JSON từ Termux:', Object.keys(json.VALUE));
                msg.textContent = '✅ Nhận data! Đang vào game...';
                
                // Parse vào STORAGE
                if (typeof STORAGE !== 'undefined' && STORAGE.decode_data_all) {
                    STORAGE.decode_data_all(json.VALUE);
                    console.log('[GMAIL-PANEL] USER.ruby:', USER.ruby);
                    console.log('[GMAIL-PANEL] USER.tower_bou:', USER.tower_bou);
                }
                
                // Xóa overlay
                overlay.remove();
                
                // Force chuyển scene
                setTimeout(function() { forceScene(); }, 1000);
            })
            .catch(function(e) {
                console.log('[GMAIL-PANEL] ❌ Lỗi:', e.message);
                msg.textContent = '❌ Lỗi kết nối Termux! Hãy chạy bridge_server.sh';
                msg.style.color = '#f44336';
            });
        }
        
        document.getElementById('gmail-submit-btn').addEventListener('click', doSubmit);
        document.getElementById('uniqid-input').addEventListener('keydown', function(e) {
            if (e.key === 'Enter') document.getElementById('gmail-input').focus();
        });
        document.getElementById('gmail-input').addEventListener('keydown', function(e) {
            if (e.key === 'Enter') doSubmit();
        });
        
        console.log('[GMAIL-PANEL] Form đã hiện');
    }
    
    function forceScene() {
        console.log('[GMAIL-PANEL] Force chuyển scene...');
        setTimeout(function(){
            try { if (typeof S_GONGJI !== 'undefined') { S_GONGJI.init && S_GONGJI.init(); S_GONGJI.make_screen && S_GONGJI.make_screen(); glo.scene.cur = S_GONGJI; console.log('→ S_GONGJI'); } } catch(e) {}
            setTimeout(function(){
                try { if (typeof S_ATTENDANCE !== 'undefined') { S_ATTENDANCE.init && S_ATTENDANCE.init(); S_ATTENDANCE.make_screen && S_ATTENDANCE.make_screen(); glo.scene.cur = S_ATTENDANCE; console.log('→ S_ATTENDANCE'); } } catch(e) {}
                setTimeout(function(){
                    try { if (typeof S_MAINMENU !== 'undefined') { S_MAINMENU.init && S_MAINMENU.init(); S_MAINMENU.make_screen && S_MAINMENU.make_screen(); S_MAINMENU.make_screen_top && S_MAINMENU.make_screen_top(); glo.scene.cur = S_MAINMENU; console.log('→ S_MAINMENU'); console.log('🎮 Main Menu!'); } } catch(e) {}
                }, 1500);
            }, 1500);
        }, 500);
    }
    
    if (document.body) {
        setTimeout(showForm, 100);
    } else {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(showForm, 100); });
    }
})();
