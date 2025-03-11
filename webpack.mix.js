const mix = require("laravel-mix");

mix
  .js("src/js/app.js", "js/app.js")
  .js("src/js/dict.js", "js/dict.js")
  .sass("src/scss/style.scss", "css/style.css")
  .copy("src/**.html", "docs")
  .copyDirectory("src/assets", "docs/assets")
  .setPublicPath("docs")
  .version();