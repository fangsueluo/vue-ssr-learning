const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const base = require('./webpack.base.config');

module.exports = merge(base, {
    target: 'node',
    entry: {
        server: path.resolve(__dirname, '../src/entry-server.js')
    },
    devtool: '#source-map',
    externals: [nodeExternals()],
    output: {
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new VueSSRServerPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.ssr.html'),
            filename: 'index.ssr.html',
            files: {
                js: 'client.bundle.js'
            },
            excludeChunks: ['server']
        })
    ]
});