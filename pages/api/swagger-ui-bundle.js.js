import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  const assetPath = path.join(
    process.cwd(),
    'node_modules',
    'swagger-ui-dist',
    req.url.split('/').pop()
  );

  try {
    const data = await fs.readFile(assetPath);
    res.setHeader('Content-Type', getContentType(assetPath));
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: 'Asset not found' });
  }
}

function getContentType(filePath) {
  const extname = path.extname(filePath).slice(1);
  switch (extname) {
    case 'js':
      return 'text/javascript';
    case 'css':
      return 'text/css';
    case 'png':
      return 'image/png';
    case 'svg':
      return 'image/svg+xml';
    default:
      return 'application/octet-stream';
  }
}