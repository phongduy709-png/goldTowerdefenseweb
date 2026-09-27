
// ==================== GET USER DATA ALL (cho bridge) ====================
app.post('/get_user_data_all_AES2.php', function(req, res) {
    console.log('[USER-DATA-ALL] 📥 Request');
    try {
        var data = loadUserData();
        if (!data || !data.raw) {
            data = { raw: makeDefaultData(), action_log: [] };
            saveUserData(data);
        }
        
        var raw = data.raw;
        
        // Sync selected
        if (raw.VALUE.tower && raw.VALUE.tower.value && raw.VALUE.tower.value.bou_tower) {
            var t = raw.VALUE.tower.value;
            var bouIds = t.bou_tower.split(',').map(function(x){ return x.split(':')[0]; }).filter(Boolean);
            var selIds = t.selected_tower ? t.selected_tower.split('|')[0].split(',').filter(Boolean) : [];
            var newSel = selIds.filter(function(id){ return bouIds.indexOf(id) >= 0; }).slice(0, 10);
            if (!t.selected_tower || t.selected_tower.indexOf('|') < 0) {
                t.selected_tower = newSel.join(',');
            }
        }
        
        console.log('[USER-DATA-ALL] ✅ Trả về', Object.keys(raw.VALUE).length, 'entries');
        res.send(encryptData(raw));
    } catch(e) {
        console.log('[USER-DATA-ALL] ❌', e.message);
        res.send('ERROR: ' + e.message);
    }
});
