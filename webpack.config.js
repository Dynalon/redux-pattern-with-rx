var path = require('path');

module.exports = {
    target: 'web',
    entry: "main.js",
    resolve: {
        root: path.resolve('./dist/'),
        extensions: ['', '.json', '.js']
    },
    output: {
        path: __dirname + '/dist/bundle/',
        filename: 'rxjs-redux.js',

        // will be the global variable that the autobahn.js file exports to
        library: 'RxJSRedux',
        libraryTarget: 'umd'
    }
};
