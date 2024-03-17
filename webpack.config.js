const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {

    debug = !["production", "release", "prod"].some(k => k in env);
    console.log((debug ? "development" : "production"), "mode");

    cfgBase = {
        entry: {
            index: './src/index.js',
        },
        devServer: {
            static: './dist',
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Development',
            }),
        ],
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
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
                    use: ['style-loader', 'css-loader'],
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
