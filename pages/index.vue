<template>
  <div>
    <h1 class="text-3xl">Home</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  layout: 'app',
  middleware: ['auth'],
})
</script>
