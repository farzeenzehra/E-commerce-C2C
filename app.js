
const abi = require('./contract_abi.json')
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const ContractAddress = '0x0A9bd6D179E06257EC3713E502a369D2F53B3b6F';
const walletAdd = '0x22E6511AF7F1bba469F5298CB175a5688EDE6246';
const privateKey = 'a0adaee06b33538eb8ba194a6311aa74d99e8f685b17075e5bd6fd88648102a1';
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

async function main() {
    const extraData = await contract.methods.transferOwnership("1", "abc");
    const data = extraData.encodeABI()
    const nonce = await web3.eth.getTransactionCount(walletAdd, 'latest'); // nonce starts counting from 0

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
            console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
        } else {
            console.log("❗Something went wrong while submitting your transaction:", error)
        }
    });
}

main();