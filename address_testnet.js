let bitcoinlib = require('bitcoinjs-lib');
let fs = require('fs');
let address, priv, pub, keyPair;
const network = bitcoinlib.networks.testnet
while (true) {
    do {
        keyPair = bitcoinlib.ECPair.makeRandom({ network: network })
        priv = keyPair.privateKey.toString('hex')
        pub = keyPair.publicKey.toString('hex')
        let pubkeys = [
            '0252ed8a162cd96c4f3d170a69c068ad0484b019f0afa6bc7a5ae1d9e33ca20c7b',
            '03c4b9cf86bce9a5ace753ccef536e1c67ae0acfdf1104a4852c5e65a00bc882c2',
            '0331403647fad76bef7a44ec13a2b870d173734c84f0b44b7e35ef503382b2cad8',
            pub
        ].map((hex) => Buffer.from(hex, 'hex'));
        address = bitcoinlib.payments.p2sh({
            redeem: bitcoinlib.payments.p2ms({ m: 3, pubkeys, network: network}),
            network: network
        }).address
        console.log(address)
    } while (!/^2.[a-z]HPE?[acemnopqrsuvwxyz]/g.test(address))
    console.log(priv, pub, address)
    fs.appendFileSync('file_testnet.txt',`${priv},${pub},${address}\n`)
}
