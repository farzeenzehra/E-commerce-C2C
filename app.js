
const abi = require('./contract_abi.json')
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const ContractAddress = '0x0A9bd6D179E06257EC3713E502a369D2F53B3b6F';
const walletAdd = '0x03978e1450F8e0d9DfB6C7C84fF7d0240fa5430e';
const privateKey = '0ce8d7d8c57451444c4b57def4629c38f1f9b4d567307ceb0dd21ac4724687b6';
const rpcURL = 'https://eth-goerli.g.alchemy.com/v2/MQNpJ4W4WxdUwZD9BRoVmK7uXGZew16E';

const web3 = createAlchemyWeb3(rpcURL);

web3.eth.getBlockNumber().then((result) => {
    console.log("Latest Ethereum Block is ", result);
});

const contract = new web3.eth.Contract(abi, ContractAddress);
// web3.eth.getBalance(walletAdd).then((res) => {
//     console.log(res);
// })
contract.methods.getCustCNIC("1").call()
    .then(console.log)

// contract.methods.transferOwnership('1','xyz').send({from:walletAdd,gas: 3000000  })
// .then(console.log)

async function main(i) {
    const extraData = await contract.methods.addSoldProduct("far"+i,'1', "abcdefg");
    const data = extraData.encodeABI()
    var nonce = await web3.eth.getTransactionCount(walletAdd, 'latest'); // nonce starts counting from 0
    nonce =nonce + i
    const transaction = {
        'to': ContractAddress,
        'value': 0,
        'gas': 300000,
        'maxPriorityFeePerGas': 1000000108,
        'nonce': nonce,
        'data': data
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (error, hash) {
        if (!error) {
            console.log("🎉 The hash of your transaction is: ", hash);
        } else {
            console.log("❗Something went wrong while submitting your transaction:", error)
        }
    });
}

// for(i=0;i<=100;i++){
//   main(i);
// }