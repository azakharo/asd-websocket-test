module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-global-import'),
    require('postcss-custom-properties')({
      preserve: false,
    }),
    require("postcss-color-function"),
    require('postcss-nested'),
    require('autoprefixer'),
  ]
};
