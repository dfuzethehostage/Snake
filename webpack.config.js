// webpack.config.js
const path = require("path");

module.exports = {
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  watch: true,
};
