const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    }),
  );
};

module.exports = proxy;
