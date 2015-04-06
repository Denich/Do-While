var
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    del = require('del');
    livereload = require('gulp-livereload');
    connect = require('gulp-connect');


gulp.task('srv', function () {
    connect.server({
        root: 'dist',
        port: 8000,
        livereload: true
    });
});

gulp.task('clean', function(){
    del(['dist/*']);
});

gulp.task('src_sass_build', ['sass_clean'],  function(){
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});
gulp.task('sass_clean', function(){
    del(['dist/css/*']);
});

gulp.task('src_images_build', ['images_clean'], function(){
    return gulp.src('src/images/**')
        .pipe(gulp.dest('dist/images'))
        .pipe(connect.reload());
});
gulp.task('images_clean', function(){
    del(['dist/images/*']);
});

gulp.task('src_js_build', ['js_clean'], function(){
    return gulp.src('src/js/**')
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});
gulp.task('js_clean', function(){
    del(['dist/js/*']);
});

gulp.task('src_root_build',  function(){
    return gulp.src('src/*.*')
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});
gulp.task('root_clean', function(){
    del(['dist/*.*']);
});

gulp.task('copy_libs',function(){
    gulp.src(['bower_components/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('dist/vendor'));
});
gulp.task('libs_clean', function(){
    del(['dist/vendor/*']);
});

gulp.task('src_copy', ['src_images_build', 'src_js_build', 'src_root_build']);
gulp.task('build', ['src_sass_build',  'src_copy', 'copy_libs']);

gulp.task('default', ['build', 'srv'], function(){

    gulp.watch('src/**', function() {
        gulp.run('src_copy');
    });
    gulp.watch('src/scss/**/*.scss', function() {
        gulp.run('src_sass_build');
    });
});
