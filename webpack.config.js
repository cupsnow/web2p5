const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {

    debug = !["production", "release", "prod"].some(k => k in env);
    console.log((debug ? "development" : "production"), "mode");

    htmlTitle = debug ? 'Development' : 'Released';

    cssExtractLoader = debug ? 'style-loader' : MiniCssExtractPlugin.loader;

    cfgBase = {
        entry: {
            index: './src/index.js',
        },
        devServer: {
            static: './www',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index-template.html',
                filename: 'index.html',
                title: htmlTitle,
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
            }),
        ],
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'www'),
            clean: true,
        },
        optimization: {
            moduleIds: 'deterministic',
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.css$/i,
                    use: [cssExtractLoader, 'css-loader'],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
            ],
        },
        resolve: {
            extensions: ['*', '.js', '.jsx']
        },
    };

    cfgDev = {
        mode: "development",
        devtool: 'inline-source-map',
    };

    cfgProd = {
        mode: "production",
    };

    if (debug) {
        return merge(cfgBase, cfgDev);
    }
    return merge(cfgBase, cfgProd);
};
