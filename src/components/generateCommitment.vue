<template>
    <b-card bg-variant="light" class="w-75 mx-auto" title="Generate Commitments">
        <b-row>
            0x7797728c180152c98787351a531526a508fe814c, 0x7567d83b7b8d80addcb281a71d54fc7b3364ffed, 0xd3ae78222beadb038203be21ed5ce7c9b1bff602
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input
                type="text" v-model="params1"
                placeholder="Enter Params[1]"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input
                type="text" v-model="params2"
                placeholder="Enter Params[2]"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input
                type="text" v-model="params3"
                placeholder="Enter Params[3]"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input
                type="text" v-model="params4"
                placeholder="Enter Params[4]"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input
                type="text" v-model="xG1_"
                placeholder="Enter Public Key 1"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input
                type="text" v-model="xG2_"
                placeholder="Enter Public Key 2"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input
                type="text" v-model="yG1_"
                placeholder="Enter reconstructed Public Key 1"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input
                type="text" v-model="yG2_"
                placeholder="Enter reconstructed Public Key 2"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input
                type="text" v-model="y1"
                placeholder="Enter y[1]"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input
                type="text" v-model="y2"
                placeholder="Enter y[2]"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input
                type="text" v-model="a11"
                placeholder="Enter a1[1]"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input
                type="text" v-model="a12"
                placeholder="Enter a1[2]"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input
                type="text" v-model="b11"
                placeholder="Enter b1[1]"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input
                type="text" v-model="b12"
                placeholder="Enter b1[2]"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input
                type="text" v-model="a21"
                placeholder="Enter a2[1]"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input
                type="text" v-model="a22"
                placeholder="Enter a2[2]"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input
                type="text" v-model="b21"
                placeholder="Enter b2[1]"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input
                type="text" v-model="b22"
                placeholder="Enter b2[2]"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-input
                type="text" v-model="address_"
                placeholder="Enter Address"></b-form-input>
            </b-col>
            <b-col>
                <b-button @click="commitToVote">GenerateCommitment</b-button>
            </b-col>
        </b-row>
    </b-card>
</template>
<script lang="ts">
import Vue from 'vue'
import {  methodOfLocalCrypto, extractValueFromDecoded} from "../contracts/utils"

