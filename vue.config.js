  
console.log('ENV=' + process.env.NODE_ENV)
console.log('BASEURL=' + process.env.VUE_APP_API_BASE_URL)

module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            //modifyVars 方式修改全局样式
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  devServer: {
    port: 9000,//监听端口
    proxy: {//开发环境转发配置，解决跨域访问问题
      "/devurl": {
        target: "http://192.168.150.12:1771",   // 要请求的后台地址
        ws: false,    // 启用websockets
        changeOrigin: true,    // 是否跨域
        pathRewrite: {   
          "^/devurl": ""          // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替
        }
      },"/testurl": {
        target: "http://192.168.150.51:6600",   // 要请求的后台地址
        ws: false,    // 启用websockets
        changeOrigin: true,    // 是否跨域
        pathRewrite: {   
          "^/testurl": ""          // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替
        }
      }
    }
  },
  // 选项...
  publicPath: process.env.NODE_ENV === 'production'
    ? '/mcs/'
    : '/'
};