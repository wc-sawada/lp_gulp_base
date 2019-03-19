
// プラグイン
const gulp = require('gulp');
const changed = require('gulp-changed');
// Browsersync
const browsersync = require("browser-sync").create();
// 画像圧縮
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
// style
const autoprefixer = require('autoprefixer');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const minifyCss = require('gulp-minify-css');
const postcss = require('gulp-postcss');

// sass
gulp.task('sass', function () {
  return gulp.src('./src/sass/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(changed('./public'))
    .pipe(sass())
    .pipe(postcss([autoprefixer({
        // ☆IEは11以上、Androidは4.4以上
        // その他は最新2バージョンで必要なベンダープレフィックスを付与する設定
        browsers: ["last 2 versions", "ie >= 11", "Android >= 4"],
        cascade: false
      })]))
	.pipe(minifyCss())
    .pipe(gulp.dest('./public/css'))
});

// 画像の圧縮
gulp.task('image-min', function () {
  return gulp.src('./src/images/*') // src/imagesにある画像を読み込み
    .pipe(changed('./public/images/'))
    .pipe(imagemin([pngquant({ quality: '60-80', speed: 1 })])) // pngの圧縮サイズを指定
    .pipe(imagemin()) // おまじないでもう一回実行
    .pipe(gulp.dest('./public/images/')) // 吐き出し先を指定
});

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./public/"
    },
    port: 3000,
    reloadOnRestart: true
  });
  done();
}

// watch 監視
function watchFiles(done) {
  const browserSyncReload = () => {
    browsersync.reload();
    done();
  };
  gulp.watch(['./public/*.html']).on('change', gulp.series(browserSyncReload));
  gulp.watch(['./src/sass/*.scss']).on('change', gulp.series('sass', browserSyncReload));
  gulp.watch(['./src/images/*']).on('change', gulp.series('image-min', browserSyncReload));
}

gulp.task('develop', gulp.series(browserSync, watchFiles));
