<template>
    <b-card bg-variant="light" class="w-75 mx-auto" title="Generate ZKP Params for Voting">
        <b-row>
            0x7797728c180152c98787351a531526a508fe814c, 0x7567d83b7b8d80addcb281a71d54fc7b3364ffed, 0xd3ae78222beadb038203be21ed5ce7c9b1bff602
        </b-row>
        <b-row>
            <b-col>
                <b-form-input v-model="xG1"
                type="text"
                placeholder="Enter 1st Public Key"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="xG2"
                type="text"
                placeholder="Enter 2nd Public Key"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input v-model="yG1"
                type="text"
                placeholder="Enter 1st reconstructed Public Key"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="yG2"
                type="text"
                placeholder="Enter 2nd reconstructed Public Key"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input v-model="w"
                type="text"
                placeholder="Enter w (One of the ZKP private keys)"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="r"
                type="text"
                placeholder="Enter r (One of the ZKP private keys)"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="d"
                type="text"
                placeholder="Enter d (One of the ZKP private keys)"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input v-model="x"
                type="text"
                placeholder="Enter Voting Private Key"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="address"
                type="text"
                placeholder="Enter Address"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-button @click="DeriveYesZKP">
                    DeriveYesZKP
                </b-button>
            </b-col>
            <b-col>
                <b-button @click="DeriveNoZKP">
                    DeriveNoZKP
                </b-button>
            </b-col>
        </b-row>
        Result of Voting ZKP (Need ZKP to prove that the specific vote is either 1/0)
        <b-row class="mt-3">
            <b-table striped hover :fields="tableFields" :items="items">

            </b-table>
        </b-row>
        <b-row class="mt-3">
            <b-table striped hover :fields="tableFields2" :items="items2">

            </b-table>
        </b-row>
    </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { methodOfAnonymousVoting, methodOfLocalCrypto, extractValueFromDecoded} from "../contracts/utils"
import { stat } from 'fs';
import { constants } from 'http2';
const web3 = require("web3")
@Component
export default class generateZKPforVote extends Vue{
@Prop() private msg!: string;

