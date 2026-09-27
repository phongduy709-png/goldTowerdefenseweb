
// ==================== GUILD LOCAL API v2 ====================
// 1 wildcard match TẤT CẢ URL guild (bao gồm cả URL có "../")
// =========================================================
var GUILD_DATA = {
    bunho: 31834,
    name: 'Sunflower',
    jang: 0,
    leader_uniq: 'ATV91285',
    member: 1,
    max_member: 30,
    buffer: 5,
    stage_buff_cnt: 1,
    guild_gold: 1000000,
    guild_point: 10000,
    guild_notice: 'Chào mừng!',
    type: 1,
    flag: { color: 1, flag: 0, symbol: 0, word: 0 },
    amulet: { q1: 0, q2: 0, q3: 0, q4: 0 },
    quest: { q1: 0, q2: 0, q3: 0, q4: 0 },
    member_list: {
        1: {
            un: 'ATV91285', name: 'Sunflower', jang: 0,
            lv: 3636, level: 3636, exp: 0,
            ti: '2026-04-01 21:21:29',
            last_login: '2026-09-23 12:00:00',
            today: 0, reward: 0
        }
    },
    chat_list: {},
    boss_data: { level: 1, hp: 0, max_hp: 100, score: 0 },
    war_data: { score: 0, rank: 0 },
    stage_data: { stage: 0, clear: 0 },
    territory_data: {}
};

function respondGuild(res, data) {
    var response = { RESULT: 'OK', VALUE: data };
    res.send(encryptData(response));
}

// ✅ WILDCARD match mọi URL có chứa TOWERDEFENCE_COMMON/GUILD
app.all('*TOWERDEFENCE_COMMON/GUILD/*', function(req, res) {
    // Chuẩn hoá URL: bỏ ../ và ./
    var originalUrl = req.originalUrl || req.url;
    var cleanUrl = originalUrl
        .replace(/\/\.\.\//g, '/')    // Bỏ ../
        .replace(/\/\.\//g, '/')       // Bỏ ./
        .replace(/\/{2,}/g, '/');      // Bỏ // thừa
    
    console.log('[GUILD-LOCAL] 📥 Original:', originalUrl.substring(0, 150));
    console.log('[GUILD-LOCAL] 📥 Clean:', cleanUrl.substring(0, 150));
    
    var url = cleanUrl;
    
    // Route đến handler phù hợp
    if (url.indexOf('get_guild_boss') >= 0 || url.indexOf('put_guild_boss') >= 0) {
        return respondGuild(res, GUILD_DATA.boss_data);
    }
    if (url.indexOf('stage_info') >= 0) {
        return respondGuild(res, GUILD_DATA.stage_data);
    }
    if (url.indexOf('territory') >= 0) {
        return respondGuild(res, GUILD_DATA.territory_data);
    }
    if (url.indexOf('chat') >= 0) {
        return respondGuild(res, { result: 'OK', chat_list: {} });
    }
    if (url.indexOf('notice') >= 0) {
        return respondGuild(res, { result: 'OK', notice: '' });
    }
    if (url.indexOf('quest') >= 0) {
        return respondGuild(res, GUILD_DATA.quest);
    }
    if (url.indexOf('update_guild_user') >= 0) {
        return respondGuild(res, GUILD_DATA.member_list[1]);
    }
    if (url.indexOf('check_guild_name') >= 0) {
        return respondGuild(res, { result: 'OK', duplicate: false });
    }
    if (url.indexOf('guildwar_score') >= 0) {
        return respondGuild(res, { result: 'OK', score: 0 });
    }
    if (url.indexOf('guild_info_for_war') >= 0) {
        // Data đặc biệt cho War
        var warData = Object.assign({}, GUILD_DATA, {
            guild_war: 1,  // 1 = có war
            war_start_time: '2026-09-23 00:00:00',
            war_end_time: '2026-09-30 00:00:00',
            war_rank: 1,
            war_score: 0
        });
        return respondGuild(res, warData);
    }
    // Default: trả về toàn bộ data
    respondGuild(res, GUILD_DATA);
});

console.log('[GUILD-LOCAL] ✅ Đã thêm wildcard endpoint guild');
