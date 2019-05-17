/**
 * @file webpack本地开发环境基础配置
 * @date 2019/03/20
 * @author hpuhouzhiqiang@gmail.com
 */
const webpack = require('webpack');
const glob = require('glob');
const webpackBaseConfig = require('./webpack.config.base');
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const projectRootDir = path.resolve(__dirname, '../');
const localDevPort = 8081;

// 获取src/routes 目录下页面目录
const indexTemplateList = glob.sync(`${projectRootDir}/src/routes/!(index.html)`);

const htmlWebpackPluginList = [];


console.log('************* start 本地调试页面访问的url ****************');
indexTemplateList.forEach(item => {
    const filename = item.substring(item.lastIndexOf('/') + 1);

    console.log(`http://127.0.0.1:${localDevPort}/${filename}/${filename}.html`);

    htmlWebpackPluginList.push(new htmlWebpackPlugin({
        chunks: [filename],
        template: path.resolve(projectRootDir, 'src/routes/index.html'),
        filename: `${filename}/${filename}.html`,
        inject: 'body'
    }));
});

console.log('**************  end 本地调试页面访问的url *****************');

const webpackDevRule = webpackBaseConfig.module.rules.concat([
    {
        test: /\.(gif|png|jpe?g)(\?\S*)?$/,
        use: [{
            loader: 'url-loader',
            // 单位是 Byte，当文件小于 8KB 时作为 DataURL 处理
            options: {
                limit: 8192,
                name: '[name].[ext]'
            }
        }]
    }, {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [{
            loader: 'file-loader',
            options: {name: '[name].[ext]'}
        }]
    },
    {
        test: /\.styl(us)?$/,
        include: [
            path.resolve(projectRootDir, './src'),
            path.resolve(projectRootDir, './node_modules')
        ],
        use: [
            'vue-style-loader',
            {
                loader: 'css-loader',
                options: {importLoaders: 2}
            },
            'postcss-loader',
            {
                loader: 'stylus-loader',
                // 字体文件找不到的问题
                options: {'resolve url': true}
            }
        ]
    }
]);

const webpackDevConfig = {};
const webpackDevPlugins = webpackBaseConfig.plugins.concat([
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({'process.env.NODE_ENV': '"development"'})
].concat(htmlWebpackPluginList));

Object.assign(webpackDevConfig, webpackBaseConfig, {
    module: {rules: webpackDevRule},
    devtool: 'eval-source-map',
    devServer: {
        port: localDevPort,
        // 开启模块热重载
        hot: true,
        host: '0.0.0.0'
    },
    plugins: webpackDevPlugins
});


module.exports = webpackDevConfig;