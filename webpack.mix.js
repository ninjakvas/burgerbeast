const mix = require('laravel-mix');
const config = require('./webpack.config');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');

mix.disableNotifications();
mix.browserSync({
    proxy: 'pizza.test',
    notify: false,
    open: false,
});

mix.webpackConfig(config);

mix.autoload({
    jquery: ['$', 'window.jQuery']
});
mix.options({
    extractVueStyles: true
});
