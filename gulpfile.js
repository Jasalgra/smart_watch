const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const rename      = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// Static server
gulp.task('server', function() {
    browserSync({
        server: {
            // baseDir: "./"
            baseDir: "src"
        }
    });
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    // return gulp.src("sass/*.+(sass|scss)")
    return gulp.src("src/sass/**/*.+(sass|scss)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({prefix: "", suffix: ".min"}))
        .pipe(autoprefixer({
            brosers:['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        // .pipe(gulp.dest("./style"))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
}  )

gulp.task('watch', function(){
    // gulp.watch("sass/*.+(sass|scss)", gulp.parallel('styles'));      /*если без папки src*/
    // gulp.watch("src/sass/*.+(sass|scss)", gulp.parallel('styles'));  /*если sass папка без вложеных подпапок*/
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));  /*если sass папка с вложеными подпапоками*/
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));

// *****