    xG1 = "";
    xG2 = "";
    yG1 = "";
    yG2 = "";
    w = "";
    r = "";
    d = "";
    x = "";
    address = ""
    param1 = ""
    param2 = ""
    param3 = ""
    param4 = ""
    xG1_ = ""  // xG1
    xG2_ = "" // xG2
    yG1_ = ""
    yG2_ = ""
    y1 = ""
    y2 = ""
    a11 = ""
    a12 = ""
    b11 = ""
    b12 = ""
    a21 = ""
    a22 = ""
    b21 = ""
    b22 = ""
    tableFields = {
        Parameter1: {
        label: "Parameter1"
        },
        Parameter2: {
        label: "Parameter2"
        }
    };
    tableFields2 = {
        Parameters: {
        label: "Parameters"
        }
    };
    items:Array<any> = []
    items2:Array<any> = []
    created(){

    }
        async getVoterRCK() { // Get the voter's reconstructed public key
            let randomCaller = "";
            let VMOutput = await methodOfAnonymousVoting("getVoter")!
            .caller(this.address)
            .call();
            if (VMOutput && !VMOutput.reverted) {
            let reconstructedPublicKey = extractValueFromDecoded(VMOutput, "1"); // this array contrains the reconstructed keys
            if (reconstructedPublicKey[0] != "0" && reconstructedPublicKey[1] != "0") {
                // this.yG1 = reconstructedPublicKey[0]
                // this.yG2 = reconstructedPublicKey[1]
                return true;
            } else {
                return false;
            }
            } else {
            return false;
            }
        }
        async DeriveYesZKP(){
            this.items = [];
            this.items2 = [];
            let status = await this.getVoterRCK();
            let xG = [this.xG1, this.xG2]
            let yG = [this.yG1, this.yG2]
            console.log('xG', xG)
            console.log('yG', yG)
        if(this.address == "0x7797728c180152c98787351a531526a508fe814c"){
            this.xG1 = "29590130514932554806641080735332723266829587531681790637485882445862259011986";
            this.xG2 = "61167260634602923745186157492879458666896165688679032872243742321093151017586";
            this.yG1 = "35792076529520953229353131586148532298980788308212624163778536979737302692355";
            this.yG2 = "94950399446266348863990298794498567108735945598861256319081039821774980362933";
            this.w = "263261302567651";
            this.r = "1253485092181";
            this.d = "121501251567932";
            this.x = "13188596311728";
        }
        if(this.address == "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed"){
            this.xG1 = "17157104938316039559881563838880895120682998433435816733280344609839998288514";
            this.xG2 = "109891285209134945571221796685445702050711671362834643803197090073699903409756";
            this.yG1 = "56730397839673004479802987301319372418577688012589536705290805242001220538469";
            this.yG2 = "47476848708433935202570307623784828341011596971554921665367445789610274096105";
            this.w = "253328336370367";
            this.r = "73081020225857";
            this.d = "12612159221097";
            this.x = "188170198748320";
        }
        if(this.address == "0xd3ae78222beadb038203be21ed5ce7c9b1bff602"){
            this.xG1 = "47721061848867774723144757710291789226461563624530361782882746205774254314993";
            this.xG2 = "75909239257779274342645304713198022969065228547417309104716850297107166051860";
            this.yG1 = "87909377989101966845318437069502860546247069802070190974049848277620938860739";
            this.yG2 = "83494099206451147506731061844957324128213470767244266284954774374793186624437";
            this.w = "132202926197985";
            this.r = "163124198670465";
            this.d = "208060647571638";
            this.x = "163358219250495";
        }
            if(status){
                console.log('w: '+this.w)
                console.log('r: '+this.r)
                console.log('d: '+this.d)
                let VMOutput = await methodOfLocalCrypto("create1outof2ZKPYesVote")!.caller(this.address)
                .call(xG, yG, this.w, this.r, this.d, this.x)
                if (VMOutput && !VMOutput.reverted) {
                    console.log("DeriveYes ZKP VMOutput: ", VMOutput)
                    this.y1 = extractValueFromDecoded(VMOutput, "res")[0]
                    this.y2 = extractValueFromDecoded(VMOutput, "res")[1]
                    this.a11 = extractValueFromDecoded(VMOutput, "res")[2]
                    this.a12 = extractValueFromDecoded(VMOutput, "res")[3]
                    this.b11 = extractValueFromDecoded(VMOutput, "res")[4]
                    this.b12 = extractValueFromDecoded(VMOutput, "res")[5]
                    this.a21 = extractValueFromDecoded(VMOutput, "res")[6]
                    this.a22 = extractValueFromDecoded(VMOutput, "res")[7]
                    this.b21 = extractValueFromDecoded(VMOutput, "res")[8]
                    this.b22 = extractValueFromDecoded(VMOutput, "res")[9]
                    this.param1 = extractValueFromDecoded(VMOutput, "res2")[0]
                    this.param2 = extractValueFromDecoded(VMOutput, "res2")[1]
                    this.param3 = extractValueFromDecoded(VMOutput, "res2")[2]
                    this.param4 = extractValueFromDecoded(VMOutput, "res2")[3]
                    this.items = []
                    this.items.push({
                        Parameter1: this.y1, 
                        Parameter2: this.y2
                        })
                    this.items.push({
                        Parameter1: this.a11, 
                        Parameter2: this.a12
                        })
                    this.items.push({
                        Parameter1: this.b11, 
                        Parameter2: this.b12
                        })
                    this.items.push({
                        Parameter1: this.a21, 
                        Parameter2: this.a22
                        })
                    this.items.push({
                        Parameter1: this.b21, 
                        Parameter2: this.b22
                        })
                    this.items2.push({Parameters: this.param1})
                    this.items2.push({Parameters: this.param2})
                    this.items2.push({Parameters: this.param3})
                    this.items2.push({Parameters: this.param4})

                }
            }
        }
        async DeriveNoZKP(){
            this.items = []
            this.items2 = []
            let status = await this.getVoterRCK();
        if(this.address == "0x7797728c180152c98787351a531526a508fe814c"){
            this.xG1 = "29590130514932554806641080735332723266829587531681790637485882445862259011986";
            this.xG2 = "61167260634602923745186157492879458666896165688679032872243742321093151017586";
            this.yG1 = "35792076529520953229353131586148532298980788308212624163778536979737302692355";
            this.yG2 = "35792076529520953229353131586148532298980788308212624163778536979737302692355";
            this.w = "263261302567651";
            this.r = "1253485092181";
            this.d = "121501251567932";
            this.x = "13188596311728";
        }
        if(this.address == "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed"){
            this.xG1 = "17157104938316039559881563838880895120682998433435816733280344609839998288514";
            this.xG2 = "109891285209134945571221796685445702050711671362834643803197090073699903409756";
            this.yG1 = "56730397839673004479802987301319372418577688012589536705290805242001220538469";
            this.yG2 = "47476848708433935202570307623784828341011596971554921665367445789610274096105";
            this.w = "253328336370367";
            this.r = "73081020225857";
            this.d = "12612159221097";
            this.x = "188170198748320";
        }
        if(this.address == "0xd3ae78222beadb038203be21ed5ce7c9b1bff602"){
            this.xG1 = "47721061848867774723144757710291789226461563624530361782882746205774254314993";
            this.xG2 = "75909239257779274342645304713198022969065228547417309104716850297107166051860";
            this.yG1 = "87909377989101966845318437069502860546247069802070190974049848277620938860739";
            this.yG2 = "83494099206451147506731061844957324128213470767244266284954774374793186624437";
            this.w = "132202926197985";
            this.r = "163124198670465";
            this.d = "208060647571638";
            this.x = "163358219250495";
        }
            if(status){
                console.log('w: '+this.w)
                console.log('r: '+this.r)
                console.log('d: '+this.d)
                // this.prikey = Math.round(Math.random()*500)
                let xG = [this.xG1, this.xG2]
                let yG = [this.yG1, this.yG2]
                let VMOutput = await methodOfLocalCrypto("create1outof2ZKPNoVote")!.caller(this.address).call(xG, yG, this.w, this.r, this.d, this.x)
                if (VMOutput && !VMOutput.reverted) {
                    console.log("DeriveNo ZKP VMOutput: ", VMOutput)
                    this.y1 = extractValueFromDecoded(VMOutput, "res")[0]
                    this.y2 = extractValueFromDecoded(VMOutput, "res")[1]
                    this.a11 = extractValueFromDecoded(VMOutput, "res")[2]
                    this.a12 = extractValueFromDecoded(VMOutput, "res")[3]
                    this.b11 = extractValueFromDecoded(VMOutput, "res")[4]
                    this.b12 = extractValueFromDecoded(VMOutput, "res")[5]
                    this.a21 = extractValueFromDecoded(VMOutput, "res")[6]
                    this.a22 = extractValueFromDecoded(VMOutput, "res")[7]
                    this.b21 = extractValueFromDecoded(VMOutput, "res")[8]
                    this.b22 = extractValueFromDecoded(VMOutput, "res")[9]
                    this.param1 = extractValueFromDecoded(VMOutput, "res2")[0]
                    this.param2 = extractValueFromDecoded(VMOutput, "res2")[1]
                    this.param3 = extractValueFromDecoded(VMOutput, "res2")[2]
                    this.param4 = extractValueFromDecoded(VMOutput, "res2")[3]
                    this.items = []
                    this.items.push({
                        Parameter1: this.y1, 
                        Parameter2: this.y2
                        })
                    this.items.push({
                        Parameter1: this.a11, 
                        Parameter2: this.a12
                        })
                    this.items.push({
                        Parameter1: this.b11, 
                        Parameter2: this.b12
                        })
                    this.items.push({
                        Parameter1: this.a21, 
                        Parameter2: this.a22
                        })
                    this.items.push({
                        Parameter1: this.b21, 
                        Parameter2: this.b22
                        })
                    this.items2.push({Parameters: this.param1})
                    this.items2.push({Parameters: this.param2})
                    this.items2.push({Parameters: this.param3})
                    this.items2.push({Parameters: this.param4})
                }
            }
        }
}
</script>
