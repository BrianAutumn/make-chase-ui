module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api': ''}
      },
      '^/wss': {
        target: 'http://localhost:3001',
        pathRewrite: {'^/wss': ''},
        ws:true,
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
