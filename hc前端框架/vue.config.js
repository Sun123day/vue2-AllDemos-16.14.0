const getProxy = require('./proxyConfig')
const defaultSettings = require('./src/settings.js')
const path = require('path')
const resolve = (dir) => {
    return path.join(__dirname, dir)
}
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']

module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: false,
    productionSourceMap: false,
    devServer: {
        hot: true,
        open: true,
        overlay: {
            warnings: false,
            errors: true,
        },
        proxy: getProxy,
    },
    configureWebpack: {
        name: defaultSettings.title,
        resolve: {
            alias: {
                '@': resolve('src'),
            },
        },
        plugins: [
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8,
            }),
        ],
    },
    chainWebpack(config) {
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach((item) => {
            item.use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    resources: ['./src/styles/variables.scss'],
                })
                .end()
        })

        config.plugin('preload').tap(() => [
            {
                rel: 'preload',
                fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
                include: 'initial',
            },
        ])
        config.plugins.delete('prefetch')
        config.module.rule('svg').exclude.add(resolve('src/icons')).end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]',
            })
            .end()
        config.when(process.env.NODE_ENV !== 'development', (config) => {
            config
                .plugin('ScriptExtHtmlWebpackPlugin')
                .after('html')
                .use('script-ext-html-webpack-plugin', [
                    {
                        // `runtime` must same as runtimeChunk name. default is `runtime`
                        inline: /runtime\..*\.js$/,
                    },
                ])
                .end()
            config.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial', // only package third parties that are initially dependent
                    },
                    elementUI: {
                        name: 'chunk-elementUI', // split elementUI into a single package
                        priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                        test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
                    },
                    commons: {
                        name: 'chunk-commons',
                        test: resolve('src/components'), // can customize your rules
                        minChunks: 3, //  minimum common number
                        priority: 5,
                        reuseExistingChunk: true,
                    },
                },
            })
            config.optimization.runtimeChunk('single')
        })
    },
    css: {
        extract: false, // false热加载
        sourceMap: false,
        loaderOptions: {},
    },
}
