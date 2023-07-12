const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const StyleLintPlugin = require('stylelint-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.ts|tsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
      },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: "./src/index.html"
            }
        ),
        new TerserWebpackPlugin(),
        new StyleLintPlugin(),
        new Dotenv({
            path: './.local.env'
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin(),
            new CssMinimizerPlugin()            
        ]
    }
}