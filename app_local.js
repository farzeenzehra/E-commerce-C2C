
const abi = require('./contract_abi.json')
const Web3 = require("web3");
const ContractAddress = '0xaF03DE639f90a7F973C758A5eA5C9a3b0579f488';
const walletAddOwner = '0xdF8e844F1BA70EC7466229380b80eb66F245Aa85';
const walletAdd1 = '0x4FD2C724fE0bc55CD3de38f32b219D9eA83e3AFc';
const walletAdd2 = '0xC237303710a8DFe883f1CF642e60A20c77428C0E';
const walletAdd3 = '0x02302C1906193E671b186bff91b93CEE28223dA2';
const wallets = ['0x4FD2C724fE0bc55CD3de38f32b219D9eA83e3AFc', 
                '0xC237303710a8DFe883f1CF642e60A20c77428C0E', 
                '0x02302C1906193E671b186bff91b93CEE28223dA2']
                
const rpcURL = 'HTTP://127.0.0.1:7545';

const web3 = new Web3(rpcURL)
web3.eth.getBlockNumber().then((result) => {
    console.log("Latest Ethereum Block is ", result);
});

const contract = new web3.eth.Contract(abi, ContractAddress);

let addSoldProduct = (prodID, modelID, modelName, walletAdd)=>
                        contract.methods.addSoldProduct(prodID,modelID,modelName).send({from:walletAdd, gas:3000000})
                        .then(r=>console.log(r.from)).catch(e=>console.log(e.message))
let addBuiness = (walletAdd)=>contract.methods.addBuiness(walletAdd).send({from:walletAdd, gas:3000000})
                        .then(r=>console.log(r.from)).catch(e=>console.log(e.message))



// web3.eth.getBalance(walletAdd).then(console.log);

// contract.methods.getCustCNIC("1").call().then(console.log)
// add business
// contract.methods.addBuiness(walletAdd3).send({from:walletAdd1,gas: 3000000  })
//     .then((receipt)=>{
//         console.log("Transaction hash:",receipt.transactionHash);
//         console.log("Block hash:", receipt.blockHash);
//         console.log("Gas Used:", receipt.gasUsed);
//     })
//     .catch(e=>console.log(Object.values(e.data)[0].reason))

function runAddBusiness(runTimes){
    let tasks = [];
    for(i=0;i<runTimes;i++){
        tasks.push(
        contract.methods.addBuiness(walletAdd3).send({from:walletAdd1,gas: 3000000  })
        .then((receipt)=>{
            console.log("Transaction hash:",receipt.transactionHash);
            console.log("Block hash:", receipt.blockHash);
            console.log("Gas Used:", receipt.gasUsed);
        })
        .catch(e=>console.log(Object.values(e.data)[0].reason)))
    }
    
}






















// for (let wallet of wallets)
// console.log(wallet)

let spcont = (contractMethod)=>contractMethod.then(r=>console.log(r.from)).catch(e=>console.log(e.message))
async function getCNIC(){
    console.log("running...")
    let tasks = []
    
    for(i=0;i<10;i++){
        for (let walletNo in wallets){
            // tasks.push(contract.methods.getCustCNIC("1").call({from:wallet}).then((r)=>console.log(r)));
            tasks.push(
                spcont(contract.methods.addSoldProduct(prodID,modelID,modelName).send({from:wallets[walletNo],gas: 3000000  }))
            );
        }
    }
    await Promise.all(tasks);
}

async function concurrent(){
    console.time('codezup')
    // await Promise.all([getCNIC(walletAdd1,100),getCNIC(walletAdd2,200),getCNIC(walletAdd3,300)]);
    await getCNIC();
    console.timeEnd('codezup')
}
// contract.methods.addSoldProduct(`far-1`,"1","xyz").send({from:walletAdd1, gas:3000000}).then(r=>{
//     console.log(r.from);
// }).catch(e=>console.log(e));
concurrent();
// for(i=300;i<600;i++)
// contract.methods.getCustCNIC("far-100").call({from:walletAdd1},i).then(console.log)
// contract.methods.getCustCNIC("far-102").call({from:walletAdd1},615).then(console.log)


