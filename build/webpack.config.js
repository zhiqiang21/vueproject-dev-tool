/**
 * @file webpack 生产环境配置文件
 * @date 2019/03/19
 * @author hpuhouzhiqiang@didiglobal.com
 */
const path = require('path');
const webpack = require('webpack');
const webpackBaseConfig = require('./webpack.base');
// const UglifyPlugin = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
// 将css拆成单独的文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 将css文件压缩
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const projectRootDir = path.resolve(__dirname, '../');
const webpackProducConfig = {};

const webpackProductPlugin = webpackBaseConfig.plugins.concat([
    new htmlWebpackPlugin({
        title: 'passenger-wallet',
        template: path.resolve(projectRootDir, './src/index.html'),
        filename: 'index.html',
        inject: 'body',
        // 压缩模板html中的内容
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true
        }
    })
]);

const webpackProductRule = webpackBaseConfig.module.rules.concat([
    {
        test: /\.(png|jpg|gif)$/,
        use: [{
            loader: 'url-loader',
            // 单位是 Byte，当文件小于 8KB 时作为 DataURL 处理
            options: {limit: 8192}
        }]
    }
]);

Object.assign(webpackProducConfig, webpackBaseConfig, {
    module: {rules: webpackProductRule},
    plugins: webpackProductPlugin,
    optimization: {splitChunks: {chunks: 'all'} }
});

module.exports = webpackProducConfig;