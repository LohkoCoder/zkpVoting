<template>
    <b-card bg-variant="light" class="w-75 mx-auto" title="Finish Registration Phase">
        <b-button @click="finishRegistration">Finish</b-button>
    </b-card>
</template>

<script lang="ts">
import Vue from 'vue'
import {methodOfAnonymousVoting, extractValueFromDecoded} from "../contracts/utils"
import Connex from "@vechain/connex"

const connex = new Connex({
    node: 'https://testnet.veblocks.net/',
    network: 'test'
})
const vendor = new Connex.Vendor('test') //'main','test' or genesis ID if it's private network

const delay = require("delay")
export default Vue.extend({
    methods: {
    async finishRegistration() {
        console.log("finish registration phase")
        let clause = await methodOfAnonymousVoting(
        "finishRegistrationPhase"
        )!.asClause();
        let message = [];
        message.push({ ...clause, comment: "finish registration phase" });
        let signResult = await connex.vendor
        .sign("tx", message)
        .signer("0x6A480C078BfA88aC6a4D323E7D9B00c94CB9eC22")
        .comment("finish registration transaction")
        .request();
        console.log("request result: ", signResult);
        await delay(12000);
        const tx = connex.thor.transaction(signResult.txid);
        console.log("tx  is: ", tx);
        let receipt = await tx.getReceipt();
        if (receipt) {
        let txReverted = receipt.reverted;
        if (!txReverted) {
            let voterStatus = await this.getVoterAfterRegistrationPhase();
            if(voterStatus){
                alert("has successfully finished registration phase.");
            } else{
                alert("fail to finish the registration phase.")
            }
        } else {
            alert("fail to finish registration phase.");
        }
        }
  },
  // Once finishing registration, voters should be able to have reconstructed public keys.
  async getVoterAfterRegistrationPhase() {
    let randomCaller = "";
    let VMOutput = await methodOfAnonymousVoting("getVoter")!
      .caller("0x7797728c180152c98787351a531526a508fe814c")
      .call();
    if (VMOutput && !VMOutput.reverted) {
      let reconstructedPublicKey = extractValueFromDecoded(VMOutput, "1"); // this array contrains the reconstructed keys
      if (reconstructedPublicKey[0] != "0" && reconstructedPublicKey[1] != "0") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

    }
})
</script>


