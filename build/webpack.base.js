/**
 * @file webpack 编译基础配置
 * @date 2019/03/20
 * @author hpuhouzhiqiang@didiglobal.com
 */

const path = require('path');
const webpack = require('webpack');

// TODO: clean-webpack-plugin

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const projectRootDir = path.resolve(__dirname, '../');


module.exports = {
    context: projectRootDir,
    entry: path.resolve(projectRootDir, 'src/main.js'),
    output: {
        filename: '[name].js',
        path: path.resolve(projectRootDir, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',
                include: [
                    path.resolve(projectRootDir, 'src')
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {}
                }]
            },
            {
                test: /\.styl(us)?$/,
                include: [
                    path.resolve(projectRootDir, 'src')
                ],
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {importLoaders: 2}
                    },
                    'postcss-loader',
                    'stylus-loader'
                ]
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
        // 模块匹配的后缀名 从做到有优先级降低
        extensions: ['.wasm', '.mjs', '.js', '.json', '.vue', '.styl']
    },
    plugins: [
        new webpack.DefinePlugin({'process.env.NODE_ENV': '"development"'}),
        new VueLoaderPlugin()
    ]
};