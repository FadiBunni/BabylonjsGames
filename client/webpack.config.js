const path = require("path");

module.exports = {
    entry: './src/client.ts',
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'public')
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    devtool: 'source-map',

    mode: 'development',

    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    }
}