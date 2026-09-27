// FIX sendFile cho file .trashed - đọc bằng fs.readFileSync
var fs = require('fs');
var path = require('path');

function sendFileSafe(res, filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            return res.status(404).send('File not found');
        }
        
        var stat = fs.statSync(filePath);
        if (!stat.isFile()) {
            return res.status(404).send('Not a file');
        }
        
        var ext = path.extname(filePath).toLowerCase();
        var contentType = 'application/octet-stream';
        if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
        else if (ext === '.png') contentType = 'image/png';
        else if (ext === '.gif') contentType = 'image/gif';
        else if (ext === '.svg') contentType = 'image/svg+xml';
        else if (ext === '.ico') contentType = 'image/x-icon';
        else if (ext === '.webp') contentType = 'image/webp';
        else if (ext === '.ttf') contentType = 'font/ttf';
        else if (ext === '.woff') contentType = 'font/woff';
        else if (ext === '.woff2') contentType = 'font/woff2';
        else if (ext === '.css') contentType = 'text/css';
        else if (ext === '.js') contentType = 'application/javascript';
        else if (ext === '.html') contentType = 'text/html';
        else if (ext === '.json') contentType = 'application/json';
        
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Cache-Control', 'public, max-age=3600');
        
        var data = fs.readFileSync(filePath);
        res.status(200).send(data);
    } catch(e) {
        console.log('[sendFileSafe] Lỗi:', e.message);
        res.status(500).send('Error: ' + e.message);
    }
}

module.exports = sendFileSafe;
