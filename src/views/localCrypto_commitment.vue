<template>
  <div class="commitment">
    <generateCommitment></generateCommitment>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import generateCommitment from '@/components/generateCommitment.vue'

@Component({
  components: {
    generateCommitment,
  },
})
export default class localCrypto_commitment extends Vue {}
</script>
