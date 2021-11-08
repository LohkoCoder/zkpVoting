const request = require("request");
import { secp256k1, blake2b256, abi, RLP, Transaction } from "thor-devkit";
const api = "http://localhost:8669";

export default class API {
  constructor() {}
  async bestBlockRef(): Promise<any> {
    var bestRef = "";
    return new Promise(function(resolve, reject) {
      request(
        api + "/blocks/best",
        {
          method: "GET",
          json: true
        },
        function(error: any, response: any, body: any) {
          if (!error && response.statusCode == 200) {
            body = JSON.parse(JSON.stringify(body));
            console.log("body is: " + JSON.stringify(body));
            var blockid = body.id;
            console.log("blockid: ", blockid);
            blockid = blockid.substr(2);
            for (var i = 0; i < 16; i++) {
              bestRef = bestRef + blockid[i];
            }
            resolve(bestRef);
          } else {
            reject(error);
          }
        }
      );
    });
  }

  
  async sendTx(code: string, accountAddress: string, privateKey: string) {
    let url = api + "/transactions";
    let clauses = [
      {
        to: accountAddress,
        value: 0,
        data: code
      }
    ];
    var bestRef = await this.bestBlockRef(); // this is the latest block reference
    // Get the latest block height, which will be referenced to later on
    bestRef = "0x" + bestRef; // blockRef is the first 8 bytes of a specified block id;however if the block is a future block, the blockRef is the 4 bytes block height plus the 4 bytes 0.
    console.log("bestblockref:", bestRef);

    // Built the transaction body
    let txbody: Transaction.Body = {
      chainTag: 0x27, // Note that the chainTag for testnet is 0x27, which, in mainnet, is 0x4a
      blockRef: bestRef,
      expiration: 100, // This specifies the transaction expires in 100 blocks.
      clauses: clauses,
      gasPriceCoef: 180,
      gas: 100000, // Note that the gas here refers to the gas limit.
      dependsOn: null,
      nonce: "0x29c257e36ea6e72a"
    };
    let tx = new Transaction(txbody);
    let signingHash = blake2b256(tx.encode()); // Hash the transaction content.
    let newPriKey = privateKey.substr(2); // Get rid of the '0x' prefix
    tx.signature = secp256k1.sign(
      signingHash,
      Buffer.from(newPriKey, "hex")
    );

    let raw = tx.encode(); // Note that the raw transaction does not contain '0x' profit yet. When actually sending a transaction, '0x' prefix is needed.
    let decoded = Transaction.decode(raw);
    var options = {
      method: "POST",
      json: true,
      headers: [],
      body: {
        raw: "0x" + raw.toString("hex") // Remember to add the '0x' prefix for the raw data
      }
    };
    return new Promise(function(resolve, reject) {
      request(url, options, function(error: any, response: any, body: any) {
        if (!error && response.statusCode == 200) {
          body = JSON.parse(JSON.stringify(body));
          let txid: string = body.id;
          resolve(txid);
        } else {
          reject(error);
        }
      });
    });
  }
}
