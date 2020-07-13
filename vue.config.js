/*
    vue-cli的全局配置文件，更多配置可以参考：https://cli.vuejs.org/zh/config/ */

const path = require('path')    //引入vue path
const defaultSettings = require('./src/settings')   //引入全局设置

function resolve(dir){
  return path.join(__dirname, dir)
}

const port = 9527   //端口号

module.exports = {  //导出包含子选项的对象
  publicPath: '/',    //项目的根路径
  outputDir: 'dist',  //项目打包到的路径
  assetsDir: 'static',   //放置生成的静态资源目录（相对于outputDir）
  productionSourceMap: false,  //生产源映射，设置false可加速生产构建
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {    //如果存在跨域问题，即前端应用和后端API服务器没有在同一个主机上，可以在开发环境下将API请求代理到API服务器
      '/api': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'api'
        }
      },
      '/auth': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        pathRewrite: {
          '^/auth': 'auth'
        }
      }
    },

  },
  configureWebpack: {
    resolve: {
      extensions: [],   //配置的后缀引入时不需要写
      alias: {    //配置别名
        '@': resolve('src'),
        '@crud':resolve('src/components/Crud')
      }
    }
  }

}
