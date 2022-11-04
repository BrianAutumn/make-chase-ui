module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();
    svgRule.delete('type');
    svgRule.delete('generator');

    svgRule
      .use('vue-loader-v16')
      .loader('vue-loader-v16')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
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
