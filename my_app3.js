
const abi = require('./contract_abi.json')
const Web3 = require("web3");
const ContractAddress = '0x8Ef83566af90c7C08B0eeCa058E95ad52B57c507';
const walletAddOwner = '0xdF8e844F1BA70EC7466229380b80eb66F245Aa85';

// number of wallet address defines concurrent users
// const wallets = [
    // '0x4FD2C724fE0bc55CD3de38f32b219D9eA83e3AFc', 
    // '0xC237303710a8DFe883f1CF642e60A20c77428C0E', 
    const walletAddress =   '0x02302C1906193E671b186bff91b93CEE28223dA2'
            // ]
const BID = {0:"ERG", 1:"ABC", 2:"GHQ"}
const hash = '1b6cc0d689d8903a5087a6628dc402265b04ef13';

const rpcURL = 'HTTP://127.0.0.1:7545';
// const rpcURL = 'https://f604-202-5-152-71.ap.ngrok.io';

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

let addBuiness = (businessWallet,walletAdd)=>contract.methods.addBuiness(businessWallet).send({from:walletAdd, gas:3000000})
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
        // .then(r=>console.log("Result:",r)).catch(e=>console.log(e.message))

let getBusiness = (businessWallet,walletAdd) =>
        contract.methods.getBusiness(businessWallet).call({from:walletAdd, gas:3000000})
        .then(r=>console.log("Result:",r)).catch(e=>console.log(e.message))

let getCustCNIC = (prodID, walletAdd) =>
        contract.methods.getCustCNIC(prodID).call({from:walletAdd, gas:3000000})
        .then(r=>console.log("Result:",r)).catch(e=>console.log(e.message))

// to check balance of ethers in wallet
// web3.eth.getBalance(walletAdd).then(console.log);

// get Previous data
function getHistory(startBlockNo)
{
    web3.eth.getBlockNumber().then((endBlockNumber) => {
        for(blockNo=startBlockNo; blockNo<=endBlockNumber;blockNo++){
            // define contract function
            contract.methods.getCustCNIC("1").call({from:walletAddress, gas:3000000}, blockNo)

            .then(r=>{if(r?.length>0) console.log(r)})
            .catch(e=>console.log(e.message));
        }
    });
    
    
}


async function runConcurrentWithSameAttrs(runTimes, func, attrs){
    console.log("running...")
    // let tasks = []
    console.time('codezup')
    for(i=0;i<runTimes;i++){
        // for (let walletNo in wallets){
            // tasks.push(
                await func(...attrs,walletAddress)
            // );
        // }
    }
    console.timeEnd('codezup')
    // await Promise.all(tasks);
}

async function sameAttrPrintTime(howManyTimesTorun, func, attrs){
    
    await runConcurrentWithSameAttrs(howManyTimesTorun, func, attrs);
}



// change attributes as you want to use
async function runConcurrentWithDiffAttrs(st,runTimes){
    console.log("running...")
    // let tasks = []
    console.time('codezup')
    for(i=st;i<runTimes;i++){
        // for (let walletNo in wallets){
            // tasks.push(
                // define attributes of function in the bracket
                // await addModel(`FARZ-${i}`,`ABC${i}`,"ABC Mobile","Mobile", walletAddress)
                await addSoldProduct(`A-${i}`,"FARZ-1",hash, walletAddress)
            // );
        // }
    }
    console.timeEnd('codezup')
    // await Promise.all(tasks);
}

async function diffAttrPrintTime(st,howManyTimesTorun)
{
    
    await runConcurrentWithDiffAttrs(st,howManyTimesTorun);
    
}


// call all functions with same attributes
// sameAttrPrintTime(1000, getSoldProduct, ["FAR-1"]);

// call function with different atttributes then needs to be defined in runConcurrentWithDiffAttrs function
diffAttrPrintTime(0,1500)

// change function in getHistory function
// getHistory(617);


// addSoldProduct("2","1","remote", walletAddress);
// async function test(){
    // const extraData = await contract.methods.getCustCNIC("1");
    // console.log(extraData.encodeABI())
    
// const accounts = await web3.eth.getAccounts();
// // const accounts = await web3.eth.accounts.wallet.add("0x867855ae6f6889c10755c84dd4fdc0d782acdab3a7c046d8c143aeb8b836cf3c");

// console.log(accounts)
// }

// test()
// getCustCNIC("FAR-1",walletAddOwner)
// addSoldProduct("FAR-1","FAR-1",hash,walletAddress);
// getBusiness("0x02302C1906193E671b186bff91b93CEE28223dA2",walletAddOwner);
// addBuiness("0x02302C1906193E671b186bff91b93CEE28223dA2",walletAddOwner)
// 66cdaba79e24da8f82b8417372b50e4cf38a3ba414592dbaef8f215ea68e425a