let bitcoinlib = require('bitcoinjs-lib');
let fs = require('fs');
let address, priv, pub, keyPair;
const network = bitcoinlib.networks.bitcoin
while (true) {
    do {
        keyPair = bitcoinlib.ECPair.makeRandom({ network: network })
        priv = keyPair.privateKey.toString('hex')
        pub = keyPair.publicKey.toString('hex')
        let pubkeys = [
            '02e08c2e6b7f7bf5660f0bb0fd0d1c971bf749f3839c09f6bb60eee43088d1c9e7',
            '03e22d0301684b4d5acfbea50ff4f056d3f7057aa32a94313008eba64904757fcc',
            '030ddf99de049d69cd7f380857789a082ec5ed11ebc847feccc49a258012ac2056',
            pub
        ].map((hex) => Buffer.from(hex, 'hex'));
        address = bitcoinlib.payments.p2sh({
            redeem: bitcoinlib.payments.p2ms({ m: 3, pubkeys, network: network}),
            network: network
        }).address
    } while (!/^3HPE[acemnopqrsuvwxyz]/g.test(address))
    console.log(priv, pub, address)
    fs.appendFileSync('file.txt',`${priv},${pub},${address}\n`)
}
