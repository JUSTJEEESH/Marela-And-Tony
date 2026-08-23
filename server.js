/* Tiny dev server for local preview: node server.js -> http://localhost:4321 */
const http = require('http'), fs = require('fs'), path = require('path');
const OUT = path.join(__dirname, 'dist');
const TYPES = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript',
  '.svg':'image/svg+xml', '.json':'application/json', '.xml':'application/xml',
  '.txt':'text/plain', '.jpg':'image/jpeg', '.png':'image/png',
  '.webmanifest':'application/manifest+json' };

http.createServer((req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  let f = path.join(OUT, p);
  if (!path.extname(f)) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { f = path.join(OUT, '404.html'); res.statusCode = 404; }
  if (!fs.existsSync(f)) { res.statusCode = 500; return res.end('Build the site first: npm run build'); }
  res.setHeader('Content-Type', TYPES[path.extname(f)] || 'application/octet-stream');
  fs.createReadStream(f).on('error', () => { res.statusCode = 500; res.end('error'); }).pipe(res);
}).listen(4321, () => console.log('Preview: http://localhost:4321'));
