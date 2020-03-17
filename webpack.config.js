var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry : './app/index.js',
    output : {
        path : path.resolve(__dirname , 'dist'),
        filename: 'index_bundle.js'
    },
    module : {
        rules : [
            {
                test : /\.(js)$/,
                use: [
                    {
                    
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ],
                            plugins: [
                                "@babel/plugin-proposal-class-properties"
                            ]
                        }
                    }
                ]
            },
            {test : /\.css$/, use:['style-loader', 'css-loader']},
        ]
    },
    mode:'development',
    plugins : [
        new HtmlWebpackPlugin ({
            template : 'app/index.html'
        })
    ]

}
