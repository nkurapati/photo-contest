var gulp = require("gulp");
var LiveServer = require("gulp-live-server");
var browserSync = require("browser-sync");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var shell = require("gulp-shell");

gulp.task("live-server", function() {
	browserSync.init({
        server: {
            baseDir: "./dist"
        },
        port: 8080
    });
});

gulp.task('copyHtml', function() {
	gulp.src('./app/**/*.html').pipe(gulp.dest('./dist'));
	console.log("Copied all html files");
});


gulp.task("copyCSS", function() {
    gulp.src("./app/**/*.css").pipe(gulp.dest("./dist"));
	console.log("Copied all css files");
});

gulp.task("copyImages", function() {
    gulp.src("./app/img/*").pipe(gulp.dest("./dist/img"));
	console.log("Copied all images files");
});

gulp.task('copy', ['copyHtml', 'copyCSS', 'copyImages'], function() {
	console.log("Coping files is completed...");
});


gulp.task("bundle", ["copy"], function() {
    return browserify({
        entries: "./app/js/app.js",
        debug: true
    })
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("./dist"))
})

gulp.task("serve", ["bundle","live-server"], function() {
	console.log("Server is running...");
});

gulp.task("runServer", shell.task(["node server/rest.js"]));

gulp.task("watch", ["bundle"], browserSync.reload);
gulp.watch("./app/**/*.js", ["watch"]);

gulp.watch("./app/**/*.html", ["copyHtml"]);
gulp.watch("./app/**/*.css", ["copyCSS"]);