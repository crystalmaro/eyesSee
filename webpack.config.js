const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'main.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				// loader: 'babel-loader'
				use: {
					loader: 'babel-loader',
					options: {
							// presets: ['@babel/preset-env','@babel/react'],
							// plugins: [
							// 	'@babel/proposal-class-properties',
							// 	'@babel/plugin-proposal-object-rest-spread',
							// 	'@babel/plugin-syntax-dynamic-import',
							//  '@babel/plugin-proposal-class-properties' // added Jan 2021
							// ]
					}
				}
			},
			{
				test: /\.css$/i,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader', options: { modules: false } } ]
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					'file-loader',
					{
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true, // webpack@1.x
							disable: true, // webpack@2.x and newer
						}
					}
				]
			}
		]
	},
	devServer: {
		contentBase: './public'
	}
};
