<template>
    <b-card bg-variant="light" class="w-75 mx-auto" title="Begin Sign Up (Initiate a Vote)">
    <b-row class="mb-3">
        <b-col class = "mb-3">
        <b-form-input v-model="question"
            type="text"
            placeholder="Question"></b-form-input>
        </b-col>
        <b-col class = "mb-3">
        <b-form-input v-model="enableCP"
            type="text"
            placeholder="Enable Commitment Phase"></b-form-input>
        </b-col>
    <!-- second row -->
    <!-- </b-row> -->
    <!-- <b-row class="mb-3">
        <b-col class = "mb-3">
        <b-form-input v-model="finishSUP"
            type="text"
            placeholder="Finish Sign Up Phase"></b-form-input>
        </b-col>
        <b-col class = "mb-3">
        <b-form-input v-model="endSUP"
            type="text"
            placeholder="End Sign Up Phase"></b-form-input>
        </b-col>
        <b-col class = "mb-3">
        <b-form-input v-model="endCP"
            type="text"
            placeholder="End Commitment Phase"></b-form-input>
        </b-col>
    </b-row> -->
    <!-- third row -->
        <!-- <b-row class="mb-3"> -->
        <!-- <b-col class = "mb-3">
        <b-form-input v-model="endVP"
            type="text"
            placeholder="End Voting Phase"></b-form-input>
        </b-col>
        <b-col class = "mb-3">
        <b-form-input v-model="endRP"
            type="text"
            placeholder="End Refund Phase"></b-form-input>
        </b-col> -->
        <b-col class = "mb-3">
        <b-form-input v-model="deposit"
            type="text"
            placeholder="Deposit"></b-form-input>
        </b-col>
    </b-row>
    <b-row class="mb-3 justify-content-md-center">
        <b-button @click="beginSignUp" class="w-50 p-3 mb-1 bg-secondary">Begin Sign Up</b-button>
    </b-row>
    <!-- <b-table striped boarderd outlined small responsive :fields="initiateFields"></b-table> -->
</b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { methodOfAnonymousVoting, extractValueFromDecoded } from "../contracts/utils";
import Connex from '@vechain/connex'
const delay = require("delay")
const connex = new Connex({
    node: 'https://testnet.veblocks.net/',
    network: 'test'
})
const vendor = new Connex.Vendor('test') //'main','test' or genesis ID if it's private network

@Component
export default class beginSignUp extends Vue {
  @Prop() private msg!: string;
//   initiateFields = ["address"];
//   gapTxt = "";
//   charityTxt = "";

    question = "";
    enableCP = "";
    finishSUP = "";
    endSUP = "";
    endCP = "";
    endVP = "";
    endRP = "";
    deposit = "";

    created(){
        // this.getQuestion()
    }
    async getQuestion(){
        let VMOutput = await methodOfAnonymousVoting("getQuestion")!.caller("0x6A480C078BfA88aC6a4D323E7D9B00c94CB9eC22").call()
        console.log('vm output of get question: ', VMOutput)
        if(!VMOutput.reverted){
            let question = extractValueFromDecoded(VMOutput, '0')
            if(question !='No question set'){
                alert('question is: '+ question)
                return true
            } else {
                alert("No Question Has Been Set!!")
                return false
            }
        } else{
             alert('Fail to Get Question!')
             return false
        }
    }
    async beginSignUp(){    
    this.finishSUP = "20000"
    this.endSUP = "30000"
    this.endCP = "40000"
    this.endVP = "50000"
    this.endRP = "60000"
    let clause = await methodOfAnonymousVoting("beginSignUp")!.asClause(
        this.question, this.enableCP, this.finishSUP, this.endSUP, this.endCP, this.endVP, this.endRP, this.deposit
    );
    let message = [];
    message.push({ ...clause, comment: "begin sign up" });
    let signResult = await vendor
      .sign("tx", message)
      .signer("0x6A480C078BfA88aC6a4D323E7D9B00c94CB9eC22")
      .comment("begin sign up")
      .request();
    console.log("request result: ", signResult);
    await delay(12000)
    const tx = connex.thor.transaction(signResult.txid);
    console.log("tx  is: ", tx);
    let receipt = await tx.getReceipt();
    if (receipt) {
      let txReverted = receipt.reverted;
      if (!txReverted) {
        let questionStatus = await this.getQuestion()
        if(questionStatus)
            alert("has successfully signed up")
        else
            alert("fail to sign up")
      } else {
        alert("fail to sign up")
      }
    }
  }
}
</script>
