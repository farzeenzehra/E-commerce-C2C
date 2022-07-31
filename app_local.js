
const abi = require('./contract_abi.json')
const Web3 = require("web3");
// enter your contract address
const ContractAddress = '';

// number of wallet address defines concurrent users
const walletAdd = ''
                
const rpcURL = 'HTTP://127.0.0.1:7545';

const web3 = new Web3(rpcURL)
web3.eth.getBlockNumber().then((result) => {
    console.log("Latest Ethereum Block is ", result);
});

const contract = new web3.eth.Contract(abi, ContractAddress);

// to check balance of ethers in wallet
// web3.eth.getBalance(walletAdd).then(console.log);



async function runConcurrent(runTimes){
    console.log("running...")
    const start = Date.now()
    for(i=1;i<=runTimes;i++){
        // setter function
        await contract.methods.addSoldProduct("1","1","modelName")
        .send({from:walletAdd, gas:3000000})
        .then(r=>console.log("Transaction hash:",r.transactionHash,",From Wallet:",r.from))
        .catch(e=>console.log(e.message))

        // getter function
        // await contract.methods.getSoldProduct("1")
        // .call({from:walletAdd, gas:3000000})
        // .then(r=>console.log("Result:",r))
        // .catch(e=>console.log(e.message))

        if(runTimes%500 == 0){
            const stop = Date.now()
            console.log(`Time Taken to execute ${runTimes} times  = ${(stop - start)/1000} seconds`);
        }
    } 
}

runConcurrent(2500);


