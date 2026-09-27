// proxy_amo.js - Proxy API sang server AMO cũ
var http = require('http');

function proxyToAMO(req, res, targetPath) {
    var options = {
        hostname: '211.253.26.47',
        port: 8093,
        path: '/TOWERDEFENCE_AMO/' + targetPath,
        method: req.method,
        headers: Object.assign({}, req.headers, {
            'host': '211.253.26.47:8093',
            'user-agent': 'app',
            'x-requested-with': 'busidol.mobile.tower'
        })
    };
    delete options.headers['referer'];
    delete options.headers['origin'];
    
    var proxyReq = http.request(options, function(proxyRes) {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res);
    });
    
    proxyReq.on('error', function(e) {
        console.log('Proxy error:', e.message);
        res.status(500).json({ error: e.message });
    });
    
    if (req.method === 'POST' || req.method === 'PUT') {
        req.pipe(proxyReq);
    } else {
        proxyReq.end();
    }
}

module.exports = proxyToAMO;
