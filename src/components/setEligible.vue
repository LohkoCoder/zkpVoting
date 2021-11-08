<template>
    <b-card bg-variant="light" class="w-75 mx-auto" title="Set Eligible Voting Addresses">
      <b-row>
        0x7797728c180152c98787351a531526a508fe814c, 0x7567d83b7b8d80addcb281a71d54fc7b3364ffed, 0xd3ae78222beadb038203be21ed5ce7c9b1bff602
      </b-row>
        <b-row class="mb-3">
            <b-col class="mb-3">
            <b-form-input v-model="eligibleAddress"
                type="text"
                placeholder="Enter The Address"></b-form-input>
            </b-col>
            <b-col class = "mb-3 justify-content-md-center">
            <b-button @click="addToTable(eligibleAddress)" class="w-25 p-3 mb-1 bg-secondary">Add</b-button>
            </b-col>
        </b-row>
        <b-row class="mb-3">
            <b-table striped boarderd outlined small responsive :fields="eligibleFields" :items="eligibleAddressList">
            </b-table>
        </b-row>
        <b-row class="justify-content-md-center">
            <b-button @click="setEligibleAdd" class="w-50 p-3 mb-1 bg-secondary">Set Eligible</b-button>
        </b-row>
        <!-- <b-row>
            <b-alert
                class="w-75 mx-auto"
                    :variant="eligibleStatus"
                    :show="eligibleInfo"
                    dismissible
                    fade>
            </b-alert>
        </b-row> -->
    </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { methodOfAnonymousVoting } from "../contracts/utils";
const delay = require("delay")
import Connex from "@vechain/connex"

const connex = new Connex({
    node: 'https://testnet.veblocks.net/',
    network: 'test'
})
const vendor = new Connex.Vendor('test') //'main','test' or genesis ID if it's private network

@Component
export default class setEligible extends Vue {
  @Prop() private msg!: string;
  eligibleFields = {
    address: {
      label: "Address"
    },
    remove: {
      label: "Remove"
    }
  };
  eligibleAddress = "";
  eligibleAddressList: Array<{}> = [];
  eligibleAddresses: Array<string> = [];
  charityTxt = "";
  votingContractAdd = this.$store.state.anonymousVotingAdd;
  addToTable(_eligibleAddress: string) {
    if (_eligibleAddress.length == 42) {
      console.log("eligible address going to be added is: ", _eligibleAddress);
      this.eligibleAddresses.push(_eligibleAddress);
      this.eligibleAddressList.push({
        address: _eligibleAddress,
        remove: "remove"
      });
    }
  }
  async setEligibleAdd() {
    let clause = await methodOfAnonymousVoting("setEligible")!.asClause(
      this.eligibleAddresses
    );
    let message = [];
    message.push({ ...clause, comment: "test comment" });
    let signResult = await connex.vendor
      .sign("tx", message)
      .signer("0x6A480C078BfA88aC6a4D323E7D9B00c94CB9eC22")
      .comment("set eligible addresses")
      .request();
    console.log("request result: ", signResult);
    const tx = connex.thor.transaction(signResult.txid);
    console.log("tx  is: ", tx);
    await delay(12000)
    let receipt = await tx.getReceipt();
    if (receipt) {
      let txReverted = receipt.reverted;
      if (!txReverted) {
        alert("has successfully set eligible addresses.")
      } else{
        alert("fail to set eligible addresses.")
      }
    }
  }
}
</script>
