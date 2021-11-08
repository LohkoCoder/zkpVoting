<template>
    <div>
        <Initiate-Anonymous-Voting></Initiate-Anonymous-Voting>
        <set-Eligible class="mt-5"></set-Eligible>
        <begin-sign-up class="mt-5"></begin-sign-up>
        <finishRegistration class="mt-5"></finishRegistration>
        <computeTally class="mt-5"></computeTally>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  InitiateAnonymousVoting  from '@/components/InitiateAnonymousVoting.vue'; // @ is an alias to /src
import  setEligible  from '@/components/setEligible.vue'; // @ is an alias to /src
import  beginSignUp  from '@/components/beginSignUp.vue'; // @ is an alias to /src
import finishRegistration from '@/components/finishRegistration.vue'
import computeTally from "@/components/computeTally.vue"
@Component({
  components: {
    InitiateAnonymousVoting,
    setEligible,
    beginSignUp,
    finishRegistration,
    computeTally
  },
})
export default class anonynmousVoting_owner extends Vue{
    
}
</script>
