module.exports = {
  publicPath:'/',
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
 /*  devServer: {
     proxy: {
      '/apis': {
        target: 'http://elm.cangdu.org/v1', // target host
        ws: true, // proxy websockets
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          '^/apis': '' // rewrite path
        }
      }
    }
  } */
}