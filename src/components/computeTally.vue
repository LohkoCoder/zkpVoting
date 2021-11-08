<template>
    <b-card bg-variant="light" class="w-75 mx-auto mb-5" title="Compute Total Positive Votes">
        <b-row class="justify-content-md-center">
            <b-col>
                <b-button @click="computeTally">Compute Tally</b-button>
            </b-col>
            <b-col>
                <b-button @click="getFinalTally">getFinalTally</b-button>
            </b-col>
            <b-col>
                <b-button @click="getFinalTally">Clear</b-button>
            </b-col>
        </b-row>
    </b-card>
</template>
<script lang="ts">
import Vue from "vue";
import { methodOfAnonymousVoting, extractValueFromDecoded } from "../contracts/utils";
import Connex from "@vechain/connex"

const connex = new Connex({
    node: 'https://testnet.veblocks.net/',
    network: 'test'
})
const vendor = new Connex.Vendor('test') //'main','test' or genesis ID if it's private network
const delay = require("delay");
export default Vue.extend({
  methods: {
    async computeTally() {
      let clause = methodOfAnonymousVoting("computeTally")!.asClause();
      let message = [];
      message.push({ ...clause, comment: "compute total clause" });
      // console.log("callResult: ", callResult)
      let signResult = await connex.vendor
        .sign("tx", message)
        .comment("computeTally clause")
        .signer("0x6A480C078BfA88aC6a4D323E7D9B00c94CB9eC22")
        .request();
      console.log("sign result: ", signResult);
      await delay(12000);
      const tx = connex.thor.transaction(signResult.txid);
      console.log("tx  is: ", tx);
      let receipt = await tx.getReceipt();
      console.log("receipt: ", receipt);
      // console.log('receipt is: ', receipt)
      if (receipt) {
        let txReverted = receipt.reverted;
        if (!txReverted) {
          console.log("receipt: ", receipt);
          alert("finish computing the Tally")
        } else {
          alert("fail to compute total");
        }
      }
    },
    async getFinalTally(){
        let VMOutput = await  methodOfAnonymousVoting("getFinalTally")!.call()
        let message = [];
        console.log("VM Output: ", VMOutput)
        let affirmativeVote = extractValueFromDecoded(VMOutput, "0")
        alert("The Number of Affirmative Votes is: "+affirmativeVote)
    }
  }
});
</script>
