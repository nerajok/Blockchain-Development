// require("dotenv").config("./env");
const Web3 = require("web3");
const abi = require("./lab5_sol_SimpleStorage.json");

const PRIVATE_KEY="0xdf3a62a57178f5e42e714331faa326d6a05333d539bdb8280d28428fb6d50a45"
const URI="http://127.0.0.1:8545"
const WEBSOCKET_URI="http://127.0.0.1:8546"
const CONTRACT_ADDRESS= "0x3205947a64E4BA2Af772ac6962277208ceF07f34";


const web3 = new Web3(new Web3.providers.HttpProvider(URI));

web3.eth.accounts.wallet.add("0xdf3a62a57178f5e42e714331faa326d6a05333d539bdb8280d28428fb6d50a45");

const simpleContract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);


simpleContract.methods
  .get()
  .call()
  .then((result) => {
    console.log(`Initial value of number is: ${result}`);
  });

simpleContract.methods
  .decrement(200)
  .estimateGas()
  .then((gas) => {
    console.log(gas);
    simpleContract.methods.decrement(200).send({
      from: web3.eth.accounts.wallet[0].address,
      gas,
    });
  });
