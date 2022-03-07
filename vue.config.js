module.exports = {
  devServer:{
    proxy:{
      '^/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api' : ''}
      },
      '^/serverlessws': {
        target: 'http://localhost:3001',
        ws:true,
        pathRewrite: {'^/serverlessws' : ''},
        changeOrigin: true,
        onProxyReqWs(proxyReq, req, res){
          if(req?.headers?.cookie){
            req.headers.cookie = undefined;
          }
          if(proxyReq?.headers?.cookie){
            proxyReq.headers.cookie = undefined;
          }
        }
      }
    }
  },
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
}
