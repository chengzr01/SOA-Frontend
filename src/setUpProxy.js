const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/agent", {
      target: "http://18.206.229.27:8000",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/response", {
      target: "http://13.54.150.80:8000",
      changeOrigin: true,
    })
  );
};
