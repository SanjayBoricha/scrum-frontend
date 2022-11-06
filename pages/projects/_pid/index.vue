<template>
  <div class="container">
    <div class="row mb-4">
      <div class="col-6">
        <h3 class="fw-semibold mb-2">Project: {{ project?.name }}</h3>
      </div>
      <div class="col-6">
        <div class="d-flex justify-content-end">
          <nuxt-link class="btn btn-primary" to="/projects/create">
            Create Project
          </nuxt-link>
        </div>
      </div>
    </div>

    <div class="row g-3">
      <div
        v-for="board in project?.boards"
        :key="board.id"
        class="col-md-6 col-lg-4"
      >
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ board.name }}</h5>
            <p class="card-text">Created By: {{ board.user?.name }}</p>
            <nuxt-link
              :to="{
                name: 'projects-pid-boards-bid',
                params: { pid: project?.id, bid: board.id },
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
import { Project } from '~/interfaces'

export default Vue.extend({
  name: 'ProjectsId',
  layout: 'app',
  async asyncData({ $auth, $axios, params, redirect }) {
    const project = await $axios
      .$get(`/projects/${params.pid}`)
      .catch(async (error) => {
        if (error.response.status === 401) {
          await $auth.logout()
          redirect('/login')
        }
      })
    return { project }
  },
  data(): {
    project?: Project
  } {
    return {
      project: undefined,
    }
  },
})
</script>
