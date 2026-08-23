/* Serves dist/ under a subpath, exactly the way GitHub Pages serves a project
   site. Used to prove the BASE_PATH build works before deploying. */
const http = require('http'), fs = require('fs'), path = require('path');
const OUT = path.join(__dirname, 'dist');
const PREFIX = process.env.PREFIX || '/Marela-And-Tony';
const T = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript',
  '.svg':'image/svg+xml', '.json':'application/json', '.xml':'application/xml',
  '.txt':'text/plain', '.jpg':'image/jpeg', '.png':'image/png',
  '.webmanifest':'application/manifest+json' };

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (!p.startsWith(PREFIX)) { res.statusCode = 404; return res.end('404 outside project path'); }
  p = p.slice(PREFIX.length) || '/';
  let f = path.join(OUT, p);
  if (!path.extname(f)) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { f = path.join(OUT, '404.html'); res.statusCode = 404; }
  res.setHeader('Content-Type', T[path.extname(f)] || 'application/octet-stream');
  fs.createReadStream(f).on('error', () => { res.statusCode = 500; res.end(); }).pipe(res);
}).listen(4322, () => console.log('Pages simulator: http://localhost:4322' + PREFIX + '/'));
