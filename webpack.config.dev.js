const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: "./client/main.ts",
        vendorStyles: "./client/vendor.styles.js",
        vendorScripts: "./client/vendor.scripts.js"
    },
    output: {
        path: path.join(__dirname, "/public/dist"),
        filename: "[name].bundle.js"
    },
    module: {
        "rules": [
            {
                test: /\.html$/,
                use: [{ loader: 'html-loader' }]
            },
            {
                test: /.*client\\app.*\.css$/,
                use: [{ loader: 'raw-loader' }]
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '/fonts',
                        publicPath: '/dist/fonts',

                    }
                }]
            },
            // {
            //     test: /\.css$/,
            //     use: [{ loader: 'raw-loader' }]
            // },
            {
                test: [/.*node_modules.*\.css$/, /.*client\\styles.*\.css$/],
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.ts$/, use: [
                    { 'loader': 'angular2-template-loader' },
                    { 'loader': 'ts-loader' }
                ]
            }
        ]
    },
    devtool: "sourcemap",
    resolve: {
        extensions: [".js", ".ts"]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Popper: ['popper.js', 'default'],
            moment: 'moment',
            _: 'lodash'
        })
    ],
    watch: true
}