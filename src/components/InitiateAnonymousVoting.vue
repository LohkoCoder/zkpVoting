<template>
    <b-card bg-variant="light" class="w-75 mx-auto" title="Initiate Voting Contract">
        <!-- <b-row class="mb-3">
            <b-col class = "mb-3">
            <b-form-input v-model="gapTxt"
                type="text"
                placeholder="Enter The Gap"></b-form-input>
            </b-col>
            <b-col class = "mb-3">
            <b-form-input v-model="charityTxt"
                type="text"
                placeholder="Enter The Charity Address"></b-form-input>
            </b-col>
        </b-row> -->
        <b-row class="mb-3 justify-content-md-center">
            <b-button @click="deployAnonymousVoting">Deploy</b-button>
        </b-row>
        <!-- <b-table striped boarderd outlined small responsive :fields="initiateFields"></b-table> -->
    </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { configuration } from "../contracts/config";
const delay = require("delay")
import Connex from "@vechain/connex"

const connex = new Connex({
    node: 'https://testnet.veblocks.net/',
    network: 'test'
})
const vendor = new Connex.Vendor('test') //'main','test' or genesis ID if it's private network
@Component
export default class InitiateAnonymousVoting extends Vue {
  @Prop() private msg!: string;
  initiateFields = ["address"];
  gapTxt = "";
  charityTxt = "";
  async deployAnonymousVoting() {
    let txResult = await this.sendTx(configuration.signer1, "", "", configuration.anonymousVotingCode);
    if(txResult){
        let deployedContractAdd = txResult.outputs[0].contractAddress;
        await this.$store.dispatch('anonymousVoting', deployedContractAdd)
        console.log('anonymousVoting add is: ', deployedContractAdd)
        console.log("to explore the result: ", this.$store.state.anonymousVotingAdd)
    } else {
        alert("Fail to deploy the contract.")
    }
  }
  
  async sendTx(_from:string, _to:string, _value:string|number, _data:string) {
    // let clause = [];
    let message = [];
    // let tokenValue = "0x" + new BigNumber(3).dp(0).toString(16);
    message.push({
    to: _to,
    value: _value,
    data: _data,
    comment: "test comment for a clause"
    });
    console.log("clause: ", message);
    // let signOptions = {
    // signer: "0x6a480c078bfa88ac6a4d323e7d9b00c94cb9ec22",
    // gas: 5000000
    // };
    let signResult = await connex.vendor
    .sign("tx", message)
    .comment("test message for the first tx")
    .signer(_from)
    .gas(5000000)
    .request();
    console.log("sign result is: ", signResult);
    const tx = connex.thor.transaction(signResult.txid)
    console.log("tx  is: ", tx);
    await delay(12000)
    let receipt = await tx.getReceipt()
        if(receipt){
            let txReverted = receipt.reverted
        if(!txReverted){
            return receipt
        }
        return null
    }
  }
}
</script>
