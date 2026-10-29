// Servidor estático sem dependências, para rodar o protótipo como Web Service (ex.: Render)
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};
// Só estes caminhos são públicos; o resto do repositório não é servido
const PUBLIC = [/^\/index\.html$/, /^\/css\/[\w.-]+$/, /^\/js\/[\w.-]+$/, /^\/assets\/[\w./-]+$/];

http.createServer((req, res) => {
  let url;
  try { url = decodeURIComponent(new URL(req.url, 'http://x').pathname); }
  catch (e) { res.writeHead(400).end('Bad request'); return; }
  if (url === '/') url = '/index.html';

  if (url.includes('..') || !PUBLIC.some((re) => re.test(url))) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Não encontrado');
    return;
  }

  const file = path.join(ROOT, url);
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Não encontrado');
      return;
    }
    res.writeHead(200, {
      'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': url === '/index.html' ? 'no-cache' : 'public, max-age=3600',
    });
    res.end(data);
  });
}).listen(PORT, () => console.log(`Checkpoint rodando na porta ${PORT}`));
