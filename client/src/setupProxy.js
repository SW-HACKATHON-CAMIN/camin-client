const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/", {
      target: "http://118.67.133.82:8080",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/v1/payment/ready", {
      target: "https://kapi.kakao.com",
      changeOrigin: true,
    })
  );
};
