<template>
    <b-card bg-variant="light" class="w-75 mx-auto" title="Generate Keys and their ZKP Parameters">
        <b-row>
            0x7797728c180152c98787351a531526a508fe814c, 0x7567d83b7b8d80addcb281a71d54fc7b3364ffed, 0xd3ae78222beadb038203be21ed5ce7c9b1bff602
        </b-row>
        <b-row>
            <b-col>
                <b-form-input v-model="prikey"
                type="text"
                placeholder="Enter Voter's Voting Private Key"></b-form-input>
            </b-col>
            <b-col>
                <b-button @click="generateKeys">Generate</b-button>
            </b-col>

        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input v-model="caller"
                type="text"
                placeholder="Enter Voter's Address"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="v"
                type="text"
                placeholder="Enter ZKP Private Key"></b-form-input>
            </b-col>
            <b-col>
                <b-button @click="deriveZKP">Derive ZKP</b-button>
            </b-col>
        </b-row>
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { methodOfLocalCrypto, extractValueFromDecoded } from "../contracts/utils";
import { V4MAPPED } from 'dns';
import { BigNumber } from 'bignumber.js'

const web3 = require("web3")
const createKeccakHash = require('keccak')

@Component({
  components: {}
})
export default class generationService extends Vue {
    caller = "";
    prikey = "";
    xG1:number = 0;
    xG2:number = 0;
    v = "";
    r:number = 0;
    vG1:number = 0;
    vG2:number = 0;
    vG3:number = 0;
    async generateKeys() {
        let VMOutput = await methodOfLocalCrypto("getMul")!.call(this.prikey);
        console.log('vm output: ', VMOutput)
        this.xG1 = extractValueFromDecoded(VMOutput, '0')[0] // public key 1st
        this.xG2 = extractValueFromDecoded(VMOutput, '0')[1] // public key 2nd
        alert("Voting Private Key:"+this.prikey+"\n 1st Public Key: "+this.xG1+ "\n 2nd public Key: "+this.xG2)
    }
    async deriveZKP(){
        let hex = web3.utils.randomHex(6)
        let VMOutput = await methodOfLocalCrypto("createZKP")!.caller(this.caller).call(this.prikey, this.v, [this.xG1, this.xG2]);
        console.log('zkp vmoutput: ', VMOutput)
        this.r = extractValueFromDecoded(VMOutput, '0')[0] // zkp itself. 零知识证明本身
        this.vG1 = extractValueFromDecoded(VMOutput, '0')[1] // assist to verify the proof 
        this.vG2 = extractValueFromDecoded(VMOutput, '0')[2] // ~
        this.vG3 = extractValueFromDecoded(VMOutput, '0')[3] // ~
        alert("1st ZKP arg: "+this.r+"\n 2nd ZKP arg: "+this.vG1+"\n 3rd ZKP arg: "+ this.vG2+"\n 4th ZKP arg: "+this.vG3)
    }
}
</script>
