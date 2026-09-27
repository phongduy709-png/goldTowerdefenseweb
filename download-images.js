const https = require('https');
const fs = require('fs');
const tar = require('tar');

const IMG_URL = 'https://github.com/phongduy709-png/goldTowerdefenseweb/releases/download/v1.0-images/images.tar.gz';

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('HTTP ' + res.statusCode));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve()));
      file.on('error', reject);
    }).on('error', reject);
  });
}

(async () => {
  if (fs.existsSync('image') && fs.readdirSync('image').length > 100) {
    console.log('✅ Thu muc image da co san, bo qua tai.');
    return;
  }
  console.log('📥 Dang tai anh tu GitHub Release...');
  await download(IMG_URL, 'images.tar.gz');
  console.log('📦 Dang giai nen...');
  await tar.x({ file: 'images.tar.gz' });
  fs.unlinkSync('images.tar.gz');
  console.log('✅ Hoan tat!');
})().catch(err => {
  console.error('❌ Loi:', err.message);
  process.exit(1);
});
