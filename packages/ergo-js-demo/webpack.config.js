const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        app: './app.js'
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
        }/*, {
            enforce: 'pre',
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
            options: {

            }
        }*/, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }, {
            test: /\.md$/,
            use: [
                {
                    loader: "html-loader"
                },
                {
                    loader: "highlight-loader"
                },
                {
                    loader: "markdown-loader",
                    options: {
                        /* your options here */
                    }
                }
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    resolve: {
        alias: {
            'chorda-core': path.resolve('../ergo-js-core/src'),
            'chorda-react': path.resolve('../ergo-js-react/src'),
            'chorda-bulma': path.resolve('../ergo-js-bulma/src')
        }
    }
}