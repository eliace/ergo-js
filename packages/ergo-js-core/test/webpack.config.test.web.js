const path = require('path')
const config = require('../webpack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

config.devServer = {
  host: 'localhost',
  port: '1234',
  hot: true
}
 
const index = path.resolve(__dirname, './index.js')
 
config.entry = {
  test: [`mocha-loader!${index}`]
}

config.plugins.push(
    new HtmlWebpackPlugin({
    })
)

 
//config.output.publicPath = 'http://localhost:1234/'
 
module.exports = config