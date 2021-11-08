<template>
    <b-card bg-variant="light" class="w-75 mx-auto" title="Submit Commitment">
      <b-row>
        0x7797728c180152c98787351a531526a508fe814c, 0x7567d83b7b8d80addcb281a71d54fc7b3364ffed, 0xd3ae78222beadb038203be21ed5ce7c9b1bff602
      </b-row>
        <b-row>
            <b-col>
                <b-form-input
                type="text" v-model="commitmentHash"
                placeholder="Enter Commitment Hash"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input
                type="text" v-model="address"
                placeholder="Enter Address"></b-form-input>
            </b-col>
            <b-col>
                <b-button @click="submitCommitment">Submit Commitment</b-button>
            </b-col>
        </b-row>
    </b-card>
</template>

<script lang="ts">
import Vue from "vue";
import {
  methodOfAnonymousVoting,
  extractValueFromDecoded
} from "../contracts/utils";
import Connex from "@vechain/connex"

const connex = new Connex({
    node: 'https://testnet.veblocks.net/',
    network: 'test'
})
const vendor = new Connex.Vendor('test') //'main','test' or genesis ID if it's private network
const delay = require("delay");
export default Vue.extend({
  data() {
    return {
      commitmentHash: "",
      address: ""
    };
  },
  methods: {
    async submitCommitment() {
    if(this.address=="0x7797728c180152c98787351a531526a508fe814c"){
        this.commitmentHash = "0x7b2434e558ebefb2a0eb0227b94c34e22a5cca2f10ef38d0d3965f353eb394ec"
    }
    if(this.address=="0x7567d83b7b8d80addcb281a71d54fc7b3364ffed"){
        this.commitmentHash = "0x4cb76d55641d2572e30c8df7fd5856f2610446348260d2c0d12c00aa305ae63d"
    }
    if(this.address=="0xd3ae78222beadb038203be21ed5ce7c9b1bff602"){
        this.commitmentHash = "0x5c7d52d1b67bef915526fc6221749eb49d2245a7718f96d83ec4242774df7bf0"
    }
      let clause = await methodOfAnonymousVoting("submitCommitment")!.asClause(
        this.commitmentHash
      );
      let message = [];
      message.push({ ...clause, comment: "submit commitment clause" });
      let signResult = await connex.vendor
        .sign("tx", message)
        .comment("submit commitment tx")
        .signer(this.address)
        .request();
      console.log("request result: ", signResult);
      await delay(12000);
      const tx = connex.thor.transaction(signResult.txid);
      console.log("tx  is: ", tx);
      let receipt = await tx.getReceipt();
      if (receipt) {
        let txReverted = receipt.reverted;
        if (!txReverted) {
          console.log("receipt: ", receipt);
        } else {
          alert("fail to submit commitment");
        }
      }
    },
    async getCommitment() {
      let VMOutput = await methodOfAnonymousVoting("getVoter")!
        .caller(this.address)
        .call();
      console.log("vm output of get voter: ", VMOutput);
      if (VMOutput && !VMOutput.reverted) {
        let commitment = extractValueFromDecoded(VMOutput, "2");
        if (commitment != "0") {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }
});
</script>
