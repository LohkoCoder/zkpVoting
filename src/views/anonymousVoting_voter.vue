<template>
    <div>
        <register></register>
        <submitCommitment class="mt-5"></submitCommitment>
        <submitVoting class="mt-5"></submitVoting>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import register from '@/components/register.vue';
import submitCommitment from '@/components/submitCommitment.vue';
import submitVoting from '@/components/submitVoting.vue';
@Component({
  components: {
    register,
    submitCommitment,
    submitVoting,
  },
})
export default class anonynmousVoting_owner extends Vue{
    
}
</script>
