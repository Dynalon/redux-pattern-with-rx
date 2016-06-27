var path = require('path');

module.exports = {
    target: 'web',
    entry: "main.js",
    resolve: {
        root: path.resolve('./src/'),
        extensions: ['', '.json', '.js']
    },
    output: {
        path: __dirname + '/dist/',
        filename: 'bundle.js',

        // will be the global variable that the autobahn.js file exports to
        library: 'ReduxPatternWithRx',
        libraryTarget: 'umd'
    }
};
