const HtmlPlugin = require("html-webpack-plugin")
const path = require('path')
module.exports = {
	output: {
		path: path.resolve(__dirname, "build")
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"]
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use:
				{
					loader: "babel-loader"
				}

			},
			{
				test: /\.html$/,
				use: {
					loader: "html-loader"
				}

			}
		]
	},
	plugins: [
		new HtmlPlugin({
			filename: "index.html",
			template: "./src/index.html"
		})
	],
	devServer: {
		historyApiFallback: true,
		port: 5000
	}

}
