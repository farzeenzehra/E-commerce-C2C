
const abi = require('./contract_abi.json')
const Web3 = require("web3");
const ContractAddress = '0xaF03DE639f90a7F973C758A5eA5C9a3b0579f488';
const walletAddOwner = '0xdF8e844F1BA70EC7466229380b80eb66F245Aa85';

// number of wallet address defines concurrent users
const wallets = [
    '0x4FD2C724fE0bc55CD3de38f32b219D9eA83e3AFc', 
    // '0xC237303710a8DFe883f1CF642e60A20c77428C0E', 
    // '0x02302C1906193E671b186bff91b93CEE28223dA2'
            ]
const BID = {0:"ERG", 1:"ABC", 2:"GHQ"}
                
// const rpcURL = 'HTTP://127.0.0.1:7545';
const rpcURL = 'https://d412-202-5-147-139.ap.ngrok.io';

const web3 = new Web3(rpcURL)
web3.eth.getBlockNumber().then((result) => {
    console.log("Latest Ethereum Block is ", result);
});

const contract = new web3.eth.Contract(abi, ContractAddress);

// define all contract functions here

// setter functions
let addSoldProduct = (prodID, modelID, hashedCNIC, walletAdd)=>
                        contract.methods.addSoldProduct(prodID,modelID,hashedCNIC).send({from:walletAdd, gas:3000000})
                        .then(r=>console.log("Transaction hash:",r.transactionHash,",Business Wallet:",r.from)).catch(e=>console.log(e.message))

let addBuiness = (walletAdd)=>contract.methods.addBuiness(walletAdd).send({from:walletAdd, gas:3000000})
                        .then(r=>console.log("Transaction hash:",r.transactionHash,",Business Wallet:",r.from)).catch(e=>console.log(e.message))

let addModel = (modelID, modelName, brandName,category, walletAdd) => 
        contract.methods.addModel(modelID, modelName, brandName, category).send({from:walletAdd, gas:3000000})
        .then(r=>console.log("Transaction hash:",r.transactionHash,",Business Wallet:",r.from)).catch(e=>console.log(e.message))

let transferOwnership = (prodID, hashedCNIC, walletAdd)=>
        contract.methods.transferOwnership(prodID, hashedCNIC).send({from:walletAdd, gas:3000000})
        .then(r=>console.log("Transaction hash:",r.transactionHash,",Business Wallet:",r.from)).catch(e=>console.log(e.message))

// getter functions
let getSoldProduct = (prodID, walletAdd) => 
        contract.methods.getSoldProduct(prodID).call({from:walletAdd, gas:3000000})
        .then(r=>console.log("Result:",r)).catch(e=>console.log(e.message))

let getModel = (modelID, walletAdd) =>
        contract.methods.getModel(modelID).call({from:walletAdd, gas:3000000})
        .then(r=>console.log("Result:",r)).catch(e=>console.log(e.message))

let getBusiness = (walletAdd) =>
        contract.methods.getBusiness(walletAdd).call({from:walletAdd, gas:3000000})
        .then(r=>console.log("Result:",r)).catch(e=>console.log(e.message))

let getCustCNIC = (prodID, walletAdd) =>
        contract.methods.getCustCNIC(prodID).call({from:walletAdd, gas:3000000})
        .then(r=>console.log("Result:",r)).catch(e=>console.log(e.message))

// to check balance of ethers in wallet
// web3.eth.getBalance(walletAdd).then(console.log);



async function runConcurrentWithSameAttrs(runTimes, func, attrs){
    console.log("running...")
    let tasks = []
    for(i=0;i<runTimes;i++){
        for (let walletNo in wallets){
            tasks.push(
                func(...attrs,wallets[walletNo])
            );
        }
    }
    await Promise.all(tasks);
}

async function sameAttrPrintTime(howManyTimesTorun, func, attrs){
    console.time('codezup')
    await runConcurrentWithSameAttrs(howManyTimesTorun, func, attrs);
    console.timeEnd('codezup')
}

async function diffAttrPrintTime(howManyTimesTorun, func)
{
    console.time('codezup')
    await runConcurrentWithDiffAttrs(howManyTimesTorun, func);
    console.timeEnd('codezup')
}



// change attributes as you want to use
async function runConcurrentWithDiffAttrs(runTimes, func){
    console.log("running...")
    let tasks = []
    for(i=0;i<runTimes;i++){
        for (let walletNo in wallets){
            tasks.push(
                // define attributes of function in the bracket
                func(`${BID[walletNo]}-${i}-${i}`,"1","remote"
                    , wallets[walletNo])
            );
        }
    }
    await Promise.all(tasks);
}

// get Previous data
function getHistory(startBlockNo)
{
    web3.eth.getBlockNumber().then((endBlockNumber) => {
        for(blockNo=startBlockNo; blockNo<=endBlockNumber;blockNo++){
            // define contract function
            contract.methods.getCustCNIC("1").call({from:wallets[0], gas:3000000}, blockNo)

            .then(r=>{if(r?.length>0) console.log(r)})
            .catch(e=>console.log(e.message));
        }
    });
    
    
}

// call all functions with same attributes
// sameAttrPrintTime(500, getCustCNIC, ["1"]);

// call function with different atttributes then needs to be defined in runConcurrentWithDiffAttrs function
// diffAttrPrintTime(500, addSoldProduct)

// change function in getHistory function
// getHistory(617);


// addSoldProduct("2","1","remote", wallets[0]);
async function test(){
    const extraData = await contract.methods.getCustCNIC("1");
    console.log(extraData.encodeABI())
}
test()