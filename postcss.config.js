module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 37.5,
      propList: ["*"],
    },
    autoprefixer: {
      overrideBrowserslist: ["Android 4.1", "iOS 7.1"],
      grid: true,
    },
  },
};
