
const abi = require('./contract_abi.json')
const Web3 = require("web3");
const ContractAddress = '0xA816998e7f6e2d07cCD30649c38FC086A62Dd3b2';
const walletAdd = '0x04db1B07F95feC39D08d1FF6fea4d9036A461e78';
const rpcURL = 'HTTP://127.0.0.1:7545';

const web3 = new Web3(rpcURL)
web3.eth.getBlockNumber().then((result) => {
    console.log("Latest Ethereum Block is ", result);
});

const contract = new web3.eth.Contract(abi, ContractAddress);
web3.eth.getBalance(walletAdd).then(console.log);
contract.methods.getCustCNIC("1").call()
    .then(console.log)

// contract.methods.transferOwnership('1','xyz').send({from:walletAdd,gas: 3000000  })
// .then(console.log)
