<template>
  <div class="container">
    <h1 class="fw-semibold">Dashboard</h1>
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
