var Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {

  // Deploy the Migrations contract as our only task

  deployer.deploy(Migrations);

};

// Stage deploying A before B
deployer.deploy(A);
deployer.deploy(B);
// Deploy A, then deploy B, passing in A's newly deployed address

deployer.deploy(A).then(function() {

  return deployer.deploy(B, A.address);

});

// Deploy A, then deploy B, passing in A's newly deployed address

deployer.deploy(A).then(function() {

  return deployer.deploy(B, A.address);

});

module.exports = function(deployer, network) {

  if (network == "live") {

    // Do something specific to the network named "live".

  } else {

    // Perform a different step otherwise.

  }

}

// Deploy A, then deploy B, passing in A's newly deployed address

deployer.deploy(A).then(function() {

  return deployer.deploy(B, A.address);

});

module.exports = function(deployer, network) {

  if (network == "live") {

    // Do something specific to the network named "live".

  } else {

    // Perform a different step otherwise.

  }

}

web3.eth.getAccounts()
module.exports = function(deployer, network, accounts) {

  // Use the accounts within your migrations.

}

