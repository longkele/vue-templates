/* eslint-disable */
const path = require('path');
const MonacoEditorPlugin = require('monaco-editor-webpack-plugin');

let host = {
    test: 'xxx.com:8090/',
    lss: 'http://feitian-test.bcc-bdbl.baidu.com:8221',
}
let devPort = '8001';

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

function addStyleResource (rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: resolve('src/assets/css/variable.less'),
            injector: 'append'
        })
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/static/' : '',
    productionSourceMap: false,
    devServer: {
        disableHostCheck: true,
        contentBase: path.join(__dirname, 'dist'),
        port: devPort,
        proxy: {
            '/material/*': {
                target: host.lss,
                secure: false,
                changeOrigin: true,
                headers: {
                    host: 'feitian-test.bcc-bdbl.baidu.com'
                }
            }
        }
    },
    configureWebpack: {
        module: {
            rules: [
            ],
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': resolve('src'),
                '~': resolve('node_modules')
            },
            symlinks: false
        },
        plugins: [
            new MonacoEditorPlugin({
                // https://github.com/Microsoft/monaco-editor-webpack-plugin#options
                languages: ['javascript', 'css', 'html', 'typescript', 'json']
            }),
        ]
    },
    chainWebpack: config => {
        // 为所有的vue单文件中的less，默认添加全局文件variable.less；
        const types = ['vue'];

        types.forEach(type => 
            config.module.rule('less').oneOf(type)
                .use('style-resource')
                .loader('style-resources-loader')
                .options({
                    patterns: resolve('src/assets/css/variable.less'),
                    injector: 'append'
                })
        );

        // 设置入口html
        if (process.env.NODE_ENV === 'production') {
            config
                .plugin('html')
                .tap(args => {
                    args[0].filename = './index.tpl'
                    args[0].template = './public/index.html'
                    return args
                })
        } else {
        }
        config.plugins.delete('prefetch');
    }
}
