const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        app: './index.js'
    },
    devServer: {
         contentBase: './dist',
         hot: true,
         port: 1234
    },    
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
        }, {
            test: /\.s[ac]ss$/i,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader'
            ]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                'file-loader'
            ]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/transform-runtime']
                }
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './realworld.html'
        })
    ],
    resolve: {
        alias: {
            'chorda-core': path.resolve('../ergo-js-core/src'),
            'chorda-react': path.resolve('../ergo-js-react/src'),
        }
    }
}