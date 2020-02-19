module.exports = {
  publicPath: process.env.ENV === 'github'
    ? '/yeek-outlook-api/'
    : '/',
  transpileDependencies: [
    'vuetify'
  ]
}
