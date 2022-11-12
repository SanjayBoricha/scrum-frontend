<template>
  <div class="container">
    <div class="row mb-4">
      <div class="col-6">
        <h3 class="fw-semibold mb-2">Boards</h3>
      </div>
      <div class="col-6">
        <div class="d-flex justify-content-end">
          <nuxt-link class="btn btn-primary" to="/boards">
            Create Board
          </nuxt-link>
        </div>
      </div>
    </div>

    <div class="row g-3">
      <div v-for="board in boards" :key="board.id" class="col-md-6 col-lg-4">
        <div class="card bg-900 text-200">
          <div class="card-body">
            <h5 class="card-title">{{ board.name }}</h5>
            <p class="card-text">Created By: {{ board.user?.name }}</p>
            <nuxt-link
              :to="{
                name: 'boards-bid',
                params: { bid: board.id },
              }"
              class="btn btn-primary"
            >
              View Board
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Board } from '~/interfaces'

export default Vue.extend({
  name: 'ProjectsId',
  layout: 'app',
  async asyncData({ $auth, $axios, redirect }) {
    const boards = await $axios.$get(`/boards`).catch(async (error) => {
      if (error.response.status === 401) {
        await $auth.logout()
        redirect('/login')
      }
    })

    return { boards }
  },
  data(): {
    boards?: Board[]
  } {
    return {
      boards: [],
    }
  },
})
</script>
