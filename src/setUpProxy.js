const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/agent", {
      target: "http://82.156.245.114:5000",
      // target:"http://127.0.0.1:8000",
      changeOrigin: true,
    })
  );
};
