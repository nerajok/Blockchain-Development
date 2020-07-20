// require("dotenv").config("./env");
const Web3 = require("web3");
const abi = require("./lab5_sol_SimpleStorage.json");

const PRIVATE_KEY="0xdf3a62a57178f5e42e714331faa326d6a05333d539bdb8280d28428fb6d50a45"
const URI="http://127.0.0.1:8545"
const WEBSOCKET_URI="http://127.0.0.1:8545"
const CONTRACT_ADDRESS= "0x3205947a64E4BA2Af772ac6962277208ceF07f34";

const web3 = new Web3(
  new Web3.providers.WebsocketProvider(WEBSOCKET_URI)
);

web3.eth.accounts.wallet.add(PRIVATE_KEY);

const simpleContract = new web3.eth.Contract(abi,CONTRACT_ADDRESS);

simpleContract.events
  .result((error, event) => {
    console.log(event);
  })
  .on("data", function (event) {
    console.log(event);
  })
  .on("changed", function (event) {})
  .on("error", console.error);
