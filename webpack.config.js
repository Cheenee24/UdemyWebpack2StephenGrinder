const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        /**
         * publicPath: this is important to all the build file
         * specially in the separate build images.
         * This will prepend all the build file path
         */
        publicPath: 'build/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    loader: 'css-loader'
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        /**
                         * option limit: every images that 40000 kb larger 
                         * will not be include in the bundle.js, 
                         * it will build in a separate hash image file
                         */
                        options: { limit: 40000 }
                    },
                    'image-webpack-loader'
                ]
            }

        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ]

};


module.exports = config;
