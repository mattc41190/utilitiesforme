var path = require('path');

module.exports = {
    entry: './utilities_for_me/web_app/client/react/index.js',
    output: {
        path: path.resolve(__dirname, 'utilities_for_me/web_app/static'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js|\.jsx$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    mode: 'development',
    watchOptions: {
        ignored: 'node_modules/**'
    },
    watch: true
}