export default Vue.extend({
    data(){
        return{
            params1: "",
            params2: "",
            params3: "",
            params4: "",
            xG1_: "",  // xG1
            xG2_: "", // xG2
            yG1_: "",
            yG2_: "",
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
            address_: ""          
        }
    },
    methods:{
            async commitToVote(){
            if(this.address_=="0x7797728c180152c98787351a531526a508fe814c"){
                this.params1 = "121501251567932",
                this.params2 = "112770205965846405653052854696967772842536851845423514140675390792620156097319",
                this.params3 = "1253485092181",
                this.params4 = "18886577458933043043222073728257972206692436841655724166872598990690909047855",
                this.xG1_ = "29590130514932554806641080735332723266829587531681790637485882445862259011986",  // xG1
                this.xG2_ = "61167260634602923745186157492879458666896165688679032872243742321093151017586"; // xG2
                this.yG1_ = "35792076529520953229353131586148532298980788308212624163778536979737302692355";
                this.yG2_ = "94950399446266348863990298794498567108735945598861256319081039821774980362933";
                this.y1 = "88114235599026244608156727676889327792650883774967354641739120209959431433340";
                this.y2 = "104028118168296383510272342700958867243162938989406893586017463477269830259843";
                this.a11 = "102548254275709837463295173358676342231695038240668289928673591080375151724927";
                this.a12 = "106699660887486484902830008838919257298106283796553804169421012722416840661675";
                this.b11 = "93080684372875533018057282336896653809278104662124954081982723125612654857614";
                this.b12 = "30556776584075973230600219168759054559601057330044209564700692614397918346764";
                this.a21 = "29151644620116343040142676430705379899653253293118414476231424012905272678263";
                this.a22 = "74153191225753640468530196514632080467164652315613915363922741139108372957904";
                this.b21 = "12699860815814583178958210547416800651878744376020901817826410403778594704341";
                this.b22 = "50523885030232786387471837499245186575898889420041204982597127442629703971163";
            }
            if(this.address_=="0x7567d83b7b8d80addcb281a71d54fc7b3364ffed"){
                this.params1 = "12612159221097",
                this.params2 = "64517686932207320962818975570491866362169736872313348487344192361569775974585",
                this.params3 = "73081020225857",
                this.params4 = "103316988684418254222839157204977622955201207820671101551810615989265745086565",
                this.xG1_ = "17157104938316039559881563838880895120682998433435816733280344609839998288514",  // xG1
                this.xG2_ = "109891285209134945571221796685445702050711671362834643803197090073699903409756"; // xG2
                this.yG1_ = "56730397839673004479802987301319372418577688012589536705290805242001220538469";
                this.yG2_ = "47476848708433935202570307623784828341011596971554921665367445789610274096105";
                this.y1 = "109337345161139564933336173355682120608817829911557737036137387514882944326249";
                this.y2 = "80279829053129157346862660594251474356541362241017610226980582779224172114297";
                this.a11 = "93802504506329941027416966815222706710961002729085314579531657418421158055825";
                this.a12 = "25803096036005261844563722346779208837293164104588839830181045508601881793744";
                this.b11 = "68304628373796161444844613893003346110668950552631473989807951971309751296517";
                this.b12 = "88386924583969895387853790167269819233194164227536720334296135367986425229971";
                this.a21 = "30232045589077219673334205107809792736411104861502639232162650624487997005925";
                this.a22 = "31073113318940408936613659654096983175463354110985888062454984492232700749842";
                this.b21 = "18513299540388611814182877759453160808721776938563129406816435150438172393551";
                this.b22 = "25730769057142619455425123843873710292160393810377064176067346628290592684471";
            }
            if(this.address_=="0xd3ae78222beadb038203be21ed5ce7c9b1bff602"){
                this.params1 = "59857986206827382862109364752700507145784765043050277285665135763256589568",
                this.params2 = "208060647571638",
                this.params3 = "38502904040819045867635128589025565807178100491876819345879042200198392543530",
                this.params4 = "163124198670465",
                this.xG1_ = "47721061848867774723144757710291789226461563624530361782882746205774254314993",  // xG1
                this.xG2_ = "75909239257779274342645304713198022969065228547417309104716850297107166051860"; // xG2
                this.yG1_ = "87909377989101966845318437069502860546247069802070190974049848277620938860739";
                this.yG2_ = "83494099206451147506731061844957324128213470767244266284954774374793186624437";
                this.y1 = "45628367131865709192902833814993690224084817654987305635527401196348785871530";
                this.y2 = "17338402332533940938896469130394232573323255226473196786915055679058089877021";
                this.a11 = "14452558463739121631316445382956136580244728973797922519020321895140474309219";
                this.a12 = "24974380038713550955069185019485716451706568309968904795685771578106126081576";
                this.b11 = "80691328206165821994038522627476490653834781955153170557578226941958456999818";
                this.b12 = "87282088375753712205575096347471526082963788690577596645755340491660678383263";
                this.a21 = "94501914338690473014614790875142709508675988008095722281075122928538759949764";
                this.a22 = "13006678567410657595365459526484129692784664932176326314422698419309780575947";
                this.b21 = "100365525006094812965529828154303197285757501093170034698833354095169775560947";
                this.b22 = "11419005589545845513282808416279350301518960306942926182424244510101214306731";
            }            
            let VMOutput = await methodOfLocalCrypto("commitToVote")!.caller(this.address_).call(
                [this.params1, this.params2, this.params3, this.params4], [this.xG1_, this.xG2_], [this.yG1_, this.yG2_], [this.y1, this.y2], [this.a11, this.a12], [this.b11, this.b12], [this.a21, this.a22], [this.b21, this.b22]
            )
            console.log("Commit To Vote: ", VMOutput)
            let commitmentHash = extractValueFromDecoded(VMOutput, '0')
            alert("commitment hash is: "+commitmentHash)
        }
    }
})
</script>
