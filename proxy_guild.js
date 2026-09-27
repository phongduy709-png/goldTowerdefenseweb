
// ==================== PROXY GUILD ====================
// Proxy request guild → server thật
// Tránh CORS + cho phép URL guild hoạt động
// =========================================================
app.use('/proxy-guild', function(req, res) {
    var https = require('http');
    var targetPath = req.originalUrl.replace('/proxy-guild', '');
    
    console.log('[PROXY-GUILD] 📥', req.method, targetPath);
    
    var options = {
        hostname: '211.253.26.47',
        port: 8093,
        path: targetPath,
        method: req.method,
        headers: Object.assign({}, req.headers, {
            'Host': '211.253.26.47:8093',
            'Origin': 'http://211.253.26.47:8093'
        })
    };
    
    delete options.headers['host'];
    
    var proxyReq = https.request(options, function(proxyRes) {
        console.log('[PROXY-GUILD] ←', proxyRes.statusCode);
        
        // Cho phép CORS
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', '*');
        
        // Copy headers
        Object.keys(proxyRes.headers).forEach(function(key) {
            if (key !== 'access-control-allow-origin') {
                res.setHeader(key, proxyRes.headers[key]);
            }
        });
        
        res.writeHead(proxyRes.statusCode);
        proxyRes.pipe(res);
    });
    
    proxyReq.on('error', function(e) {
        console.error('[PROXY-GUILD] ❌', e.message);
        res.status(500).json({ error: e.message });
    });
    
    // Forward body
    if (req.body && Object.keys(req.body).length > 0) {
        var bodyStr = require('querystring').stringify(req.body);
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyStr));
        proxyReq.write(bodyStr);
    } else if (req.rawBody) {
        proxyReq.write(req.rawBody);
    }
    
    proxyReq.end();
});
