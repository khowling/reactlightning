var util = require('util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require(process.argv[2] || './webpack.config');
var opn = require('opn');

var pkg = require('./package.json');
var port = pkg.config.devPort,
    host = pkg.config.devHost,
    https = pkg.config.devHttps,
    serverurl = util.format('http%s://%s:%d', https ? 's' : '', host, port);

config.entry.app.unshift('webpack/hot/only-dev-server');
config.entry.app.unshift(util.format('webpack-dev-server/client?%s', serverurl));
config.plugins.push(new webpack.HotModuleReplacementPlugin());
console.log (JSON.stringify(config));

var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
    publicPath: config.output.publicPath,
    https: https,
    hot: true
}).listen(port, host, function (err, result) {
        if (err) {
            console.log(err);
        }
        var url = util.format('http%s://%s:%d', https ? 's' : '', host, port);
        console.log('Listening at %s', url);
        opn(url);
    });
