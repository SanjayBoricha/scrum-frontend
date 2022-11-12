<template>
  <nav class="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm">
    <div class="container">
      <button
        class="navbar-toggler shadow-none border-0 p-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <!-- <span class="navbar-toggler-icon"></span> -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          class="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </button>

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
            class="dropdown-menu shadow dropdown-menu-end dropdown-menu-dark"
            aria-labelledby="dropdownMenuButton1"
          >
            <li>
              <button class="dropdown-item" @click="logout">Logout</button>
            </li>
          </ul>
        </div>
      </div>

      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/">Dashboard</nuxt-link>
          </li>
          <li class="nav-item ms-2">
            <!-- <nuxt-link class="nav-link" to="/boards" active-class="text-white">
              Boards
            </nuxt-link> -->

            <!-- select board dropdown -->
            <div class="dropdown d-none d-lg-block boards">
              <nuxt-link
                id="dropdownMenuButton1"
                ref="dropdownMenuButton"
                class="nav-link text-white dropdown-toggle dropdown-toggle-split border rounded border-800"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                to="#"
                style="--bs-border-color: var(--bs-gray-700)"
              >
                <span v-if="$route.params.bid">
                  {{
                    boards.find((b) => b.id === parseInt($route.params.bid))
                      ?.name
                  }}
                </span>
                <span v-else>Select Board</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chevron-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </nuxt-link>
              <div
                class="dropdown-menu shadow dropdown-menu-dark"
                aria-labelledby="dropdownMenuButton1"
              >
                <div class="row gy-2">
                  <div
                    v-for="board in boards"
                    :key="board.id"
                    :class="{ 'col-6': boards.length > 10 }"
                  >
                    <nuxt-link
                      :to="`/boards/${board.id}`"
                      :class="{
                        'text-white': board.id === parseInt($route.params.bid),
                      }"
                    >
                      {{ board.name }}
                    </nuxt-link>
                  </div>

                  <div class="col-12"></div>
                </div>
              </div>
            </div>
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
            class="dropdown-menu shadow dropdown-menu-end dropdown-menu-dark"
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
import { Board } from '~/interfaces'

export default Vue.extend({
  name: 'AppHeader',
  components: {
    Avatar,
  },
  data(): {
    boards: Board[]
  } {
    return {
      boards: [],
    }
  },
  mounted() {
    if (this.$refs.dropdownMenuButton instanceof Element) {
      // eslint-disable-next-line no-new
      new Dropdown(this.$refs.dropdownMenuButton, {
        offset: [0, 20],
      })
    }

    setTimeout(() => {
      console.log(this.boards)
    }, 5000)

    this.fetchBoards()
  },
  methods: {
    fetchBoards() {
      this.$axios
        .$get('/boards')
        .then((boards: Board[]) => {
          this.boards = boards

          this.$forceUpdate()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async logout() {
      await this.$auth.logout()
      this.$auth.redirect('login')
    },
  },
})
</script>

<style lang="scss" scoped>
.dropdown.boards {
  .dropdown-toggle {
    &::after {
      display: none !important;
    }
  }

  .dropdown-menu {
    &.show {
      display: flex !important;
      width: auto !important;
      max-width: unset !important;
    }

    // min-width: 300px;
    // max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px 20px;

    &::-webkit-scrollbar {
      width: 0.5rem;

      &-track {
        background: var(--bs-gray-800);
      }

      &-thumb {
        background: var(--bs-gray-600);
        border-radius: 1rem;
      }
    }
  }

  .dropdown-item {
    &:hover {
      background-color: transparent !important;
    }
  }
}
</style>
