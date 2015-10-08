var os = require('os');
var path = require('path');
var gulp = require('gulp');
var gutil = require("gulp-util");
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var zip = require ("gulp-zip");
var replace = require('gulp-replace');
var exec = require('child_process').exec;
var watch = require('gulp-watch');


var pkg = require('./package.json');
var buildDir = pkg.config.buildDir,
    pageName = pkg.name + (pkg.version.replace(new RegExp('\\.', 'g'), ''));

function string_src(filename, string) {
    var src = require('stream').Readable({ objectMode: true })
    src._read = function () {
        this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }))
        this.push(null)
    }
    return src
}

gulp.task ("package:meta", function() {
    return string_src("package.xml",
        '<?xml version="1.0" encoding="UTF-8"?>\n'+
        '<Package xmlns="http://soap.sforce.com/2006/04/metadata">\n'+
        '   <types>\n'+
        '       <members>*</members>\n'+
        '       <name>StaticResource</name>\n'+
        '   </types>\n'+
        '   <version>34.0</version>\n'+
        '</Package>')
        .pipe(gulp.dest('./metadata'))
});

var statictasks = [];
[
    {name: pageName, src: './aurabundle.js'}
].forEach(function(sr) {
    statictasks.push(sr.name + ":res");
    gulp.task (sr.name + ":res", ['webpack:js'], function() {
        return gulp.src(sr.src)
          //  .pipe(zip(sr.name+".resource"))
            .pipe(rename(sr.name+".resource"))
            .pipe(gulp.dest ('./metadata/staticresources'));
    });
    statictasks.push(sr.name + ":meta");
    gulp.task (sr.name + ":meta", function() {
        return string_src(sr.name+".resource-meta.xml",
            '<?xml version="1.0" encoding="UTF-8"?>\n'+
            '<StaticResource xmlns="http://soap.sforce.com/2006/04/metadata">\n'+
            '    <cacheControl>Private</cacheControl>\n'+
            '    <contentType>application/javascript</contentType>\n'+
            '</StaticResource>\n')
            .pipe(gulp.dest('./metadata/staticresources'))
    });
});

gulp.task('webpack:js', function(cb) {
  //return exec('npm run webpackaura', {shell: process.env.SHELL, env: {PATH: process.env.PATH, HOME: process.env.HOME, NODE_ENV:"test", BUILD_TARGET: "visualforce"}}, function (err, stdout, stderr) {
  return exec('webpack --colors --progress --config ./webpack.config.aura.js', function (err, stdout, stderr) {
      if (stdout) console.log('out : ' + stdout);
      if (stderr) console.log('err : ' +stderr);
      cb(err);
  });
});

gulp.task('force:import', ["webpack:js", "package:meta"].concat(statictasks), function () {
    exec('force import', function (err, stdout, stderr) {
      if (stdout) console.log('out : ' + stdout);
      if (stderr) console.log('err : ' +stderr);
    });
})

gulp.task('default' , function() {
    gulp.watch(['auraapp/app_aura.es6', 'auraapp/*.jsx', 'auraapp/**/*.jsx', 'auraapp/**/*.es6'], ['force:import']);
});
