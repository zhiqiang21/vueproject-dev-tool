/**
 * @file webpack 生产环境配置文件
 * @date 2019/03/19
 * @author hpuhouzhiqiang@gmail.com
 */
const path = require('path');
const glob = require('glob');
const webpackBaseConfig = require('./webpack.config.base');

const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

const htmlWebpackPlugin = require('html-webpack-plugin');
// 将css拆成单独的文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 将css文件压缩
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 压缩js文件
const TerserPlugin = require('terser-webpack-plugin');

// build开启gzip压缩
const CompressionPlugin = require('compression-webpack-plugin');
const bundleAnalyse = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const projectRootDir = path.resolve(__dirname, '../');
const indexTemplateList = glob.sync(`${projectRootDir}/src/routes/**/*.html`);
const htmlWebpackPluginList = [];

// 开启 bundle analyzer
// webpackProductPlugin.push(new bundleAnalyse());

indexTemplateList.forEach(item => {
    const filename = item.substring(item.lastIndexOf('/') + 1);
    const fileTag = filename.substring(0, filename.lastIndexOf('.'));

    htmlWebpackPluginList.push(new htmlWebpackPlugin({
        title: 'passenger-wallet',
        template: path.resolve(projectRootDir, item),
        filename: `../${fileTag}/${filename}`,
        inject: 'body',
        // 配置注入页面的chunk 多入口是根据entry配置的多入口来命名的
        chunks: ['runtime', 'vendor', 'libs', fileTag],
        minify: {
            // 对大小写是否敏感
            caseSensitive: true,
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true
        }
    }));
});
const webpackProducConfig = {};

const webpackProductPlugin = webpackBaseConfig.plugins.concat(htmlWebpackPluginList);

webpackProductPlugin.push(new InlineManifestWebpackPlugin());

// 拆分css进入单独的文件
webpackProductPlugin.push(new MiniCssExtractPlugin({
    filename: 'css/[name]_[contenthash:7].css',
    chunkFilename: 'css/[name]_[contenthash:7].css'
}));


webpackProductPlugin.push(new CompressionPlugin({ // gzip 压缩
    // asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: new RegExp(
        '\\.(js|css)$' // 压缩 js 与 css
    )
}));


const webpackProductRule = webpackBaseConfig.module.rules.concat([
    {
        test: /\.(gif|png|jpe?g)(\?\S*)?$/,
        use: [{
            loader: 'url-loader',
            // 单位是 Byte，当文件小于 8KB 时作为 DataURL 处理
            options: {
                limit: 8192,
                name: 'img/[name]_[hash:6].[ext]'
            }
        }]
    },
    {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [{
            loader: 'file-loader',
            options: {name: 'fonts/[name]_[hash:6].[ext]'}
        }]
    },
    {
        test: /\.styl(us)?$/,
        include: [
            path.resolve(projectRootDir, './src'),
            path.resolve(projectRootDir, './node_modules')
        ],
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                // you can specify a publicPath here
                // by default it use publicPath in webpackOptions.output
                // publicPath: '../'
                options: {}
            },
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

Object.assign(webpackProducConfig, webpackBaseConfig, {
    output: {
        path: path.resolve(projectRootDir, 'output/static'),
        filename: 'js/[name]_[chunkhash:7].js',
        chunkFilename: 'js/[name]_[chunkhash:7].js',
        publicPath: `//static.didiglobal.com/global/passenger-wallet/static/`,
        crossOriginLoading: 'anonymous'
    },
    module: {rules: webpackProductRule},
    plugins: webpackProductPlugin,
    optimization: {
        minimize: true,
        minimizer: [
            new OptimizeCSSAssetsPlugin(),
            new TerserPlugin({terserOptions: {output: {comments: false} } })
        ],
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            automaticNameDelimiter: '.',
            name: undefined,
            cacheGroups: {
                default: false,
                vendors: false,
                libs: {
                    name: 'libs',
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
                vendor: {
                    chunks: 'initial',
                    test: path.resolve(__dirname, '../node_modules'),
                    name: 'vendor', // 使用 vendor 入口作为公共部分
                    enforce: true
                }
            }
        }
    }
});


module.exports = webpackProducConfig;