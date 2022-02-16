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
        changeOrigin: true
      }
    }
  },
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
}
