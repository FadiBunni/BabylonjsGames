const path = require("path");

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',

    entry: './Client.ts',

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    },

    optimization: {
        minimize: false,
    },

    externals: {
        oimo: 'OIMO', //or true
    },

    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'public')
    }
}