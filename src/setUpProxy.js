const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const routes = ["/response/", "/login/", "/logout/"];
  const target = "http://127.0.0.1:8000/";

  routes.forEach((route) => {
    app.use(
      createProxyMiddleware(route, {
        target: target,
        changeOrigin: true,
      })
    );
  });
};
