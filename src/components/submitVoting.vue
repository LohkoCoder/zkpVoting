<template>
    <b-card bg-variant="light" class="w-75 mx-auto" title="Submit Voting">
        <b-row>
            0x7797728c180152c98787351a531526a508fe814c, 0x7567d83b7b8d80addcb281a71d54fc7b3364ffed, 0xd3ae78222beadb038203be21ed5ce7c9b1bff602
        </b-row>
        <b-row>
            <b-col>
                <b-form-input v-model="param1"
                type="text"
                placeholder="Enter Param1"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="param2"
                type="text"
                placeholder="Enter Param2"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="param3"
                type="text"
                placeholder="Enter Param3"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="param4"
                type="text"
                placeholder="Enter Param4"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input v-model="y1"
                type="text"
                placeholder="Enter y1"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="y2"
                type="text"
                placeholder="Enter y2"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input v-model="a11"
                type="text"
                placeholder="Enter a11"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="a12"
                type="text"
                placeholder="Enter a12"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input v-model="b11"
                type="text"
                placeholder="Enter b11"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="b12"
                type="text"
                placeholder="Enter b12"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input v-model="a21"
                type="text"
                placeholder="Enter a21"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="a22"
                type="text"
                placeholder="Enter a22"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input v-model="b21"
                type="text"
                placeholder="Enter b21"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="b22"
                type="text"
                placeholder="Enter b22"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3 justify-content-md-center">
            <b-col>
                <b-form-input v-model="address"
                type="text"
                placeholder="Enter Address"></b-form-input>            
            </b-col>
            <b-col>
                <b-button @click="submitVoting">SubmitVoting</b-button>
            </b-col>
        </b-row>
    </b-card>
</template>
<script lang="ts">
import Vue from "vue";
import { methodOfAnonymousVoting } from "../contracts/utils";
const delay = require("delay");
import Connex from "@vechain/connex"

const connex = new Connex({
    node: 'https://testnet.veblocks.net/',
    network: 'test'
})
const vendor = new Connex.Vendor('test') //'main','test' or genesis ID if it's private network

export default Vue.extend({
  data() {
    return {
      param1: "",
      param2: "",
      param3: "",
      param4: "",
      y1: "",
      y2: "",
      a11: "",
      a12: "",
      b11: "",
      b12: "",
      a21: "",
      a22: "",
      b21: "",
      b22: "",
      address: ""
    };
  },
  methods: {
    async submitVoting() {
      if (this.address == "0x7797728c180152c98787351a531526a508fe814c") {
        (this.param1 = "121501251567932"),
          (this.param2 =
            "112770205965846405653052854696967772842536851845423514140675390792620156097319"),
          (this.param3 = "1253485092181"),
          (this.param4 =
            "18886577458933043043222073728257972206692436841655724166872598990690909047855"),
          (this.y1 =
            "88114235599026244608156727676889327792650883774967354641739120209959431433340");
        this.y2 =
          "104028118168296383510272342700958867243162938989406893586017463477269830259843";
        this.a11 =
          "102548254275709837463295173358676342231695038240668289928673591080375151724927";
        this.a12 =
          "106699660887486484902830008838919257298106283796553804169421012722416840661675";
        this.b11 =
          "93080684372875533018057282336896653809278104662124954081982723125612654857614";
        this.b12 =
          "30556776584075973230600219168759054559601057330044209564700692614397918346764";
        this.a21 =
          "29151644620116343040142676430705379899653253293118414476231424012905272678263";
        this.a22 =
          "74153191225753640468530196514632080467164652315613915363922741139108372957904";
        this.b21 =
          "12699860815814583178958210547416800651878744376020901817826410403778594704341";
        this.b22 =
          "50523885030232786387471837499245186575898889420041204982597127442629703971163";
      }
      if (this.address == "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed") {
        (this.param1 = "12612159221097"),
          (this.param2 =
            "64517686932207320962818975570491866362169736872313348487344192361569775974585"),
          (this.param3 = "73081020225857"),
          (this.param4 =
            "103316988684418254222839157204977622955201207820671101551810615989265745086565"),
          (this.y1 =
            "109337345161139564933336173355682120608817829911557737036137387514882944326249");
        this.y2 =
          "80279829053129157346862660594251474356541362241017610226980582779224172114297";
        this.a11 =
          "93802504506329941027416966815222706710961002729085314579531657418421158055825";
        this.a12 =
          "25803096036005261844563722346779208837293164104588839830181045508601881793744";
        this.b11 =
          "68304628373796161444844613893003346110668950552631473989807951971309751296517";
        this.b12 =
          "88386924583969895387853790167269819233194164227536720334296135367986425229971";
        this.a21 =
          "30232045589077219673334205107809792736411104861502639232162650624487997005925";
        this.a22 =
          "31073113318940408936613659654096983175463354110985888062454984492232700749842";
        this.b21 =
          "18513299540388611814182877759453160808721776938563129406816435150438172393551";
        this.b22 =
          "25730769057142619455425123843873710292160393810377064176067346628290592684471";
      }
      if (this.address == "0xd3ae78222beadb038203be21ed5ce7c9b1bff602") {
        (this.param1 =
          "59857986206827382862109364752700507145784765043050277285665135763256589568"),
          (this.param2 = "208060647571638"),
          (this.param3 =
            "38502904040819045867635128589025565807178100491876819345879042200198392543530"),
          (this.param4 = "163124198670465"),
          (this.y1 =
            "45628367131865709192902833814993690224084817654987305635527401196348785871530");
        this.y2 =
          "17338402332533940938896469130394232573323255226473196786915055679058089877021";
        this.a11 =
          "14452558463739121631316445382956136580244728973797922519020321895140474309219";
        this.a12 =
          "24974380038713550955069185019485716451706568309968904795685771578106126081576";
        this.b11 =
          "80691328206165821994038522627476490653834781955153170557578226941958456999818";
        this.b12 =
          "87282088375753712205575096347471526082963788690577596645755340491660678383263";
        this.a21 =
          "94501914338690473014614790875142709508675988008095722281075122928538759949764";
        this.a22 =
          "13006678567410657595365459526484129692784664932176326314422698419309780575947";
        this.b21 =
          "100365525006094812965529828154303197285757501093170034698833354095169775560947";
        this.b22 =
          "11419005589545845513282808416279350301518960306942926182424244510101214306731";
      }
      let clause = await methodOfAnonymousVoting("submitVote")!.asClause(
        [this.param1, this.param2, this.param3, this.param4],
        [this.y1, this.y2],
        [this.a11, this.a12],
        [this.b11, this.b12],
        [this.a21, this.a22],
        [this.b21, this.b22]
      );
      let message = [];
      message.push({ ...clause, comment: "submit voting clause" });
      let signResult = await vendor
        .sign("tx", message)
        .comment("submit commitment tx")
        .signer(this.address)
        .request();
      console.log("request result: ", signResult);
      await delay(12000);
      const tx = connex.thor.transaction(signResult.txid);
      console.log("tx  is: ", tx);
      let receipt = await tx.getReceipt();
      // console.log('receipt is: ', receipt)
      if (receipt) {
        let txReverted = receipt.reverted;
        if (!txReverted) {
          console.log("receipt: ", receipt);
        } else {
          alert("fail to submit commitment");
        }
      }
    }
  }
});
</script>
