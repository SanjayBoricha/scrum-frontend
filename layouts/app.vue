<template>
  <main class="min-vh-100">
    <AppHeader />

    <div class="py-4">
      <nuxt />
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import AppHeader from '~/components/AppHeader.vue'

export default Vue.extend({
  components: { AppHeader },
  middleware: ['auth'],
  asyncData({ $auth }) {
    $auth.onError((error) => {
      console.log(error)

      // if (error.name) {
      // }
    })
  },
})
</script>
