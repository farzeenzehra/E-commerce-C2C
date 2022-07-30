
const abi = require('./contract_abi.json')
const Web3 = require("web3");
const ContractAddress = '';

// number of wallet address defines concurrent users
const wallets = ['', 
                '', 
                '']
                
const rpcURL = 'HTTP://127.0.0.1:7545';

const web3 = new Web3(rpcURL)
web3.eth.getBlockNumber().then((result) => {
    console.log("Latest Ethereum Block is ", result);
});

// define all contract functions here

// to check balance of ethers in wallet
// web3.eth.getBalance(walletAdd).then(console.log);



async function runConcurrent(runTimes){
    console.log("running...")
    let tasks = []
    for(i=0;i<runTimes;i++){
        for (let walletNo in wallets){
            tasks.push(
                // setter function
                contract.methods.addSoldProduct("1","1","modelName")
                .send({from:wallets[walletNo], gas:3000000})
                .then(r=>console.log("Transaction hash:",r.transactionHash,",Business Wallet:",r.from))
                .catch(e=>console.log(e.message))

                // getter function
                // contract.methods.getSoldProduct("1")
                // .call({from:walletAdd, gas:3000000})
                // .then(r=>console.log("Result:",r))
                // .catch(e=>console.log(e.message))

            );
        }
    }
    await Promise.all(tasks);
}


// call concurrently 10 times
runConcurrent(10);


