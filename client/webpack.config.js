const path = require("path");
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OIMO = require("oimo");
const webpack = require("webpack");

// App directory
const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(appDirectory, "public"),
        compress: true,
        hot: true,
        publicPath: '/',
        open: true,
    },
    entry: path.resolve(appDirectory, "src/Client.ts"),

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(appDirectory, "public/index.html"),
        }),
        new webpack.ProvidePlugin({
            'OIMO' : 'OIMO'
        })
    ],

    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'public')
    }
}