var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js'
    },
    plugins: [new HtmlWebpackPlugin({
        hash: true,
        title: 'Lit Side Navigation',
        myPageHeader: 'Lit Side Navigation',
        template: './src/index.html',
        filename: '../demo/index.html' //relative to root of the application
    })],
    devServer: {
        //contentBase: path.join(__dirname, ''),
        writeToDisk: true,
        open: true,
        openPage: '../demo/index.html',
        watchContentBase: true,
        hotOnly: true
    },
    watchOptions: {
        poll: 1000 // Check for changes every second
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};