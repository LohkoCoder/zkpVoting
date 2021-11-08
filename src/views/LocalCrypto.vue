<template>
  <div class="home">
    <generationService></generationService>
    <generateZKPforVote class="mt-5"></generateZKPforVote>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import generationService from '@/components/generationService.vue'
import generateZKPforVote from '@/components/generateZKPforVote.vue'

@Component({
  components: {
    generationService,
    generateZKPforVote
  },
})
export default class Home extends Vue {}
</script>
