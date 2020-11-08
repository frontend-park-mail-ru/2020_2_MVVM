const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
 
const publicPath = path.resolve(__dirname, 'public');
const distPath = path.resolve(__dirname, 'dist');
 
module.exports = {
    context: publicPath,
    entry: './js/app.js',
    output: {
        path: distPath,
        publicPath: '',
        filename: 'dist/bundle.js',
    },
    resolve: {
        alias: {
            'Img': path.join(publicPath, '/img'),
            'Js': path.join(publicPath, '/js'),
            'Css': path.join(publicPath, '/css'),
        }
    },
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
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
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
                    {
                        loader: 'sass-loader'
                    },
                ],
 
            },
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
        new HtmlWebpackPlugin({
            inject: true,
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'dist/bundle.css'
        }),
        // new ServiceWorkerWebpackPlugin({
        //     entry: path.join(__dirname, 'src/js/sw.js'),
        // }),
    ],
    devServer: {
        port: 8080,
        historyApiFallback: true
    },
    performance: { hints: false },
}
