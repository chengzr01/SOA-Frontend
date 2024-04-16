const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/agent", {
      target: "http://ec2-18-206-229-27.compute-1.amazonaws.com:8000",
      changeOrigin: true,
    })
  );
};
