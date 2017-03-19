const webpack = require('webpack')

const AUTOPREFIXER_BROWSERS = [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 31',
    'Explorer >= 9',
    'iOS >= 7',
    'Opera >= 12',
    'Safari >= 7.1',
];

function postcss() {
    return {
        loader: 'postcss-loader',
        options: {
            plugins: () => ([
                require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
            ]),
        },
    }
}

exports.loadStyles = function ({ include, exclude } = {}) {
    const postCss = postcss()

    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include,
                    exclude,
                    use: ['style-loader', 'css-loader', postCss],
                },
                {
                    test: /\.scss/,
                    use: ['style-loader', 'css-loader', 'sass-loader', postCss],
                }
            ],
        },
    };
};

exports.loadJSX = function () {
    return {
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        "presets": ["es2015", "stage-0", "react"]
                    }
                }]
        }
    }
}

exports.devServer = function ({ host, port } = {}) {
    return {
        devServer: {
            historyApiFallback: true,
            hot: true,
            stats: 'errors-only',
            host, // Defaults to `localhost`
            port, // Defaults to 8080
            overlay: {
                errors: true,
                warnings: true,
            },
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
        ],
    };
};
