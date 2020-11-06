const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // entry: ['babel-polyfill', './public/js/app.js'],
    entry: './public/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            // },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.xml$/,
                loader: 'fest-webpack-loader'

            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({inject: true, template: 'public/index.html'}),
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        }),
        // new ServiceWorkerWebpackPlugin({
        //     entry: path.join(__dirname, 'src/js/sw.js'),
        // }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000
    },
    performance: { hints: false },
}