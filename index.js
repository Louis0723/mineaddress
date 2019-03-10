let bitcoinlib = require('bitcoinjs-lib');
let fs = require('fs');

let address, priv, pub, keyPair;
const network = bitcoinlib.networks.testnet
do {
    keyPair = bitcoinlib.ECPair.makeRandom({ network: network })
    priv = keyPair.privateKey.toString('hex')
    pub = keyPair.publicKey.toString('hex')
    address = bitcoinlib.payments.p2pkh({ pubkey: keyPair.publicKey, network: network }).address;
} while (!/^(1|[mn].)HPE[acemnopqrsuvwxyz]/g.test(address))
console.log(keyPair.toWIF())
console.log(priv, pub, address)
fs.appendFileSync('admin.txt', `${priv},${pub},${address}\n`)