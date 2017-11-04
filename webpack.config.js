// webpack.config.js
const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCSS = new ExtractTextPlugin('[name].css');
const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    allChunks : true
});

module.exports = {
    entry: {
        app :  './public/js/app.js',
        vendor : [ 'angular', 'angular-ui-router', 'angular-ui-bootstrap', "angular-ui-grid",  "lodash"]
    },
    output: {
        path: __dirname + "/public/dist",
        filename: 'bundle.[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: "ng-cache-loader?prefix=[dir]/[dir]"
            },
            {
               test: /(\.scss|\.css)$/,
                use : extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.js$/,
                use: [
                    { loader: 'ng-annotate-loader' },
                    { loader: 'babel-loader' },
                ],
                exclude : /node_modules/
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath:  "/fonts/",
                        publicPath: "./" // where the fonts will go
                    }
                }]
            }

        ]
    },
    plugins : [
        new UglifyJSPlugin({
            sourceMap:true
        }),
        extractSass,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            children: true,
            minChunks: (module) => {
                if (/node_modules/.test(module.resource) || /vendor/.test(module.resource)) {
                    console.log('Vendor: ', module.resource);
                    return true
                }
                return false;
            }
        })
    ],
    devtool: '#inline-source-map'
};
