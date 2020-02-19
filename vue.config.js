module.exports = {
  publicPath: process.env.NODE_ENV === 'github'
    ? '/outlook-api'
    : '/',
  transpileDependencies: [
    'vuetify'
  ]
}
