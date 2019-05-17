/**
 * @file webpack 生产环境配置文件
 * @date 2019/03/19
 * @author hpuhouzhiqiang@gmail.com
 */
const path = require('path');
const glob = require('glob');
const webpackBaseConfig = require('./webpack.config.base');
// const PrerenderSPAPlugin = require('prerender-spa-plugin');
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

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
const indexTemplateList = glob.sync(`${projectRootDir}/src/routes/!(index.html)`);
const htmlWebpackPluginList = [];

// 配置cdn域名
const cdnPath = ``;

// 获取docker环境变量
const dockerEnv = process.env.dockerdev;

// 开启 bundle analyzer
// webpackProductPlugin.push(new bundleAnalyse());

indexTemplateList.forEach(item => {
    const filename = item.substring(item.lastIndexOf('/') + 1);

    htmlWebpackPluginList.push(new htmlWebpackPlugin({
        template: path.resolve(projectRootDir, 'src/routes/index.html'),
        // 不加 .. 会输出到static目录下
        filename: `../${filename}/${filename}.html`,
        inject: 'body',
        // 配置网站的 facicon
        // favicon: path.resolve(projectRootDir, 'src/common/img/favicon.ico'),
        // 配置注入页面的chunk 多入口是根据entry配置的多入口来命名的
        chunks: ['runtime', 'vendor', filename],
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

// 开启 bundle analyzer
// webpackProductPlugin.push(new bundleAnalyse());

webpackProductPlugin.push(new InlineManifestWebpackPlugin());

// webpackProductPlugin.push(new PrerenderSPAPlugin({
//     staticDir: path.join(__dirname, '../output'),

//     // Optional - The path your rendered app should be output to.
//     // (Defaults to staticDir.)
//     outputDir: path.join(__dirname, 'prerendered'),

//     // Optional - The location of index.html
//     indexPath: path.resolve(projectRootDir, 'output/balance_qa/balance_qa.html'),

//     // Required - Routes to render.
//     routes: ['/balance_qa/balance_qa.html'],
//     renderer: new Renderer({
//         // Optional - The name of the property to add to the window object with the contents of `inject`.
//         // injectProperty: '__PRERENDER_INJECTED',
//         // Optional - Any values you'd like your app to have access to via `window.injectProperty`.
//         // inject: {foo: 'bar'},

//         // Optional - defaults to 0, no limit.
//         // Routes are rendered asynchronously.
//         // Use this to limit the number of routes rendered in parallel.
//         // maxConcurrentRoutes: 4,
//         postProcess(renderedRoute) {
//         // add CDN

//             // console.log('**************renderedRoute***************');
//             // console.log(renderedRoute.html);
//             // console.log('*******************************');
//             // renderedRoute.html = renderedRoute.html.replace(
//             //     /(<script[^<>]*src=\")((?!http|https)[^<>\"]*)(\"[^<>]*>[^<>]*<\/script>)/ig,
//             //     `$1${cdnPath}$2$3`
//             // ).replace(
//             //     /(<link[^<>]*href=\")((?!http|https)[^<>\"]*)(\"[^<>]*>)/ig,
//             //     `$1${cdnPath}$2$3`
//             // );

//             return renderedRoute;
//         },

//         // Optional - Wait to render until the specified event is dispatched on the document.
//         // eg, with `document.dispatchEvent(new Event('custom-render-trigger'))`
//         renderAfterDocumentEvent: 'page-dom-mounted',

//         // Optional - Wait to render until the specified element is detected using `document.querySelector`
//         // renderAfterElementExists: 'my-app-element',

//         // Optional - Wait to render until a certain amount of time has passed.
//         // NOT RECOMMENDED
//         // renderAfterTime: 5000, // Wait 5 seconds.

//         // Other puppeteer options.
//         // (See here: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions)
//         headless: false // Display the browser window when rendering. Useful for debugging.
//     })
// }));

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


const outputConf = {
    path: path.resolve(projectRootDir, 'output/static'),
    filename: 'js/[name]_[chunkhash:7].js',
    chunkFilename: 'js/[name]_[chunkhash:7].js',
    // publicPath: cdnPath,
    crossOriginLoading: 'anonymous'
};

if (dockerEnv && dockerEnv === 'testenv') {
    delete outputConf['publicPath'];
}

Object.assign(webpackProducConfig, webpackBaseConfig, {
    output: outputConf,
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
                // libs: {
                // css 文件不拆分
                //  test: /\.m?js$/,
                //     name: 'libs',
                //     minChunks: 2,
                //     priority: -20,
                //     reuseExistingChunk: true
                // },
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
