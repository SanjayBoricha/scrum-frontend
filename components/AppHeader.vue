<template>
  <nav class="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm">
    <div class="container">
      <nuxt-link class="navbar-brand" to="/">Scrum Board</nuxt-link>

      <div class="text-end d-flex align-items-center">
        <div class="dropdown d-lg-none">
          <nuxt-link
            id="dropdownMenuButton1"
            ref="dropdownMenuButton"
            class="nav-link text-white dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            to="#"
          >
            <Avatar
              :username="$auth.user.name"
              :size="32"
              :lighten="80"
              color="rgba(255, 255, 255, 0.8)"
              class="d-inline-block"
              :custom-style="{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '16px',
              }"
            />
            <!-- {{ $auth.user.name }} -->
          </nuxt-link>
          <ul
            class="dropdown-menu shadow"
            aria-labelledby="dropdownMenuButton1"
          >
            <li>
              <button class="dropdown-item" @click="logout">Logout</button>
            </li>
          </ul>
        </div>

        <button
          class="navbar-toggler shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>

      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/">Dashboard</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link
              class="nav-link"
              to="/projects"
              active-class="text-white"
            >
              Projects
            </nuxt-link>
          </li>
        </ul>
      </div>

      <div class="text-end d-none d-lg-block">
        <div class="dropdown">
          <nuxt-link
            id="dropdownMenuButton1"
            ref="dropdownMenuButton"
            class="nav-link text-white dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            to="#"
          >
            <Avatar
              :username="$auth.user.name"
              :size="32"
              :lighten="80"
              color="rgba(255, 255, 255, 0.8)"
              class="d-inline-block"
              :custom-style="{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '16px',
              }"
            />
            {{ $auth.user.name }}
          </nuxt-link>
          <ul
            class="dropdown-menu shadow"
            aria-labelledby="dropdownMenuButton1"
          >
            <li>
              <button class="dropdown-item" @click="logout">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import { Dropdown } from 'bootstrap'
import Avatar from 'vue-avatar'

export default Vue.extend({
  name: 'AppHeader',
  components: {
    Avatar,
  },
  mounted() {
    if (this.$refs.dropdownMenuButton instanceof Element) {
      // eslint-disable-next-line no-new
      new Dropdown(this.$refs.dropdownMenuButton, {
        offset: [0, 20],
      })
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$auth.redirect('login')
    },
  },
})
</script>
