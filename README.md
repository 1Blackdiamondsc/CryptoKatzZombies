![head-8@2x](https://user-images.githubusercontent.com/73549208/153045917-53860611-8e9f-4bd2-8b8f-b79553386bf9.png)
# CryptoKatzZombies
Decentralized ZombieFactory 🎮 

CryptoKatzZombies... A Decentralized Blockchain Game Dapp Built On The Avalanche & Polygon Matic Network With More Networks Coming Soon.

Installation¶
You can install Cheshire with git or as a Truffle Box.

Git¶

git clone http://github.com/endless-nameless-inc/cheshire
cd cheshire
yarn install
Truffle box¶

truffle unbox endless-nameless-inc/cheshire
Usage¶
Cheshire is meant to be used with the Truffle Framework, but can function as a standalone service, depending on your workflow.

Start Cheshire¶
To start Cheshire, run:

yarn start

This does the following:

Starts an Ethereum testnet (ganache-cli)
Deploys CryptoKitties's KittyCore, SaleClockAuction, and SiringClockAuction contracts to the testnet
Starts a local CryptoKitties API server
Executes /scripts/setup.js
The output should look something like this:


> Starting database...
> Starting testnet...
> Compiling contracts...
> Deploying CryptoKitties contracts to testnet...
> Starting local CryptoKitties API server...
> Running setup script...

Cheshire is live 😺 Here's what's inside:

Available Accounts
====================
(0) 0x182fc09c33fdd6c2f5b2562f3ca721fa954689c8
    ...
(9) 0xcdf40e926a778d93429b72c341b4a9e0ee8624c4

Private Keys
====================
(0) 0x76a67ae288fd67ea8d4f7fb94f50c36b606d9448db579584af90d52105f9d8cf
    ...
(9) 0x6e77cfded732de6d423abcaccc45ee8c4bdc2eb3c0c47938acb386ac17c496b8

Testnet Contracts
====================
KittyCore: 0xa751b62893867d0608a2ada5d17d0c43e3433040
SaleClockAuction: 0x1ab49d53d0bff0202ec4b330349b427155bba7ac
SiringClockAuction: 0x671843106e07f9d835d7299381cd14863af18593

Services
====================
Ethereum testnet listening on port 8546
CryptoKitties API listening on port 4000
Cheshire dashboard available at http://localhost:4000

View the above at any time by running `yarn run help`
Eureka! When Cheshire's running, you have your very own local copy of CryptoKitties, enabling you to build your dApp with the speed and convenience of testnet. Let's try it out.

Interacting with your local CryptoKitties API¶
Cheshire automatically imports the Genesis kitty. To fetch the Genesis kitty from your local CryptoKitties API, run:


$ curl http://localhost:4000/kitties/1
The response should look exactly like the response returned by CryptoKitties's production API.

See the scripts section below to learn how to seed your environment with more data.

Interacting with the testnet contracts¶
To interact with the testnet contracts, start by opening a Truffle console:


$ truffle console --network cheshire
Then, taking note of the KittyCore testnet address displayed when you started Cheshire, create an instance of KittyCore, and use the getKitty function to fetch the Genesis kitty's genes:


truffle(cheshire)> // Be sure to replace the KittyCore address below
truffle(cheshire)> kittyCore = KittyCore.at('0xa751b62893867d0608a2ada5d17d0c43e3433040')
truffle(cheshire)> kittyCore.getKitty(1)
The response should be pretty similar to the one you get from the mainnet contract.

Suggested Conventions¶
You'll get the most out of Cheshire by adopting these conventions:

Store your contracts in the /contracts directory
Design the web application layers of your stack to reference Cheshire's environment variables (hat tip to the twelve-factor methodology)
Update your setup script to deploy your contracts to testnet
Update your setup script to start your dApp's web application
Scripts¶
Cheshire provides a simple scripting framework designed to help seed the development environment with realistic data, primarily by importing kitties from mainnet.

A Cheshire script is just a Node.js module that runs in the context of the Cheshire environment.

Here's an example of a script that imports a Bug Cat from mainnet to your testnet.


// /scripts/import-bug-cat.js
module.exports = async function importBugCat(cheshire) {
  const bugCatIdMainnet = 101
  const ownerTestnet = cheshire.accounts[0].address
  const kittyIdTestnet = await cheshire.importKitty(bugCatIdMainnet, ownerTestnet)

  console.log(`Kitty #${kittyIdTestnet} => ${ownerTestnet}`)
}
To run this script, you would execute the following command:


$ yarn run script ./scripts/import-bug-cat.js
The output would look something like:


Kitty #2 => 0x182fc09c33fdd6c2f5b2562f3ca721fa954689c8
Setup Script¶
Cheshire executes /scripts/setup.js when started. You should update the setup.js shipped with Cheshire to:

Deploy your dApp's contracts to testnet. For example:

const kittyRace = await cheshire.deployContract('KittyRace', process.env.ADDRESS_KITTY_CORE)
log('KittyRace deployed at:', kittyRace.address)
Start your dApp's web application, so it inherits the various environment variables set by Cheshire.
We recommend adopting the convention in the setup.js shipped with Cheshire which simply expects the APP_START environment variable to contain a command that starts your dApp's web application.

For example:


APP_START="cd ~/Projects/kittyrace-web; bundle exec rails server" yarn start
You can run any script in place of setup.js by passing its path to yarn start. This is handy for setting up specific scenarios, such as a KittyRace with 9 registered racers:


yarn start ./scripts/setup-registered-racers.js 9
Cheshire API Reference¶
Cheshire scripts receive an instance of the Cheshire class with these methods:

accounts()¶
Returns array of available Ethereum accounts (the same accounts defined in config.json)

contractAddress(contractName)¶
Returns address of contractName

contractInstance(contractName)¶
Returns an instance of contractName as a web3.eth.contract object

createKitty(matronId, sireId, generation, genes, owner, apiObject)¶
Create a kitty with the given parameters.

Returns the kitty's ID.

async deployContract(contractName, ...constructorArgs)¶
Deploy contractName to testnet.

Cheshire compiles all contracts in /contracts at start time. Expects /contracts/ContractName.sol to exist.

Returns an instance of contractName as a web3.eth.contract object

async importKitty(kittyIdMainnet, ownerTestnet)¶
Import a kitty from mainnet, and assign it to ownerTestnet

Returns the testnet kitty's ID.

async importUser(addressMainnet, addressTestnet)¶
Import user's profile and kitties from mainnet, and assign to addressTestnet.

Returns address of testnet user.

Cheshire Environment Variables¶
Cheshire sets several environment variables before running any script:

ADDRESS_KITTY_CORE
ADDRESS_SALE_CLOCK_AUCTION
ADDRESS_SIRING_CLOCK_AUCTION
URL_CRYPTO_KITTIES_API
In addition to these, the address for any contract deployed with a Cheshire script will be stored in an environment variable named with the convention, ADDRESS_<CONTRACT_NAME>.

Configuration¶
The config.json file defines the following:

accounts - list of Ethereum accounts to load into testnet
ethNodeMainnet - URL for the node used to access the Ethereum mainnet
addressKittyCoreMainnet - address of the mainnet KittyCore contract
portTestnet - port bound by Ethereum testnet
portApi - port bound by local CryptoKitties API
Utilities¶
Mine¶
To mine some number of blocks on your testnet:

yarn run mine <num blocks>

Help¶
Print information about the environment including available Ethereum accounts, contract addresses, etc.

yarn run help

Cheshire Dashboard¶
Cheshire ships with a simple dashboard you can access at http://localhost:4000

Developer notes¶
KittyCore¶
The smart contracts bundled with Cheshire are identical to those in production except for KittyCore, to which we've added an external createKitty function that lets us push kitties into the local testnet contract.


function createKitty(
    uint256 _matronId,
    uint256 _sireId,
    uint256 _generation,
    uint256 _genes,
    address _owner
)
    external
    returns (uint)
{
  return _createKitty(_matronId, _sireId, _generation, _genes, _owner);
}
Contributions¶
Cheshire works pretty well for us at Endless Nameless, but there's probably a whole lot more it could do!

If you're interested in contributing, we humbly request the following:

Adhere to Airbnb's JavaScript style guide (yarn eslint makes it easy)

Include tests. We're happy when yarn test is happy, and yarn test is only happy when coverage is 100% 🤓

Acknowledgements¶
We're grateful for the contributions of the many open source projects on which Cheshire depends, none more so than the excellent Truffle Suite.

Cheshire is by Endless Nameless. It is based on tools and processes we developed while building KittyRace, a CryptoKitties dApp. We hope Cheshire makes it easier to #buidl 🤘

Your name here - we will gladly review PRs.
