/**
 * @file webpack 编译基础配置
 * @date 2019/03/20
 * @author hpuhouzhiqiang@gmail.com
 */

const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const projectRootDir = path.resolve(__dirname, '../');
const PostCompilePlugin = require('webpack-post-compile-plugin');
const TransformModulesPlugin = require('webpack-transform-modules-plugin');

// 获取入口文件List
const entryList = glob.sync(`${projectRootDir}/src/**/entry.js`);
// 创建入口文件的映射关系
const entryListMap = {};

// 获取common下js文件列表
const commonJsList = glob.sync(`${projectRootDir}/src/common/**/*.js`);

// 获取lib下 js文件列表
const libJsList = glob.sync(`${projectRootDir}/src/lib/**/*.js`);


entryList.forEach(item => {
    const filePathArr = item.split('/');
    const dirName = filePathArr[filePathArr.length - 2];

    entryListMap[dirName] = item;
});


// 配置线上环境打包成一个包的 第三方依赖
// entryListMap['vendor'] = [
//     'vue',
//     'vue-router',
//     'axios',
//     'i18next',
//     'fastclick',
//     '@panter/vue-i18next'
// ];


// entryListMap['libjs'] = commonJsList.concat(libJsList);
// entryListMap['libjs'] = [];


module.exports = {
    context: projectRootDir,
    entry: entryListMap,
    output: {
        path: path.resolve(projectRootDir, 'output'),
        filename: 'static/[name].js',
        chunkFilename: 'static/[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                use: 'babel-loader',
                include: [
                    path.resolve(projectRootDir, './src'),
                    path.resolve(projectRootDir, './node_modules/cube-ui')
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ],
        // 使webpack 忽略这些模块的内部依赖解析
        noParse: /jquery|lodash/
    },
    resolve: {
        modules: [
            path.resolve(projectRootDir, 'src'),
            'node_modules'
        ],
        // 可以配置模块引用的别名
        // alias: {utils: path.resolve(__dirname, 'src/utils')},
        // 模块匹配的后缀名 从左到右优先级降低
        extensions: ['.wasm', '.mjs', '.js', '.json', '.vue', '.styl']
    },
    plugins: [
        new VueLoaderPlugin(),
        new WebpackBar(),
        new PostCompilePlugin(),
        new TransformModulesPlugin(),
        new CleanWebpackPlugin()
    ]
};