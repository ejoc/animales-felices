process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')

// const GlobalizePlugin = require( "globalize-webpack-plugin" )

// environment.plugins.prepend(
//   new GlobalizePlugin({
//     production: false,
//     developmentLocale: "en",
//     supportedLocales: [ "en", "es" ],
//     // messages: "messages/[locale].json",
//     output: "i18n/[locale].[chunkhash].js"
//   })
// )

module.exports = environment.toWebpackConfig()
