const path = require("path");
const {merge} = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");


/*
  TODO: пока в тупую сделал сборку всех страниц,
   надо будет написать функцию, собирать все .html файлы в /src/pages
 */

const commonConfig = {
    entry: {
        // "./src/index.js",
        login: "./src/pages/login/index.js",
        register: "./src/pages/register/index.js",
        books: "./src/pages/books/index.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            chunks: ["index"],
            // inject: "body"
        }),

        new HtmlWebpackPlugin({
            template: "./src/pages/login/index.html",
            filename: "login.html",
            chunks: ["login"],
            inject: "body"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/register/index.html",
            filename: "register.html",
            chunks: ["register"],
            inject: "body"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/books/index.html",
            filename: "books.html",
            chunks: ["books"],
            inject: "body"
        }),
        new MiniCssExtractPlugin({
            filename: "index.css" // TODO: для дев сервера кеш здесь не рабтает
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "./src/assets",
                    to: "./assets"
                }
            ]
        })
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
        static: "./dist",
        hot: true,
        watchFiles: [
            "./src/index.html",
            "./src/pages/login/index.html",
            "./src/pages/register/index.html",
            "./src/pages/books/index.html"
        ]
    }
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