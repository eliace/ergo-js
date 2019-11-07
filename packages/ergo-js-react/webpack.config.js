const path = require('path')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        app: './src/index.js'
    },
    output: {
        library: 'chorda-react',
        libraryTarget: 'umd',
        filename: 'chorda-react.js'    
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime']
                }
            }
        }]
    },
    plugins: [],
    resolve: {
        alias: {
            'chorda-core': path.resolve('../ergo-js-core/src')
        }    
    },
    externals: {
        'chorda-core': 'chorda-core',
        'react': 'react',
        'create-react-class': 'create-react-class',
        'react-dom': 'react-dom'
    }
}