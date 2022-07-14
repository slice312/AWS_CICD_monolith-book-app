const path = require("path");
const {merge} = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const commonConfig = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.[contenthash].js",
        path: path.resolve(__dirname, "./build"),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: "body"
        }),
        new MiniCssExtractPlugin({
            filename: "index.css" // TODO: для дев сервера кеш здесь не рабтает
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(sass|scss|css)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource"
            }
        ]
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};


const prodConfig = {
    mode: "production"
};


const devConfig = {
    mode: "development",
    devtool: "source-map",
    devServer: {
        port: 5007,
        static: "./build",
        hot: true,
        historyApiFallback: true,
        watchFiles: [
            "./src/index.html"
        ]
    },
};


module.exports = (env, argv) => {
    switch (argv.mode) {
        case "development":
            return merge(commonConfig, devConfig);
        case "production":
            return merge(commonConfig, prodConfig);
        default:
            throw new Error("No matching configuration was found!");
    }
};