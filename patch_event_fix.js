// ==================== FIX EVENT MENU ====================
// - Fix FAKE.eventmoney
// - Override CAL.get_eventmoney  
// - Chặn popup lỗi Event
// - Override PHP.eventmenu_* → chuyển scene trực tiếp
// - Set data default ĐẦY ĐỦ cho các scene Event
// =========================================================
(function() {
    console.log('[EVENT-FIX] 🚀 Khởi động v3');

    window.FAKE = window.FAKE || {};

    // ============================================================
    // 1. Override CAL.get_eventmoney
    // ============================================================
    function overrideCalEventmoney() {
        if (typeof CAL === 'undefined') return false;
        if (CAL.__event_fixed) return true;
        CAL.get_eventmoney = function() {
            var eventMoney = 0;
            try {
                if (typeof S_EVENTMENU !== 'undefined') {
                    eventMoney = parseInt(S_EVENTMENU.event_money || 0);
                }
            } catch(e) {}
            return eventMoney + 3847;
        };
        CAL.__event_fixed = true;
        console.log('[EVENT-FIX] ✅ Override CAL.get_eventmoney');
        return true;
    }

    // ============================================================
    // 2. Update FAKE.eventmoney
    // ============================================================
    function updateFakeEventmoney() {
        try {
            var eventMoney = 0;
            if (typeof S_EVENTMENU !== 'undefined' && S_EVENTMENU.event_money !== undefined) {
                eventMoney = parseInt(S_EVENTMENU.event_money || 0);
            }
            window.FAKE.eventmoney = eventMoney + 3847;
        } catch(e) {}
    }

    // ============================================================
    // 3. Chặn popup lỗi Event
    // ============================================================
    function blockErrorPopup() {
        if (typeof S_ERROR_POPUP === 'undefined') return false;
        if (S_ERROR_POPUP.__event_blocked) return true;
        var _origStart = S_ERROR_POPUP.start;
        S_ERROR_POPUP.start = function(type, msg) {
            var msgStr = String(msg || '');
            if (msgStr.indexOf('valueundefined') >= 0 ||
                (msgStr.indexOf('Network Error') >= 0 && msgStr.indexOf('(H)') >= 0)) {
                console.log('[EVENT-FIX] 🚫 Chặn popup:', msgStr.substring(0, 100));
                return;
            }
            return _origStart.apply(this, arguments);
        };
        S_ERROR_POPUP.__event_blocked = true;
        console.log('[EVENT-FIX] ✅ Wrap S_ERROR_POPUP');
        return true;
    }

    // ============================================================
    // 4. Setup data cho S_EVENTMENU_STAGE (tab 2)
    // ============================================================
    function setupStageData() {
        if (typeof S_EVENTMENU_STAGE === 'undefined') return false;
        if (S_EVENTMENU_STAGE.__data_set) return true;
        
        S_EVENTMENU_STAGE.XY = [
            { title: 'Thoát', iconfname: 'icon1' },
            { title: 'Stage1', iconfname: 'icon1' },
            { title: 'Stage2', iconfname: 'icon2' },
            { title: 'Stage3', iconfname: 'icon3' },
            { title: 'Rời khỏi', iconfname: 'icon1' }
        ];
        S_EVENTMENU_STAGE.event_menu_ui = {
            list: [],
            stage: 0,
            money: 10000,
            clear: 0,
            max_stage: 100,
            reward: '0',
            board_num: 1,
            txt: {
                stage_comment: 'Địa đạo sự kiện',
                how_to_play_comment: 'Chơi để nhận thưởng'
            }
        };
        S_EVENTMENU_STAGE.__data_set = true;
        console.log('[EVENT-FIX] ✅ Setup S_EVENTMENU_STAGE');
        return true;
    }

    // ============================================================
    // 5. Setup data cho S_EVENTMENU_GACHA (tab 3)
    // ============================================================
    function setupGachaData() {
        if (typeof S_EVENTMENU_GACHA === 'undefined') return false;
        if (S_EVENTMENU_GACHA.__data_set) return true;
        
        S_EVENTMENU_GACHA.XY = [
            { title: 'Thoát', iconfname: 'icon1' },
            { title: 'Gacha1', iconfname: 'icon1' },
            { title: 'Gacha2', iconfname: 'icon2' },
            { title: 'Gacha3', iconfname: 'icon3' },
            { title: 'Rời khỏi', iconfname: 'icon1' }
        ];
        S_EVENTMENU_GACHA.event_menu_ui = {
            list: [],
            gacha_list: [],
            pick_list: [],
            money: 10000,
            board_num: 1,
            kan_length: 0,
            ROTTO: [],
            ROTTO_mini: [],
            picked: 0,
            index: 0,
            png: '',
            ani: { best: ['tower_5001'] },
            css: { EMG_popup_reward1_reward_bg: '' },
            txt: {
                gacha_popup_comment: 'Rút thăm sự kiện',
                how_to_get_money_comment: 'Cách nhận tiền sự kiện',
                gacha_comment: 'Chúc bạn may mắn!'
            }
        };
        S_EVENTMENU_GACHA.__data_set = true;
        console.log('[EVENT-FIX] ✅ Setup S_EVENTMENU_GACHA');
        return true;
    }

    // ============================================================
    // 6. Setup data cho S_EVENTMENU_SHOP (tab 4)
    // ============================================================
    function setupShopData() {
        if (typeof S_EVENTMENU_SHOP === 'undefined') return false;
        if (S_EVENTMENU_SHOP.__data_set) return true;
        
        S_EVENTMENU_SHOP.XY = [
            { title: 'Thoát', iconfname: 'icon1' },
            { title: 'Shop1', iconfname: 'icon1' },
            { title: 'Shop2', iconfname: 'icon2' },
            { title: 'Shop3', iconfname: 'icon3' },
            { title: 'Rời khỏi', iconfname: 'icon1' }
        ];
        S_EVENTMENU_SHOP.event_menu_ui = {
            list: [],
            buy_list: [],
            shop_list: [],
            money: 10000,
            board_num: 1,
            txt: {
                shop_comment: 'Cửa hàng sự kiện'
            }
        };
        S_EVENTMENU_SHOP.__data_set = true;
        console.log('[EVENT-FIX] ✅ Setup S_EVENTMENU_SHOP');
        return true;
    }

    // ============================================================
    // 7. Setup data cho S_ATTENDANCE_EVENT (tab 1)
    // ============================================================
    function setupAttendanceData() {
        if (typeof S_ATTENDANCE_EVENT === 'undefined') return false;
        if (S_ATTENDANCE_EVENT.__data_set) return true;
        
        S_ATTENDANCE_EVENT.XY = [
            { title: 'Thoát', iconfname: 'icon1' },
            { title: 'Day1', iconfname: 'icon1' },
            { title: 'Day2', iconfname: 'icon2' },
            { title: 'Day3', iconfname: 'icon3' },
            { title: 'Rời khỏi', iconfname: 'icon1' }
        ];
        S_ATTENDANCE_EVENT.event_menu_ui = {
            list: [],
            stamp: 0,
            reward: [],
            board_num: 1,
            txt: {
                attendance_comment: 'Tham dự sự kiện'
            }
        };
        S_ATTENDANCE_EVENT.__data_set = true;
        console.log('[EVENT-FIX] ✅ Setup S_ATTENDANCE_EVENT');
        return true;
    }

    // ============================================================
    // 8. Override PHP.eventmenu_* → chuyển scene
    // ============================================================
    function overrideEventPHP() {
        if (typeof PHP === 'undefined') return false;
        if (PHP.__event_overridden) return true;
        
        var mapping = {
            'eventmenu_stage': { scene: 'S_EVENTMENU_STAGE', setup: setupStageData },
            'eventmenu_gacha': { scene: 'S_EVENTMENU_GACHA', setup: setupGachaData },
            'eventmenu_shop': { scene: 'S_EVENTMENU_SHOP', setup: setupShopData },
            'eventmenu_shopping': { scene: 'S_EVENTMENU_SHOP', setup: setupShopData },
            'getput_attendacne_event_status': { scene: 'S_ATTENDANCE_EVENT', setup: setupAttendanceData }
        };
        
        Object.keys(mapping).forEach(function(fn) {
            if (typeof PHP[fn] !== 'function') return;
            var info = mapping[fn];
            
            PHP[fn] = function() {
                console.log('[EVENT-FIX] ' + fn + ' → ' + info.scene);
                
                // Setup data trước
                if (info.setup) info.setup();
                
                var Scene = window[info.scene];
                if (!Scene) {
                    console.error('[EVENT-FIX] ❌ Không có ' + info.scene);
                    return;
                }
                
                try {
                    if (typeof Scene.init === 'function') Scene.init();
                    var cur = ChangeScene.after_s || 'S_EVENTMENU';
                    ChangeScene.start(cur, info.scene, Scene, ChangeScene.TYPE_NORMAL || 1);
                    console.log('[EVENT-FIX] ✅ Chuyển ' + info.scene);
                } catch(e) {
                    console.error('[EVENT-FIX] ❌', e.message);
                }
            };
        });
        
        PHP.__event_overridden = true;
        console.log('[EVENT-FIX] ✅ Override 5 PHP event functions');
        return true;
    }

    // ============================================================
    // 9. Auto retry
    // ============================================================
    var tries = 0;
    var iv = setInterval(function() {
        tries++;
        overrideCalEventmoney();
        blockErrorPopup();
        overrideEventPHP();
        updateFakeEventmoney();
        setupStageData();
        setupGachaData();
        setupShopData();
        setupAttendanceData();
        if (tries >= 40) {
            clearInterval(iv);
            console.log('[EVENT-FIX] ✅ Hoàn tất (' + tries + ' tries)');
        }
    }, 500);

    setInterval(function() {
        overrideCalEventmoney();
        blockErrorPopup();
        overrideEventPHP();
        updateFakeEventmoney();
    }, 2000);

    console.log('[EVENT-FIX] ✅ Đã cài đặt v3');
})();
