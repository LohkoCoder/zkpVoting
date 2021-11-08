<template>
<div id="app">
    <div id="nav">
        <router-link to="/">Local Crypto</router-link> |
        <router-link to="/commitment">Local Crypto To Generate Commitment</router-link> |
        <router-link to="/voter">Anonymous Voting for Voter</router-link> |
        <router-link to="/owner">Anonymous Voting for Owner</router-link>
    </div>
    <router-view />
</div>
</template>

<script lang="ts">
import Vue from "vue";
import { BigNumber } from "bignumber.js";
import { methodOfLocalCrypto, methodOfHelloWorld } from "./contracts/utils";
import Connex from '@vechain/connex'

const delay = require("delay");
var systemMsg = "";
var showSystemMsg = false;
var sysAlertType = "primary";
var initErrored = false;
const connex = new Connex({
    node: 'https://testnet.veblocks.net/',
    network: 'test'
})
const vendor = new Connex.Vendor('test') //'main','test' or genesis ID if it's private network

export default Vue.extend({
  created() {
    if (!connex) {
      console.log("No Connex");
    } else {
      console.log("has connex");
      // this.sendTx()
      // this.executeContractCode();
    }
  },
  methods: {
    async sendTx() {
      // let clause = [];
      let message = [];
      let tokenValue = "0x" + new BigNumber(3).dp(0).toString(16);
      message.push({
        to: "0x6cd336cd6766fc8370821166325fb9e8e4a986b6",
        value:
          "0x0000000000000000000000000000000000000000000000000000000000000010",
        data: "",
        comment: "test comment for a clause"
      });

      console.log("clause: ", message);
      let signOptions = {
        signer: "0x6a480c078bfa88ac6a4d323e7d9b00c94cb9ec22",
        gas: 30000
      };
      let signResult = await vendor.sign("tx", message)
        .comment("test message for the first tx")
        .signer("0x6a480c078bfa88ac6a4d323e7d9b00c94cb9ec22")
        .gas(300000)
        .request();
      console.log("sign result is: ", signResult);
    },
    async executeContractCode() {
      let paramNum = 119
      let param = paramNum.toString(16)
      param = param.substr(2)
      while (param.length < 64) {
        param = "0"+param
      }
      param = "0x" + param
      // const VMOutput = await methodOfLocalCrypto("getMul")!.call(119);
      const VMOutput = await methodOfHelloWorld("renderHelloWorld")!.call();
      console.log('vm output: ', VMOutput)
    }
  }
});
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
