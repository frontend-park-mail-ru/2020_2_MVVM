const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './public/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        alias: {
            Img: path.resolve(__dirname, 'public/img'),
            Js: path.resolve(__dirname, 'public/js'),
            Css: path.resolve(__dirname, 'public/css'),
        },
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: 'css-loader'},
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'autoprefixer',
                                    ],
                                ],
                            },
                        }
                    },
                    {loader: 'sass-loader'},
                ],
            },
            {
                test: /\.css$/,
                use: ['css-loader'],
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
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.xml$/,
                loader: 'fest-webpack-loader',
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
        }),
        // new ServiceWorkerWebpackPlugin({
        //     entry: path.resolve(__dirname, 'public/js/sw.js'),
        //     options: {
        //         scope: '/',
        //     },
        // }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            base: '/dist/',
        }),
    ],
    devServer: {
        port: 8080,
        historyApiFallback: true
    },
    performance: { hints: false },
};