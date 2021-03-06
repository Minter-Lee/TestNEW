var path = require('path');
var webpack = require('webpack');

/**==--插件定义--Start==**/

//设定公共JS提取器--自动提取公共部分JS
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('./app/scripts/common.js');


/**==--插件定义--End==**/

module.exports = {
	//插件集
	//plugins: [commonsPlugin],
	context: path.resolve(__dirname, 'app'),
	//页面入口文件
	entry: {
		index: './scripts/index.js'
	},
	//入口文件输出配置
	output: {
		// path: 'dist/js/page',
		// filename: '[name].js'
		filename: './app/scripts/bundle.js'
	},

	resolve: {
		modulesDirectories: ['./app', 'node_modules'],
		alias: {
			'mn': 'backbone.marionette',
			'_': 'underscore',
			'moxie': 'scripts/plugins/plupload/moxie',
			'moxie-plupload': 'scripts/plugins/plupload/plupload.dev'
		}
	},
	module: {
		preloaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'jshint-loader' //js检查
		}],

		//加载器配置
		loaders: [{
			test: /\.css$/,
			loader: 'style-loader!css-loader' //CSS注入和语法
		}, {
			test: /\.js$/,
			loader: 'jsx-loader?harmony' //js文件使用jsx处理--react使用？
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url-loader?limit=8192' //图片文件小于8K，直接转码base64
		}, {
			test: /\.html$/,
			loader: 'html-loader'	//将html转为String
		},{
			test: /moxie\-plupload/,
			loader: 'imports?mOxie=moxie!exports?window.plupload'
		}, {
			test: /moxie/i,
			loader: 'imports?this=>window!exports?this.mOxie'
		}]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: './app/scripts/[name].min.js',
			minChunk: 2
		}),
		//全局环境下
		new webpack.ProvidePlugin({
			mOxie: 'moxie',
			$: "jquery"
		})

	]
}
