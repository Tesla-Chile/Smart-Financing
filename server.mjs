import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
const root = process.cwd();
http.createServer(async (req,res)=>{
  try {
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root + path.sep) || pathname.split('/').some(p=>p.startsWith('.'))) {res.writeHead(403).end();return;}
    const data = await readFile(file);
    res.writeHead(200,{'Content-Type':({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.png':'image/png'})[path.extname(file)] || 'application/octet-stream'}).end(data);
  } catch {res.writeHead(404).end('No encontrado');}
}).listen(5180,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:5180'));

