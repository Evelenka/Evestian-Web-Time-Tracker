const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');

const SRC_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'dev');

module.exports = {
    entry: {
        'background': path.resolve(__dirname, 'src/background/background.js'),
        'popup': path.resolve(__dirname, 'src/popup/popup.js')
    },
    output: {
        filename: '[name]/[name].js',
        path: BUILD_DIR
    },
    watch: true,
    mode: "development", 
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [["env", {
                        targets: {
                            browsers: ['> 1%']
                        }
                    }]]
                }
            }
        }, {
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader",
                options: {
                    sourceMap: true
                }
            }]
        }]
    },
    plugins: [
        new ChromeExtensionReloader(),
        new CleanWebpackPlugin({
            verbose: true,
            cleanAfterEveryBuildPatterns: [
                '!*/**/*',
                '!manifest.json'
            ]
        }),
        new CopyWebpackPlugin([{
            from: 'manifest.json'
        }, {
            from: 'src/assets/',
            to: 'assets'
        }, {
            from: '_locales/',
            to: '_locales'
        }, {
            from: 'src/popup/popup.html',
            to: 'popup'
        }])
    ],
}