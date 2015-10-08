module.exports = {
    entry: "./auraapp/app_aura.es6",
    output: {
        path: __dirname,
        filename: "./aurabundle.js"
    },
    module: {
        loaders: [
          {
            test: /\.jsx$|\.es6$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel-loader?optional=runtime']
          }
        ]
    }
};
