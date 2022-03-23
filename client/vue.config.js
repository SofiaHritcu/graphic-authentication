const { defineConfig } = require("@vue/cli-service");
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify',
    /\bvue-awesome\b/,
  ],
  devServer: {
    proxy: {
      '/ga/api': {
        target: 'http://localhost:5000'
      }
    },
  },
  outputDir: path.resolve(__dirname, '../server/public'),
});
