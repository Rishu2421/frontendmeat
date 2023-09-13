const { createProxyMiddleware } = require('http-proxy-middleware');

console.log("here in proxy.js")
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://backendnew.chersmeatgram.com/', // Change this to your backend server URL
      changeOrigin: true,
    })
  );
};
