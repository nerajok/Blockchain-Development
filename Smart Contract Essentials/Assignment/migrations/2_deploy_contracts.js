const photoToken = artifacts.require("photoToken");

module.exports = function(deployer) {
  deployer.deploy(photoToken);
};