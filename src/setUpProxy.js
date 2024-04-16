const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/agent", {
      target: "http://18.206.229.27:8000",
      changeOrigin: true,
    })
  );
};
