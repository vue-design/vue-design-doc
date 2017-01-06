/**
 * Created by denghm on 2016/9/14.
 */
var webpack = require('webpack');
var config = require('./webpack.base.config.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var fs = require('fs');

config.devtool = '#source-map';                             // source-map
config.output.publicPath = '';                        // 资源路径
config.output.filename = '../dist/assets/[name].js';                       // 入口js命名
config.output.chunkFilename = '../dist/assets/[name].js';            // 路由js命名

config.vue = {
    loaders: {
        css: ExtractTextPlugin.extract(
            "style-loader",
            "css-loader?sourceMap",
            {
                publicPath: "assets/"
            }
        ),
        less: ExtractTextPlugin.extract(
            'vue-style-loader',
            'css-loader!less-loader'
        ),
        sass: ExtractTextPlugin.extract(
            'vue-style-loader',
            'css-loader!sass-loader'
        )
    }
};

config.plugins = (config.plugins || []).concat([
    new ExtractTextPlugin("assets/[name].css",{ allChunks : true,resolve : ['modules'] }),             // 提取CSS
    new webpack.optimize.CommonsChunkPlugin('vendors', '../dist/assets/vendors.js'),                           // 提取第三方库
    new HtmlWebpackPlugin({                                                                     // 构建html文件
        title: "vue-design文档",
        filename: './index.html',
        template: './src/template/index.ejs',
        inject: 'body'
    })
]);

// 写入环境变量
fs.open('./src/config/env.js', 'w', function (err, fd) {
    var buf = 'export default "development";';
    fs.write(fd,buf,0,buf.length,0,function(err,written,buffer){});
});

module.exports = config;