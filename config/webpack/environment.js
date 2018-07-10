const { environment } = require('@rails/webpacker')

const ExtractTextPlugin = environment.plugins.get('ExtractText')

environment.loaders.append('less', {
  test: /\.less$/,
  use: ExtractTextPlugin.extract({
      use: [{
          loader: "css-loader",
      }, {
          loader: "less-loader",
          options: {
            modifyVars: {},
          }
      }],
  })
})

module.exports = environment
