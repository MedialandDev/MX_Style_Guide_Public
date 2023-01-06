/* eslint max-len:0, no-console:0, func-names: 0, no-mixed-operators:0 */
const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const changed = require('gulp-changed');
const size = require('gulp-size');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const merge = require('merge-stream');
const spritesmith = require('gulp.spritesmith');
const buffer = require('vinyl-buffer');
const rimraf = require('rimraf');
const md5 = require('md5');
// https://github.com/twolfson/gulp.spritesmith

const isDirectory = (pathName:string):boolean => {
  try {
    return fs.statSync(pathName).isDirectory();
  } catch (error) {
    //
  }
  return false;
};
const getDirectoryFolderNames = (pathName:string):string[] => {
  const resolvePathName:string = path.resolve(pathName);
  if (!fs.existsSync(resolvePathName)) {
    return [];
  }
  return fs.readdirSync(resolvePathName).filter(isDirectory);
};


type CreateSpriteOptions = {
  globs : string;
  fileName: string;
  cssTemplate: string;
  imagesCount: number,
  animationIterationCount :string;
  animationDuration: string;
}
function createSprite(options:CreateSpriteOptions) {
  const {
    globs,
    fileName,
    cssTemplate,
    imagesCount,
    animationIterationCount = 'infinite',
    animationDuration = '1s',
  } = options;

  const spriteData = gulp.src(globs)
    .pipe(spritesmith({
      imgName: `sprite-sheet-${fileName}.png`,
      cssName: `${fileName}.styl`,
      padding: 4,
      imgOpts: {
        quality: 100,
      },
      cssTemplate,
      cssHandlebarsHelpers: {
        parseName: (name) => `${fileName}-${name}`,
        percent: (value, base) => `${(value / base) * 100}%`,
        bgPosition(spriteSize, imgSize, offset) {
          const result = (offset / (imgSize - spriteSize)) * 100;
          // eslint-disable-next-line
          if (isNaN(result)) {
            return '0';
          }
          return `${result}%`;
        },
        cssKeyframeName: () => `${fileName}-${md5(fileName)}`,
        cssSpriteClassName: () => `spr-${fileName}`,
        animationDuration: () => animationDuration,
        animationIterationCount: () => animationIterationCount,
        keyframePercent: (idx) => `${(idx / imagesCount * 100).toFixed(0)}%`,
        isEachLast: (idx) => idx + 1 === imagesCount,
      },
    }));
  const imgStream = spriteData.img
    .pipe(buffer())
    .pipe(gulp.dest('src/assets/img_src'));

  const cssStream = spriteData.css
    .pipe(gulp.dest('src/css/sprite-sheet'));
  return merge(imgStream, cssStream);
}

gulp.task('sprite', () => {
  const folders:string[] = getDirectoryFolderNames('src/assets/sprite_src');
  if (folders.length === 0) {
    return Promise.resolve('');
  }
  const cssTemplate = 'src/css/handlebars/basic-stylus.hbs';

  const spriteTasks = folders.map((folderName:string) => {
    const options = {
      globs: `src/assets/sprite_src/${folderName}/*.png`,
      fileName: folderName,
      cssTemplate,
    };
    return createSprite(options);
  });
  return merge(...spriteTasks);
});

gulp.task('css-sprite', () => {
  const folders:string = getDirectoryFolderNames('src/assets/css_sprite_src');
  if (folders.length === 0) {
    return Promise.resolve('');
  }
  const cssTemplate = 'src/css/handlebars/css-sprite.hbs';

  const spriteTasks = folders.map((folderName:string) => {
    const imagesCount = fs.readdirSync(path.resolve(`src/assets/css_sprite_src/${folderName}`)).length;
    const options = {
      globs: `src/assets/css_sprite_src/${folderName}/*.png`,
      fileName: folderName,
      cssTemplate,
      // css sprite 會用到的
      imagesCount, // 圖片數量
      animationIterationCount: '1', // animation-iteration-count infinite
      animationDuration: '2s', // animation-duration
    };
    return createSprite(options);
  });
  return merge(...spriteTasks);
});

gulp.task('m', () => {
  const imgSrc = [
    'src/assets/img_src/**/*.+(jpg|png|gif)',
    '!src/assets/img_src/_*',
  ];
  const otherSrc = imgSrc.map((imgPath) => (imgPath.indexOf('!') === 0 ? imgPath.substr(1) : `!${imgPath}`));
  otherSrc.push('src/assets/img_src/**/*.+(svg)');
  const imgDest = 'src/assets/img';

  const taskOtherSrc = gulp.src(otherSrc)
    .pipe(changed(imgDest))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(imgDest));

  const taskImgSrc = gulp.src(imgSrc)
    .pipe(changed(imgDest))
    .pipe(size({ showFiles: true }))
    .pipe(imagemin([
      imageminMozjpeg({ quality: 90 }),
      imagemin.optipng({ optimizationLevel: 5 }),
    ]))
    .pipe(gulp.dest(imgDest));

  return merge(taskOtherSrc, taskImgSrc);
});

gulp.task('rimraf', (cb) => {
  rimraf('./dist-build', cb);
});

gulp.task('buildToWWW', () => {
  const SRC = ['dist/**/*.*', '!dist/**/*.html'];
  const DEST = '../code/www/';
  const assetsPipe = gulp.src(SRC)
    .pipe(gulp.dest(DEST));

  const htmlPipe = gulp.src(['dist/**/*.html'])
    .pipe(gulp.dest('dist-build'));

  return merge(assetsPipe, htmlPipe);
});

gulp.task('www', gulp.series('rimraf', 'buildToWWW'));


gulp.task('watch', () => {
  gulp.watch('src/assets/img_src/**/*', gulp.series('m'));
  gulp.watch('src/assets/sprite_src/**/*.png', gulp.series('sprite'));
  gulp.watch('src/assets/css_sprite_src/**/*.png', gulp.series('css-sprite'));
});

gulp.task('default', gulp.series('sprite', 'css-sprite', 'm', 'watch'));
