const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'public'),
    // entry: ['babel-polyfill', './public/js/app.js'],
    entry: './js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: "/"
    },
    resolve: {
        alias: {
            'Img': path.resolve(__dirname, 'public/img'),
            'Js': path.resolve(__dirname, 'public/js'),
            'Css': path.resolve(__dirname, 'public/css')
        }
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
            {

                test: /\.scss$/,

                use: [

                    {loader: MiniCssExtractPlugin.loader},

                    {loader: 'css-loader'},

                    {

                        loader: 'postcss-loader',

                    },

                    {loader: 'sass-loader'},

                ],

            },
            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            // },
            {
                test: /\.css$/,
                use: ['css-loader'],
            },
            {
                test: /\.xml$/,
                loader: 'fest-webpack-loader'

            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images',
                    }
                }]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({inject: true, template: './index.html'}),
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        }),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, './public/js/sw.js'),
        }),
    ],
    devServer: {
        port: 3000,
        historyApiFallback: true
    },
    performance: { hints: false },
}