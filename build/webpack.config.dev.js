/**
 * @file webpack本地开发环境基础配置
 * @date 2019/03/20
 * @author hpuhouzhiqiang@didiglobal.com
 */
const webpack = require('webpack');
const webpackBaseConfig = require('./webpack.base');
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// TODO: webpack-bundle-analyzer

const projectRootDir = path.resolve(__dirname, '../');


const webpackDevConfig = {};
const webpackDevPlugins = webpackBaseConfig.plugins.concat([
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new htmlWebpackPlugin({
        title: 'passenger-wallet',
        template: path.resolve(projectRootDir, './src/index.html'),
        filename: 'index.html',
        inject: 'body'
    })
]);

Object.assign(webpackDevConfig, webpackBaseConfig, {
    devServer: {
        port: 8080,
        // 开启模块热重载
        hot: true
        // 配置静态文件访问路径相关
        // publicPath: '',
        // proxy: {
        //     '/api': {
        //         // 将 URL 中带有 /api 的请求代理到本地的 3000 端口的服务上
        //         target: 'http://localhost:3000',
        //         // 把 URL 中 path 部分的 `api` 移除掉
        //         pathRewrite: {'^/api': ''}
        //     }
        // }
    },
    plugins: webpackDevPlugins
});


module.exports = webpackDevConfig;