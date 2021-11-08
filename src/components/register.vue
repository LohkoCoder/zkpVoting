<template>
    <b-card bg-variant="light" class="w-75 mx-auto" title="Registration">
      <b-row>
        0x7797728c180152c98787351a531526a508fe814c, 0x7567d83b7b8d80addcb281a71d54fc7b3364ffed, 0xd3ae78222beadb038203be21ed5ce7c9b1bff602
      </b-row>
    <b-row class="mb-3">
        <b-col class = "mb-3">
        <b-form-input v-model="xG1"
            type="text"
            placeholder="1st Public Key"></b-form-input>
        </b-col>
        <b-col class = "mb-3">
        <b-form-input v-model="xG2" 
            type="text"
            placeholder="2nd public key"></b-form-input>
        </b-col>
    <!-- second row -->
    </b-row>
        <b-row class="mb-3">
        <b-col class = "mb-3">
        <b-form-input v-model="vG1"
            type="text"
            placeholder="ZKP arg 1 for voting pub key"></b-form-input>
        </b-col>
        <b-col class = "mb-3">
        <b-form-input v-model="vG2"
            type="text"
            placeholder="voting public key ZKP arg 2"></b-form-input>
        </b-col>
        <b-col class = "mb-3">
        <b-form-input v-model="vG3"
            type="text"
            placeholder="voting pub key ZKP arg 3"></b-form-input>
        </b-col>
    </b-row>
    <!-- third row -->
        <b-row class="mb-3">
        <b-col class = "mb-3">
        <b-form-input v-model="r"
            type="text"
            placeholder="ZKP Itself"></b-form-input>
        </b-col>
        <b-col class = "mb-3">
        <b-form-input v-model="registrant"
            type="text"
            placeholder="Registrant's Address"></b-form-input>
        </b-col>
        <!-- <b-col class = "mb-3">
        <b-form-input v-model="deposit"
            type="text"
            placeholder="Deposit"></b-form-input>
        </b-col> -->
    </b-row>
    <b-row class="mb-3 justify-content-md-center">
        <b-button @click="register" class="w-50 p-3 mb-1 bg-secondary">Register</b-button>
    </b-row>
    <!-- <b-table striped boarderd outlined small responsive :fields="initiateFields"></b-table> -->
</b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  methodOfAnonymousVoting,
  extractValueFromDecoded
} from "../contracts/utils";
const delay = require("delay");
import Connex from "@vechain/connex"

const connex = new Connex({
    node: 'https://testnet.veblocks.net/',
    network: 'test'
})
const vendor = new Connex.Vendor('test') //'main','test' or genesis ID if it's private network

@Component
export default class register extends Vue {
  @Prop() private msg!: string;

  registrant = "";
  xG1 = "";
  xG2 = "";
  vG1 = "";
  vG2 = "";
  vG3 = "";
  r = "";

  created() {
    // this.getVoter()
    // this.getEligible()
  }
  async getVoter() {
    let VMOutput = await methodOfAnonymousVoting("getVoter")!.caller(this.registrant)
      .call();
    console.log("vm output of get voter: ", VMOutput);
    if (VMOutput&&!VMOutput.reverted) {
      let publicKey = extractValueFromDecoded(VMOutput, "0");
        if(publicKey[0]!="0"&&publicKey[1]!="0"){
          return true
        } else{
            return false
        }
    }else{
        return false
    }
  }
  async getEligible(){
    let VMOutput = await methodOfAnonymousVoting("getEligible")!
    .caller("0x6A480C078BfA88aC6a4D323E7D9B00c94CB9eC22")
    .call();
    console.log("vm output of get eligible: ", VMOutput);
  }
  //     async beginSignUp(){
  //     let clause = await methodOfAnonymousVoting("beginSignUp")!.asClause(
  //         this.question, this.enableCP, this.finishSUP, this.endSUP, this.endCP, this.endVP, this.endRP, this.deposit
  //     );
  //     let message = [];
  //     message.push({ ...clause, comment: "test comment" });
  //     let signResult = await connex.vendor
  //       .sign("tx")
  //       .signer("0x6A480C078BfA88aC6a4D323E7D9B00c94CB9eC22")
  //       .comment("begin sign up")
  //       .request(message);
  //     console.log("request result: ", signResult);
  //     const tx = connex.thor.transaction(signResult.txId);
  //     console.log("tx  is: ", tx);
  //     await delay(12000)
  //     let receipt = await tx.getReceipt();
  //     if (receipt) {
  //       let txReverted = receipt.reverted;
  //       if (!txReverted) {
  //         let questionStatus = await this.getQuestion()
  //         if(questionStatus)
  //             alert("has successfully signed up")
  //         else
  //             alert("fail to sign up")
  //       } else {
  //         alert("fail to sign up")
  //       }
  //     }
  //   }
  async register() {
    console.log('registrant: ', this.registrant)
    console.log('vG1', this.vG1)
    if(this.registrant == "0x7797728c180152c98787351a531526a508fe814c"){
        this.xG1 = "29590130514932554806641080735332723266829587531681790637485882445862259011986"
        this.xG2 = "61167260634602923745186157492879458666896165688679032872243742321093151017586"
        this.r = "99084052218692724197719510588949394446601638139001831460159220477878805639223"
        this.vG1 = "105837836065535652128400492995648521423521406984184914675071442232634520137912"
        this.vG2 = "3030312356737950808560910792228758720346081479382604656782692855819898362285"
        this.vG3 = "1"
    }

    if(this.registrant == "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed"){
        this.xG1 = "17157104938316039559881563838880895120682998433435816733280344609839998288514"
        this.xG2 = "109891285209134945571221796685445702050711671362834643803197090073699903409756"
        this.r = "37685733357632496339424861187648113671443335202258296039413631041392943533683"
        this.vG1 = "2415611098568606506184716372674690170286302556206543610831669559070520425725"
        this.vG2 = "29603408056581905571083564602849002361129376566788044988806149850642901915050"
        this.vG3 = "1"
    }

    if(this.registrant == "0xd3ae78222beadb038203be21ed5ce7c9b1bff602"){
        this.xG1 = "47721061848867774723144757710291789226461563624530361782882746205774254314993"
        this.xG2 = "75909239257779274342645304713198022969065228547417309104716850297107166051860"
        this.r = "84491243570103960721119991457534953171783795875837279005331136604590257903345"
        this.vG1 = "85205526516045204822368525125143345446842027685443282439384429408586916436229"
        this.vG2 = "68408538249208274184583019345856189623323450652213880163783583219855083864844"
        this.vG3 = "1"
    }

    let clause = await methodOfAnonymousVoting("register")!.asClause(
      [this.xG1, this.xG2],
      [this.vG1, this.vG2, this.vG3],
      this.r
    );
    let message = [];
    message.push({ ...clause, comment: "register" });
    let signResult = await connex.vendor
      .sign("tx", message)
      .signer(this.registrant)
      .comment("registeration")
      .request();
    console.log("request result: ", signResult);
    await delay(12000);
    const tx = connex.thor.transaction(signResult.txid);
    console.log("tx  is: ", tx);
    let receipt = await tx.getReceipt();
    if (receipt) {
      let txReverted = receipt.reverted;
      console.log('register receipt: ', receipt)
      if (!txReverted) {
        let voterStatus = await this.getVoter()
        console.log("voter status: ", voterStatus)
        if(voterStatus){
            alert("has successfully registered");
        }else{
            alert("Invalid ZKP parameters");
        }
      } else {
        alert("fail to register");
      }
    }
  }



}
</script>
