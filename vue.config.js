module.exports = {
  publicPath: process.env.VUE_APP_ENV === 'github'
    ? '/yeek-outlook-api/'
    : '/',
  transpileDependencies: [
    'vuetify'
  ]
}
