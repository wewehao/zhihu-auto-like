/*
 * @Author: weiwenhao
 * @Date: 2021-07-19 19:54:42
 * @LastEditTime: 2021-11-01 10:46:06
 * @LastEditors: weiwenhao
 * @Description:
 * @FilePath: /lpextension/config-overrides.js
 * If you have any questions please @weiwenhao.
 */
const { override, addLessLoader, fixBabelImports, disableChunk } = require("customize-cra");
const path = require('path');
const paths = require('react-scripts/config/paths');
const globby = require('globby');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// 获取指定路径下的入口文件
function getEntries() {
    const entriesPath = globby.sync([path.join(path.dirname(paths.appBuild), 'src/component') + '/*/app.js']);
    const entries = {};
    entriesPath.forEach(filePath => {
        let tmp = filePath.split('/');
        let name = tmp[tmp.length - 2];

        if (!(process.env.BASE_ENV === 'production' && name === 'develop') && name !== 'preview') {
            entries[name] = [
                filePath,
            ];
        }
    });
    return entries;
}

const pageEntries = getEntries();
const extensionEntries = {
    'background': './src/background.js',
    'content': './src/content.js',
};

module.exports = override(
    disableChunk(),
    fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: 'es',
        style: 'css',
    }),
    addLessLoader(),
    config => {
        config.plugins = config.plugins.filter(
            p => p.constructor.name !== "ManifestPlugin"
        );
        return config;
    },
    config => {
        config.devtool = false
        config.entry = {
            ...pageEntries,
            ...extensionEntries,
        };
        config.output.filename = 'static/js/[name].js';

        if (process.env.BASE_ENV === 'production') {
            config.plugins.push(new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        drop_console: true,
                    }
                }
            }));
        }
        return config
    },
    config => {
        // 修改 HtmlWebpackPlugin 插件
        for (let i = 0; i < config.plugins.length; i++) {
            let item = config.plugins[i];
            if (item.constructor.name === 'HtmlWebpackPlugin') {
                config.plugins.splice(i, 1);
            }
        }
        const htmlPlugin = Object.keys(pageEntries).map(item => {
            return new HtmlWebpackPlugin({
                inject: true,
                template: paths.appHtml,
                filename: item + '.html',
                chunks: [item],
            });
        });
        config.plugins.push(...htmlPlugin);
        config.plugins.push(new webpack.DefinePlugin({
            'process.env.BASE_ENV': `"${process.env.BASE_ENV}"`,
        }));
        return config;
    },
);