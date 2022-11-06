<template>
  <div class="container">
    <div class="row mb-4">
      <div class="col-6">
        <h3 class="fw-semibold mb-2">Projects</h3>
      </div>
      <div class="col-6">
        <div class="d-flex justify-content-end">
          <nuxt-link class="btn btn-primary" to="/projects/create">
            Create Project
          </nuxt-link>
        </div>
      </div>
    </div>

    <div v-if="projects.length" class="row g-3">
      <div
        v-for="project in projects"
        :key="project.id"
        class="col-sm-6 col-md-4 col-lg-3"
      >
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ project.name }}</h5>
            <p class="card-text">{{ project.boards_count }} boards</p>
            <nuxt-link
              :to="{
                name: 'projects-pid',
                params: { pid: project.id },
              }"
              class="btn btn-primary"
            >
              View Project
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="row">
      <div class="col-12">
        <div class="alert alert-info">
          You don't have any projects yet. Create one now!
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Project } from '~/interfaces'

export default Vue.extend({
  name: 'Projects',
  layout: 'app',
  async asyncData({ $axios }) {
    const projects = await $axios.$get('/projects')
    return { projects }
  },
  data(): {
    projects: Project[]
  } {
    return {
      projects: [],
    }
  },
  methods: {
    createProject() {
      console.log('create project')
      this.$axios
        .post('/projects', {
          name: 'New Project',
        })
        .then((response) => {
          console.log(response)
        })
    },
  },
})
</script>
