const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/response/", {
      target: "http://54.206.35.165:8000",
      changeOrigin: true,
    })
  );
};
