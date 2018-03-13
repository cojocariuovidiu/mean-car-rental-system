const gulp = require('gulp');
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;

gulp.task('build:watch', function () {

    var webpackProc = exec('webpack --config webpack.config.dev.js');
    webpackProc.stdout.on('data', function (data) {
        console.log(data.toString());
    });
    webpackProc.stderr.on('data', function (data) {
        console.log(data.toString());
    });

    var nodeProc = spawn('node', ['main.js']);
    nodeProc.stdout.on('data', function (data) {
        console.log(data.toString());
    });
    nodeProc.stderr.on('data', function (data) {
        console.log(data.toString());
    });

    gulp.watch(['./server/**/*', './main.js']).on('change', () => {
        nodeProc.kill();
        nodeProc = spawn('node', ['main.js']);
        nodeProc.stdout.on('data', function (data) {
            console.log(data.toString());
        });
        nodeProc.stderr.on('data', function (data) {
            console.log(data.toString());
        });
    });


});



gulp.task('build:watch:debug', function () {

    var webpackProc = exec('webpack --config webpack.config.dev.js');
    webpackProc.stdout.on('data', function (data) {
        console.log(data.toString());
    });
    webpackProc.stderr.on('data', function (data) {
        console.log(data.toString());
    });

    var nodeProc = spawn('node', ['--inspect-brk', 'main.js']);
    nodeProc.stdout.on('data', function (data) {
        console.log(data.toString());
    });
    nodeProc.stderr.on('data', function (data) {
        console.log(data.toString());
    });

    gulp.watch(['./server/**/*', './main.js']).on('change', () => {
        nodeProc.kill();
        nodeProc = spawn('node', ['--inspect-brk', 'main.js']);
        nodeProc.stdout.on('data', function (data) {
            console.log(data.toString());
        });
        nodeProc.stderr.on('data', function (data) {
            console.log(data.toString());
        });
    });


});

