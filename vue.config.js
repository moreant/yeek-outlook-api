module.exports = {
  publicPath: process.env.NODE_ENV === 'github'
    ? '/yeek-outlook-api'
    : '/',
  transpileDependencies: [
    'vuetify'
  ]
}
