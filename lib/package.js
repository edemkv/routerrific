var packageJson = require("../package");

module.exports = {
  packageJson: packageJson,
  devDependencies : packageJson.devDependencies,
  dependecies : packageJson.dependecies
}
