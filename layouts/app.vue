<template>
  <main class="min-vh-100 bg-800">
    <AppHeader />

    <div class="">
      <nuxt />
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import AppHeader from '~/components/AppHeader.vue'

export default Vue.extend({
  name: 'App',
  components: { AppHeader },
  middleware: ['auth'],
  asyncData({ $auth }) {
    $auth.onError((error) => {
      console.log(error)
    })
  },
})
</script>
