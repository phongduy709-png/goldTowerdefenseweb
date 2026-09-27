window.addEventListener('load', function () {
(function() {
    'use strict';
    if (window.__ULTIMATE_MOD_LOADED__) return;
    window.__ULTIMATE_MOD_LOADED__ = true;

    let heroTowerMods = false, speedShopMods = false, eventLokiMapMods = false, bypassCharbookMods = false, buffEnemyMods = false;
    let prooftopDaytryMods = false;
    let music = true;
    let aesDecrypt = false;
    let aesKeys = true;
    let buffStage = false;
    let modLinhTinhEnabled = false;
    let hackTaiNguyen = false;

    let originalGachaFn = null, originalDEFINE_MARKETSTORE_GOLD = null, originalDEFINE_MARKETSTORE_DIA = null, originalPVP = null;
    let hackEventScanInterval = null;
    let originalGetDecrypt2 = null;

    let original_S_PROOFTOP_init = null;
    let original_S_DAYTRY_init  = null;

    let original_get_tower_gradeup_dia = null;
    let original_get_card_levelup = null;
    let original_get_hero_levelup_kill_num = null;
    let original_get_hero_levelup_exp = null;
    let original_get_support_ap = null;
    let original_get_stage_clear_base_reward = null;
    let original_get_stage_clear_star = null;
    let original_get_stage_continue_need_ruby = null;
    let original_get_need_user_exp_for_levelup = null;
    let original_get_user_levelup_reward = null;
    let original_get_charbook_reward_monster = null;
    let original_get_gold_pvp_win = null;
    let original_get_score_pvp_win = null;
    let original_get_pvp_enterance_gold = null;
    let original_get_pvp_enterance_ruby = null;
    let original_get_limit_bou_gold = null;
    let original_get_attribute_rate = null;
    let original_get_skill_mineral = null;
    let original_menu_run_run = null;
    let original_get_hero_levelup_gold = null;

    function patchStageArray(stageArr, name) {
        if (!Array.isArray(stageArr)) return stageArr;
        let newArr = JSON.parse(JSON.stringify(stageArr));
        newArr.forEach((stage, i) => {
            if (!stage) return;
            let stageNum = i + 1;
            if (stageNum >= 1 && stageNum <= 181 && stage.RULE) {
                stage.RULE.LIFE = 10;
                stage.RULE.MINERAL = 1000;
                stage.RULE.INIT_REWARD_TYPE = 2;
                stage.RULE.INIT_REWARD_VALUE = 100;
            }
            if (stageNum >= 158 && stageNum <= 181 && stage.RULE) {
                stage.RULE.HOW_MANY_AWAKE_SKILL = 100000000;
            }
            if (stageNum >= 161 && stageNum <= 181 && Array.isArray(stage.PBD)) {
                stage.PBD.forEach(pbd => {
                    if (pbd) {
                        pbd.FULL_HP = 6000000;
                        pbd.RECOVER_HP = 6000000;
                        pbd.RECOVER_TIME = 1;
                        pbd.START_HP = 6000000;
                    }
                });
            }
        });
        return newArr;
    }

    const BuffStageManager = {
        originalStageEasy: null, originalStageNormal: null, originalStageHard: null,
        originalStarRewardWin: null, originalSelectStageReward: null,
        enable: function() {
            if (typeof STORAGE !== "undefined" && STORAGE.stage_easy && STORAGE.stage_normal && STORAGE.stage_hard) {
                if (!this.originalStageEasy) this.originalStageEasy = [...STORAGE.stage_easy];
                if (!this.originalStageNormal) this.originalStageNormal = [...STORAGE.stage_normal];
                if (!this.originalStageHard) this.originalStageHard = [...STORAGE.stage_hard];
                STORAGE.stage_easy = patchStageArray(STORAGE.stage_easy, "STAGE_EASY");
                STORAGE.stage_normal = patchStageArray(STORAGE.stage_normal, "STAGE_NORMAL");
                STORAGE.stage_hard = patchStageArray(STORAGE.stage_hard, "STAGE_HARD");
            }
            if (typeof S_GAMERESULT_WIN !== "undefined" && S_GAMERESULT_WIN.STAR_REWARD) {
                if (!this.originalStarRewardWin) this.originalStarRewardWin = JSON.parse(JSON.stringify(S_GAMERESULT_WIN.STAR_REWARD));
                let newStarReward = JSON.parse(JSON.stringify(S_GAMERESULT_WIN.STAR_REWARD));
                newStarReward.hard_reward = 2009;
                newStarReward.normal_reward = 2009;
                newStarReward.reward = [0, 20099, 20099, 20099];
                S_GAMERESULT_WIN.STAR_REWARD = newStarReward;
            }
            if (typeof S_SELECTSTAGE !== "undefined") {
                try {
                    if (!this.originalSelectStageReward) this.originalSelectStageReward = JSON.parse(JSON.stringify(S_SELECTSTAGE.STAR_REWARD));
                    S_SELECTSTAGE.STAR_REWARD = [{}, { goal: 1, reward: 5000 }, { goal: 1, reward: 5000 }, { goal: 1, reward: 5000 }, { goal: 1, reward: 30000 }];
                } catch(e) {}
            }
        },
        disable: function() {
            if (typeof STORAGE !== "undefined") {
                if (this.originalStageEasy) STORAGE.stage_easy = [...this.originalStageEasy];
                if (this.originalStageNormal) STORAGE.stage_normal = [...this.originalStageNormal];
                if (this.originalStageHard) STORAGE.stage_hard = [...this.originalStageHard];
            }
            if (typeof S_GAMERESULT_WIN !== "undefined" && this.originalStarRewardWin) {
                S_GAMERESULT_WIN.STAR_REWARD = JSON.parse(JSON.stringify(this.originalStarRewardWin));
            }
            if (typeof S_SELECTSTAGE !== "undefined" && this.originalSelectStageReward) {
                S_SELECTSTAGE.STAR_REWARD = JSON.parse(JSON.stringify(this.originalSelectStageReward));
            }
        }
    };

    function setupBypassBlackList() {
        if (typeof util !== 'undefined' && typeof util.get_decryt2 === 'function') {
            if (!originalGetDecrypt2) originalGetDecrypt2 = util.get_decryt2;
            util.get_decryt2 = function(input) {
                const decrypted = originalGetDecrypt2.call(this, input);
                try {
                    const json = JSON.parse(decrypted);
                    if (json?.VALUE?.black_list?.result === "BLACK_LIST") {
                        json.VALUE.black_list.result = "NONE";
                        json.VALUE.black_list.value = "Bypassed";
                    }
                    return JSON.stringify(json);
                } catch (e) { return decrypted; }
            };
        }
    }

    const HeroManager = {
        originalHeroBou: null, originalSelected: null, originalHeroSelectedMax: null,
        enable: function() {
            if (typeof STORAGE === "undefined" || !STORAGE.hero_bou) return;
            if (!this.originalHeroBou) this.originalHeroBou = JSON.parse(JSON.stringify(STORAGE.hero_bou));
            const heroLevels = { 1: 150, 31: 180, 37: 61, 40: 61, 43: 50, 46: 61 };
            for (let i = 1; i < 60; i++) {
                if (STORAGE.hero_bou[i]) {
                    STORAGE.hero_bou[i].buy = 1;
                    STORAGE.hero_bou[i].killexp = 0;
                    let level = 60;
                    for (const start in heroLevels) {
                        if (i >= parseInt(start)) level = heroLevels[start];
                    }
                    STORAGE.hero_bou[i].level = level;
                }
            }
            if (!this.originalSelected) this.originalSelected = { ...STORAGE.hero_selected };
            Object.assign(STORAGE.hero_selected, { 1: 40, 2: 41, 3: 42, 4: 43, 5: 45 });
            if (typeof STORAGE.hero_selected_max !== 'undefined') {
                if (!this.originalHeroSelectedMax) this.originalHeroSelectedMax = STORAGE.hero_selected_max;
                STORAGE.hero_selected_max = 5;
            }
        },
        disable: function() {
            if (this.originalHeroBou) STORAGE.hero_bou = JSON.parse(JSON.stringify(this.originalHeroBou));
            if (this.originalSelected) Object.assign(STORAGE.hero_selected, this.originalSelected);
            if (this.originalHeroSelectedMax && typeof STORAGE.hero_selected_max !== 'undefined') STORAGE.hero_selected_max = this.originalHeroSelectedMax;
        }
    };

    const TowerManager = {
        originalTowerBou: null,
        enable: function() {
            if (!this.originalTowerBou) this.originalTowerBou = JSON.parse(JSON.stringify(STORAGE.tower_bou));
            const towerIDs = [6034, 6035, 6036, 6025, 6026, 6027];
            for (let i = 3; i < 9; i++) {
                STORAGE.tower_bou[i].card = 1;
                STORAGE.tower_bou[i].level = 1;
                STORAGE.tower_bou[i].tower_bunho_g = towerIDs[i - 3];
            }
            const ranges = [[5001, 5045], [4001, 4036], [3001, 3036], [2001, 2036], [1001, 1036]];
            let index = 9;
            for (let [start, end] of ranges) {
                for (let id = start; id <= end; id++) {
                    STORAGE.tower_bou[index] = { card: 0, level: 5, tower_bunho_g: id };
                    index++;
                }
            }
        },
        disable: function() {
            if (this.originalTowerBou) STORAGE.tower_bou = JSON.parse(JSON.stringify(this.originalTowerBou));
        }
    };

    const TowerBuffManager = {
        originalTowerDefs: null,
        apply: function() { console.log("TowerBuff applied"); },
        disable: function() { console.log("TowerBuff disabled"); }
    };

    const EnemyManager = {
        originalEnemy: null,
        enable: function() {
            if (!window.ENEMY) return;
            if (!this.originalEnemy) this.originalEnemy = JSON.parse(JSON.stringify(window.ENEMY));
            window.ENEMY.forEach(enemy => {
                enemy.AP = 0; enemy.HP = 0; enemy.ATTACK_LEN = 0; enemy.HEART = 0;
                enemy.MINERAL = 4000000000000; enemy.MOVE_SPEED = 0;
                enemy.ATTACK_SPEED = 2;
            });
        },
        disable: function() {
            if (this.originalEnemy && window.ENEMY) window.ENEMY = JSON.parse(JSON.stringify(this.originalEnemy));
        }
    };

    function overrideStore() {
        if (typeof window.DEFINE === 'undefined') return;
        if (!originalDEFINE_MARKETSTORE_GOLD) originalDEFINE_MARKETSTORE_GOLD = JSON.parse(JSON.stringify(window.DEFINE.MARKETSTORE_GOLD));
        if (!originalDEFINE_MARKETSTORE_DIA) originalDEFINE_MARKETSTORE_DIA = JSON.parse(JSON.stringify(window.DEFINE.MARKETSTORE_DIA));
        window.DEFINE.MARKETSTORE_GOLD = [{}, { title: "골드<br>100,000,000", gold: 100000000, payruby: 10, TAG: 0 }, { title: "골드<br>330,000,000", gold: 330000000, payruby: 10, TAG: 0 }, { title: "골드<br>840,000,000", gold: 840000000, payruby: 10, TAG: 0 }, { title: "골드<br>31,500,000,000", gold: 31500000000, payruby: 10, TAG: 0 }];
        window.DEFINE.MARKETSTORE_DIA = [{}, { title: "다이아<br>100,000개", magic: 100000, payruby: 10 }, { title: "다이아<br>550,000개", dia: 550000, payruby: 10 }, { title: "다이아<br>1,150,000개", dia: 1150000, payruby: 10 }, { title: "다이아<br>3,600,000개", dia: 3600000, payruby: 10 }];
    }

    function restoreStore() {
        if (typeof window.DEFINE === 'undefined') return;
        if (originalDEFINE_MARKETSTORE_GOLD) window.DEFINE.MARKETSTORE_GOLD = JSON.parse(JSON.stringify(originalDEFINE_MARKETSTORE_GOLD));
        if (originalDEFINE_MARKETSTORE_DIA) window.DEFINE.MARKETSTORE_DIA = JSON.parse(JSON.stringify(originalDEFINE_MARKETSTORE_DIA));
    }

    function overridePVPFunc() {
        if (typeof PVP === "undefined" || typeof ENUM === "undefined" || typeof IMAGE_FOR_PVP === "undefined") return;
        if (!originalPVP) originalPVP = JSON.parse(JSON.stringify(PVP));
        PVP = { status: ENUM.PVP_STATUS.NONE, fname_size: IMAGE_FOR_PVP.length - 1, MAX_ATTACK_POINT: 15e4, attack_point: 0, attack_mode: 0, attack_focus: 1, monster_send_num: 0, ATTACK: [{}, { enemy_bunho: 104, need_point: 0 }, { enemy_bunho: 105, need_point: 0 }, { enemy_bunho: 106, need_point: 0 }, { enemy_bunho: 107, need_point: 0 }, { enemy_bunho: 103, need_point: 0 }, { enemy_bunho: 102, need_point: 0 }, { enemy_bunho: 101, need_point: 0 }, { enemy_bunho: 100, need_point: 0 }], fenrir_color: "", fenrir_level: 0 };
    }

    function restorePVPFunc() {
        if (typeof PVP === "undefined") return;
        if (originalPVP) PVP = JSON.parse(JSON.stringify(originalPVP));
    }

    function applyTowerMods() { TowerManager.enable(); TowerBuffManager.apply(); }
    function disableTowerMods() { TowerManager.disable(); TowerBuffManager.disable(); }

    const HackSpeedManager = {
        originalIntervalMsX1: null, originalIntervalMsX2: null,
        apply: function() {
            if (typeof window.INTERVAL_MS_x1 === 'undefined' || typeof window.INTERVAL_MS_x2 === 'undefined') return;
            if (this.originalIntervalMsX1 === null) this.originalIntervalMsX1 = window.INTERVAL_MS_x1;
            if (this.originalIntervalMsX2 === null) this.originalIntervalMsX2 = window.INTERVAL_MS_x2;
            window.INTERVAL_MS_x1 = -99999999999999999999999999999+9999999999999999999999999;
            window.INTERVAL_MS_x2 = -999999999999999999999999999999+999999999999999999999999;
        },
        disable: function() {
            if (this.originalIntervalMsX1 !== null) window.INTERVAL_MS_x1 = this.originalIntervalMsX1;
            if (this.originalIntervalMsX2 !== null) window.INTERVAL_MS_x2 = this.originalIntervalMsX2;
        }
    };

    const HackEventShopManager = {
        originalEventMenuShopping: null, originalShopping: null,
        apply: function() {
            if (!window.S_EVENTMENU_SHOP?.shopping || !window.PHP?.eventmenu_shopping) return;
            if (!this.originalEventMenuShopping) this.originalEventMenuShopping = PHP.eventmenu_shopping;
            if (!this.originalShopping) this.originalShopping = S_EVENTMENU_SHOP.shopping;
            PHP.eventmenu_shopping = function(n, rname, money, cb) {
                HackEventShopManager.originalEventMenuShopping.call(this, n, rname, money, function(serverResp) {
                    if (typeof cb === "function") cb(serverResp || {});
                });
            };
            S_EVENTMENU_SHOP.shopping = function(n) {
                const t = S_EVENTMENU_SHOP.event_menu_ui;
                t.remain["product" + n] = 9999;
                t.remain["PRODUCT" + n] = 9999;
                HackEventShopManager.originalShopping.call(this, n);
                const bonusMoney = 2000;
                const bonusCount = 1;
                t.remain_event_money += bonusMoney;
                PHP.getput_eventmoney({ ADD: bonusMoney, ADD_WHY: "Event Shop Hook" }, function() {});
                t.remain["PRODUCT" + n] += bonusCount;
            };
        },
        disable: function() {
            if (this.originalEventMenuShopping && PHP.eventmenu_shopping) PHP.eventmenu_shopping = this.originalEventMenuShopping;
            if (this.originalShopping && S_EVENTMENU_SHOP.shopping) S_EVENTMENU_SHOP.shopping = this.originalShopping;
        }
    };

    const HackMap = {
        originalStageEasy: null,
        apply: function() {
            if (!this.originalStageEasy) this.originalStageEasy = [...STORAGE.stage_easy];
            if (STORAGE && STORAGE.stage_easy && STORAGE.stage_hard && STORAGE.stage_normal) {
                for (let i = 1; i < STORAGE.stage_easy.length; i++) {
                    STORAGE.stage_easy[i] = "A";
                    STORAGE.stage_hard[i] = "C";
                    STORAGE.stage_normal[i] = "C";
                }
            }
        },
        disable: function() {
            if (this.originalStageEasy) STORAGE.stage_easy = [...this.originalStageEasy];
        }
    };

    const CharbookManager = {
        originalCharbookMonster: null, originalCharbookHero: null,
        enable: function() {
            if (typeof STORAGE === "undefined" || !STORAGE.charbook) return;
            if (STORAGE.charbook.monster && Array.isArray(STORAGE.charbook.monster)) {
                if (!this.originalCharbookMonster) this.originalCharbookMonster = JSON.parse(JSON.stringify(STORAGE.charbook.monster));
                for (let i = 0; i < 250; i++) STORAGE.charbook.monster[i] = 1;
            }
            if (STORAGE.charbook.hero && Array.isArray(STORAGE.charbook.hero)) {
                if (!this.originalCharbookHero) this.originalCharbookHero = JSON.parse(JSON.stringify(STORAGE.charbook.hero));
                for (let i = 0; i < 52; i++) STORAGE.charbook.hero[i] = 1;
            }
        },
        disable: function() {
            if (typeof STORAGE === "undefined" || !STORAGE.charbook) return;
            if (this.originalCharbookMonster) STORAGE.charbook.monster = JSON.parse(JSON.stringify(this.originalCharbookMonster));
            if (this.originalCharbookHero) STORAGE.charbook.hero = JSON.parse(JSON.stringify(this.originalCharbookHero));
        }
    };

    function applyProoftopDaytryHack() {
        if (typeof S_PROOFTOP !== 'undefined' && typeof S_PROOFTOP.init_var === 'function') {
            if (!original_S_PROOFTOP_init) original_S_PROOFTOP_init = S_PROOFTOP.init_var;
            S_PROOFTOP.init_var = function() {
                S_PROOFTOP.row_focus = 2; S_PROOFTOP.btn_focus = 2; S_PROOFTOP.top_focus = 1;
                S_PROOFTOP.clear_reward = [{}, { type: "DIA", value: 7122009 }];
                S_PROOFTOP.NUM = S_PROOFTOP.clear_reward.length - 1;
            };
            if (typeof S_PROOFTOP.clear_reward !== 'undefined') S_PROOFTOP.init_var();
        }
        if (typeof S_DAYTRY !== 'undefined' && typeof S_DAYTRY.init_var === 'function') {
            if (!original_S_DAYTRY_init) original_S_DAYTRY_init = S_DAYTRY.init_var;
            S_DAYTRY.init_var = function() {
                S_DAYTRY.focus = 2;
                S_DAYTRY.reward = [{}, { type: "DIA", value: 100000, plus: 0.3 }, { type: "DIA", value: 100000, plus: 0.1 }, { type: "DIA", value: 100000, plus: 0.02 }];
            };
            if (typeof S_DAYTRY.reward !== 'undefined') S_DAYTRY.init_var();
        }
    }

    function restoreProoftopDaytry() {
        if (typeof S_PROOFTOP !== 'undefined' && original_S_PROOFTOP_init) S_PROOFTOP.init_var = original_S_PROOFTOP_init;
        if (typeof S_DAYTRY !== 'undefined' && original_S_DAYTRY_init) S_DAYTRY.init_var = original_S_DAYTRY_init;
    }

    function enableModLinhTinh() {
        if (!original_get_tower_gradeup_dia && typeof CAL.get_tower_gradeup_dia === 'function') original_get_tower_gradeup_dia = CAL.get_tower_gradeup_dia;
        CAL.get_tower_gradeup_dia = function(n) { return 0; };
        if (!original_get_card_levelup && typeof CAL.get_card_levelup === 'function') original_get_card_levelup = CAL.get_card_levelup;
        CAL.get_card_levelup = function(n, t) { return 0; };
        if (!original_get_hero_levelup_kill_num && typeof CAL.get_hero_levelup_kill_num === 'function') original_get_hero_levelup_kill_num = CAL.get_hero_levelup_kill_num;
        if (!original_get_hero_levelup_exp && typeof CAL.get_hero_levelup_exp === 'function') original_get_hero_levelup_exp = CAL.get_hero_levelup_exp;
        CAL.get_hero_levelup_kill_num = function(n) { return 0; };
        CAL.get_hero_levelup_exp = function(n) { return 0; };
        if (!original_get_support_ap && typeof CAL.get_support_ap === 'function') original_get_support_ap = CAL.get_support_ap;
        CAL.get_support_ap = function() { return SUPPORT[1].AP * 1000000001; };
        if (!original_get_stage_clear_base_reward && typeof CAL.get_stage_clear_base_reward === 'function') original_get_stage_clear_base_reward = CAL.get_stage_clear_base_reward;
        CAL.get_stage_clear_base_reward = function(n) { return 10000000; };
        if (!original_get_stage_clear_star && typeof CAL.get_stage_clear_star === 'function') original_get_stage_clear_star = CAL.get_stage_clear_star;
        CAL.get_stage_clear_star = function(n) { return 3; };
        if (!original_get_stage_continue_need_ruby && typeof CAL.get_stage_continue_need_ruby === 'function') original_get_stage_continue_need_ruby = CAL.get_stage_continue_need_ruby;
        CAL.get_stage_continue_need_ruby = function(n) { return 0; };
        if (!original_get_need_user_exp_for_levelup && typeof CAL.get_need_user_exp_for_levelup === 'function') original_get_need_user_exp_for_levelup = CAL.get_need_user_exp_for_levelup;
        CAL.get_need_user_exp_for_levelup = function(n) { return 1000; };
        if (!original_get_user_levelup_reward && typeof CAL.get_user_levelup_reward === 'function') original_get_user_levelup_reward = CAL.get_user_levelup_reward;
        CAL.get_user_levelup_reward = function(n) { return n % 5 === 0 ? 900 : 800; };
        if (!original_get_charbook_reward_monster && typeof CAL.get_charbook_reward_monster === 'function') original_get_charbook_reward_monster = CAL.get_charbook_reward_monster;
        CAL.get_charbook_reward_monster = function(n) { return 3000; };
        if (!original_get_gold_pvp_win && typeof CAL.get_gold_pvp_win === 'function') original_get_gold_pvp_win = CAL.get_gold_pvp_win;
        CAL.get_gold_pvp_win = function(n, t) { return 7122009; };
        if (!original_get_score_pvp_win && typeof CAL.get_score_pvp_win === 'function') original_get_score_pvp_win = CAL.get_score_pvp_win;
        CAL.get_score_pvp_win = function() { return 727; };
        if (!original_get_pvp_enterance_gold && typeof CAL.get_pvp_enterance_gold === 'function') original_get_pvp_enterance_gold = CAL.get_pvp_enterance_gold;
        if (!original_get_pvp_enterance_ruby && typeof CAL.get_pvp_enterance_ruby === 'function') original_get_pvp_enterance_ruby = CAL.get_pvp_enterance_ruby;
        CAL.get_pvp_enterance_gold = function() { return 0; };
        CAL.get_pvp_enterance_ruby = function() { return 0; };
        if (!original_get_limit_bou_gold && typeof CAL.get_limit_bou_gold === 'function') original_get_limit_bou_gold = CAL.get_limit_bou_gold;
        CAL.get_limit_bou_gold = function() { return Infinity; };
        if (!original_get_attribute_rate && typeof CAL.get_attribute_rate === 'function') original_get_attribute_rate = CAL.get_attribute_rate;
        CAL.get_attribute_rate = function(n, t) { return 1 + DEFINE.ATTRIBIUTE_RATE; };
        if (!original_get_skill_mineral && typeof CAL.get_skill_mineral === 'function') original_get_skill_mineral = CAL.get_skill_mineral;
        CAL.get_skill_mineral = function(n) { return 0; };
        if (!original_get_hero_levelup_gold && typeof CAL.get_hero_levelup_gold === 'function') original_get_hero_levelup_gold = CAL.get_hero_levelup_gold;
        CAL.get_hero_levelup_gold = function(n) { return 0; };
    }

    function disableModLinhTinh() {
        if (original_get_tower_gradeup_dia) CAL.get_tower_gradeup_dia = original_get_tower_gradeup_dia;
        if (original_get_card_levelup) CAL.get_card_levelup = original_get_card_levelup;
        if (original_get_hero_levelup_kill_num) CAL.get_hero_levelup_kill_num = original_get_hero_levelup_kill_num;
        if (original_get_hero_levelup_exp) CAL.get_hero_levelup_exp = original_get_hero_levelup_exp;
        if (original_get_support_ap) CAL.get_support_ap = original_get_support_ap;
        if (original_get_stage_clear_base_reward) CAL.get_stage_clear_base_reward = original_get_stage_clear_base_reward;
        if (original_get_stage_clear_star) CAL.get_stage_clear_star = original_get_stage_clear_star;
        if (original_get_stage_continue_need_ruby) CAL.get_stage_continue_need_ruby = original_get_stage_continue_need_ruby;
        if (original_get_user_levelup_reward) CAL.get_user_levelup_reward = original_get_user_levelup_reward;
        if (original_get_charbook_reward_monster) CAL.get_charbook_reward_monster = original_get_charbook_reward_monster;
        if (original_get_gold_pvp_win) CAL.get_gold_pvp_win = original_get_gold_pvp_win;
        if (original_get_score_pvp_win) CAL.get_score_pvp_win = original_get_score_pvp_win;
        if (original_get_pvp_enterance_gold) CAL.get_pvp_enterance_gold = original_get_pvp_enterance_gold;
        if (original_get_pvp_enterance_ruby) CAL.get_pvp_enterance_ruby = original_get_pvp_enterance_ruby;
        if (original_get_limit_bou_gold) CAL.get_limit_bou_gold = original_get_limit_bou_gold;
        if (original_get_attribute_rate) CAL.get_attribute_rate = original_get_attribute_rate;
        if (original_get_skill_mineral) CAL.get_skill_mineral = original_get_skill_mineral;
        if (original_menu_run_run && S_LEVELUP_TOWER) S_LEVELUP_TOWER.menu_run_run = original_menu_run_run;
        if (original_get_hero_levelup_gold) CAL.get_hero_levelup_gold = original_get_hero_levelup_gold;
    }

    function updateMusicPlayer() {
        const existingPlayer = document.getElementById('musicPlayer');
        if (hackSettings.music) {
            if (!existingPlayer) {
                const iframe = document.createElement('iframe');
                iframe.id = 'musicPlayer';
                iframe.width = '300'; iframe.height = '60';
                iframe.src = 'https://www.youtube.com/embed/K0T-oFJ_N10?autoplay=1&controls=1';
                iframe.frameBorder = '0';
                const content = hackPanel.querySelector('.hack-content');
                content.appendChild(iframe);
            }
        } else {
            if (existingPlayer) existingPlayer.parentElement.removeChild(existingPlayer);
        }
    }

    function updateAESDecryptButton() {
        const existingButton = document.getElementById('aesDecryptButton');
        if (hackSettings.aesDecrypt) {
            if (!existingButton) {
                const button = document.createElement("button");
                button.id = "aesDecryptButton";
                button.textContent = "🔓 Giải mã AES2";
                Object.assign(button.style, { position: "fixed", bottom: "20px", right: "20px", zIndex: "99999", padding: "10px 14px", fontSize: "14px", fontWeight: "bold", backgroundColor: "#27ae60", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" });
                document.body.appendChild(button);
                button.addEventListener("click", () => {
                    const encrypted = prompt("🔐 Dán chuỗi AES2 cần giải mã:");
                    if (!encrypted) return;
                    try {
                        const decrypted = util.get_decryt2(encrypted);
                        console.log("✅ Giải mã:", decrypted);
                        alert("✅ Giải mã thành công! Xem Console.");
                    } catch (err) { alert("❌ Không thể giải mã."); }
                });
            }
        } else {
            if (existingButton) existingButton.parentElement.removeChild(existingButton);
        }
    }

    const hackSettings = {
        heroTowerMods: false, speedShopMods: false, eventLokiMapMods: false,
        bypassCharbookMods: false, buffEnemyMods: false, prooftopDaytryMods: false,
        music: true, aesDecrypt: false, aesKeys: true, bypassBlackList: false,
        buffStage: false, modLinhTinh: false, hackTaiNguyen: false
    };

    const createHackItem = (label, statusText, settingKey, locked = false) => `
        <div class="hack-item">
            <div><div class="hack-item-label">${label}</div><div class="hack-status">${statusText}</div></div>
            <div class="hack-toggle ${hackSettings[settingKey] ? 'active' : ''} ${locked ? 'locked' : ''}" ${locked ? '' : `onclick="toggleHack('${settingKey}')"`}></div>
        </div>
    `;

    let hackPanel;

    const createMenu = () => {
        hackPanel = document.createElement('div');
        hackPanel.className = 'hack-panel collapsed';
        hackPanel.innerHTML = `
            <div class="hack-header">
                <div class="hack-avatar"></div>
                <div class="hack-title">Ultimate Mod V2</div>
            </div>
            <div class="hack-content">
                ${createHackItem("Hero/Tower Mods", "Bật/Tắt", "heroTowerMods")}
                ${createHackItem("Speed/Shop Mods", "Bật/Tắt", "speedShopMods")}
                ${createHackItem("Event/Loki/Map Mods", "Bật/Tắt", "eventLokiMapMods")}
                ${createHackItem("Bypass/Charbook Mods", "Bật/Tắt", "bypassCharbookMods")}
                ${createHackItem("Buff Enemy", "Bật/Tắt", "buffEnemyMods")}
                ${createHackItem("Prooftop/Daytry Mods", "Bật/Tắt", "prooftopDaytryMods")}
                ${createHackItem("BuffStage", "Buff stage", "buffStage")}
                ${createHackItem("Nhạc", "Bật/Tắt", "music")}
                ${createHackItem("Giải mã AES2", "Bật/Tắt", "aesDecrypt")}
                ${createHackItem("Lấy Mã AES2", "Bật/Tắt", "aesKeys")}
                ${createHackItem("BypassBlackList", "Đã bật", "bypassBlackList", true)}
                ${createHackItem("ModLinhTinh", "Bật/Tắt", "modLinhTinh")}
                ${createHackItem("HackTaiNguyen", "Add tài nguyên", "hackTaiNguyen")}
            </div>
        `;
        document.body.appendChild(hackPanel);

        hackPanel.querySelector('.hack-header').addEventListener('click', (e) => {
            if (!e.target.closest('.hack-toggle')) {
                hackPanel.classList.toggle('active');
                hackPanel.classList.toggle('collapsed');
            }
        });
    };

    window.toggleHack = function(feature) {
        hackSettings[feature] = !hackSettings[feature];
        const toggle = event.target;
        toggle.classList.toggle('active');
        const status = toggle.parentElement.querySelector('.hack-status');
        status.textContent = hackSettings[feature] ? 'Đã bật' : 'Đã tắt';
        switch (feature) {
            case 'heroTowerMods':
                heroTowerMods = hackSettings[feature];
                heroTowerMods ? (HeroManager.enable(), applyTowerMods()) : (HeroManager.disable(), disableTowerMods());
                break;
            case 'speedShopMods':
                speedShopMods = hackSettings[feature];
                if (speedShopMods) { HackSpeedManager.apply(); overrideStore(); overridePVPFunc(); }
                else { HackSpeedManager.disable(); restoreStore(); restorePVPFunc(); }
                break;
            case 'eventLokiMapMods':
                eventLokiMapMods = hackSettings[feature];
                if (eventLokiMapMods) { HackMap.apply(); HackEventShopManager.apply(); }
                else { HackMap.disable(); HackEventShopManager.disable(); }
                break;
            case 'bypassCharbookMods':
                bypassCharbookMods = hackSettings[feature];
                bypassCharbookMods ? CharbookManager.enable() : CharbookManager.disable();
                break;
            case 'buffEnemyMods':
                buffEnemyMods = hackSettings[feature];
                buffEnemyMods ? EnemyManager.enable() : EnemyManager.disable();
                break;
            case 'prooftopDaytryMods':
                prooftopDaytryMods = hackSettings[feature];
                prooftopDaytryMods ? applyProoftopDaytryHack() : restoreProoftopDaytry();
                break;
            case 'buffStage':
                buffStage = hackSettings[feature];
                buffStage ? BuffStageManager.enable() : BuffStageManager.disable();
                break;
            case 'music':
                music = hackSettings[feature];
                updateMusicPlayer();
                break;
            case 'aesDecrypt':
                aesDecrypt = hackSettings[feature];
                updateAESDecryptButton();
                break;
            case 'modLinhTinh':
                modLinhTinhEnabled = hackSettings[feature];
                modLinhTinhEnabled ? enableModLinhTinh() : disableModLinhTinh();
                break;
            case 'hackTaiNguyen':
                hackTaiNguyen = hackSettings[feature];
                if (hackTaiNguyen && typeof PHP !== "undefined" && typeof PHP.put_userinfo_rubydiagold === "function") {
                    PHP.put_userinfo_rubydiagold({ ruby_add: 800000, ruby_why: "mod", magic_add: 40000, magic_why: "mod", dia_add: 300000, dia_why: "mod", gold_add: 0, gold_why: "", mileage_add: 300, mileage_why: "mod", p_ticket_add: 0, p_ticket_why: "", n_ticket_add: 0, n_ticket_why: "" }, function() {});
                }
                break;
        }
    };

    function isGameLoaded() {
        return typeof STORAGE !== 'undefined' && typeof STORAGE.hero_bou !== 'undefined';
    }

    function waitForGameLoad(callback) {
        const interval = setInterval(() => {
            if (isGameLoaded()) {
                clearInterval(interval);
                setupBypassBlackList();
                callback();
            }
        }, 1000);
    }

    function updateAESKeysHook() {
        const existingScript = document.getElementById("aesKeysHook");
        if (hackSettings.aesKeys) {
            if (!existingScript) {
                const script = document.createElement("script");
                script.id = "aesKeysHook";
                script.textContent = `(function(){const originalImportKey = crypto.subtle.importKey;crypto.subtle.importKey = async function(){const k = await originalImportKey.apply(this, arguments);console.log("AES key:", k);return k;};const originalDecrypt = crypto.subtle.decrypt;crypto.subtle.decrypt = async function(){const r = await originalDecrypt.apply(this, arguments);try{console.log("Decrypted:", new TextDecoder().decode(r));}catch(e){}return r;};})();`;
                document.head.appendChild(script);
            }
        } else {
            if (existingScript) existingScript.parentElement.removeChild(existingScript);
        }
    }

    waitForGameLoad(() => {
        createMenu();
        if (hackSettings.music) updateMusicPlayer();
        if (hackSettings.aesKeys) updateAESKeysHook();
    });

})();
});
