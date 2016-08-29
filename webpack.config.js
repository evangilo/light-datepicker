var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: "./src/scripts",
    devtool: "source-map",
    output: {
        path: `${__dirname}/dist`,
        filename: "datepicker.min.js",
        watch: true,
        libraryTarget: "var",
        library: 'datepicker'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new ExtractTextPlugin("datepicker.min.css")
    ]
};

