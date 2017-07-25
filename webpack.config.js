/* eslint-env node */

var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: {
        firstChunk: "./src/firstChunk",
        secondChunk: "./src/secondChunk",
    },

    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
    },
    module: {
        rules: [
            { test: /\.css$/, use: "css-loader" },
        ],
    },

    devtool: "source-map",

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
			// The order of this array matters
			names: ["common"],
			minChunks: 2
		})
    ],
};