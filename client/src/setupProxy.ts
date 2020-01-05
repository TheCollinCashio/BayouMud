import proxy from 'http-proxy-middleware'

module.exports = function(app: any) {
  app.use(
    '/api',
    proxy({
      target: process.env.REACT_APP_PROXY,
      changeOrigin: true,
    })
  );
};