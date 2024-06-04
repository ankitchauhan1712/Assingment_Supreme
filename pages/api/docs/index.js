import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swagger';

export default function handler(req, res) {
  const parsedUrl = req.url;
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  if (pathname === '/api/docs') {
    const swaggerDoc = swaggerUi.setup(swaggerSpecs, {
      swaggerOptions: {
        url: '/api/docs',
        urls: {
          'swagger-ui.css': '/pages/api/swagger-ui.css',
          'swagger-ui-bundle.js': '/pages/api/swagger-ui-bundle.js',
          'swagger-ui-standalone-preset.js': '/pages/api/swagger-ui-standalone-preset.js',
          'swagger-ui-init.js': '/pages/api/swagger-ui-init.js',
        },
      },
    });
    return swaggerDoc(req, res);
  }

  res.status(404).json({ error: 'Not Found' });
}