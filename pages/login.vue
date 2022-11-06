<template>
  <div class="min-vh-100 container">
    <div class="min-vh-100 row justify-content-center align-items-center">
      <div class="col-md-10 col-lg-6 col-xl-4">
        <div class="card shadow border-0">
          <div class="card-body p-4">
            <div class="text-center">
              <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
            </div>
            <form @submit.prevent="submit">
              <div class="form-group mb-3">
                <label for="email">Email</label>
                <input
                  id="email"
                  v-model="email"
                  v-validate="{ required: true, email: true }"
                  :class="{ 'is-invalid': $validator.errors.has('email') }"
                  name="email"
                  type="text"
                  autocomplete="email"
                  class="form-control"
                />
                <span class="invalid-feedback">{{
                  errors.first('email')
                }}</span>
              </div>
              <div class="form-group mb-3">
                <label for="password">Password</label>
                <input
                  id="password"
                  v-model="password"
                  v-validate="{ required: true }"
                  :class="{ 'is-invalid': $validator.errors.has('password') }"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  class="form-control"
                />
                <span class="invalid-feedback">{{
                  errors.first('password')
                }}</span>
              </div>
              <div class="form-group mb-3">
                <button
                  :disabled="isSubmitting"
                  type="submit"
                  class="btn btn-primary w-100"
                >
                  Login
                </button>
              </div>

              <p class="mb-0">
                Don't have account register
                <nuxt-link to="/register">here</nuxt-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'

export default (
  Vue as VueConstructor<
    Vue & {
      errors: {
        first: Function
      }
    }
  >
).extend({
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      isSubmitting: false,
    }
  },
  mounted() {
    if (this.$auth.user) {
      this.$auth.redirect('home')
    }
  },
  methods: {
    submit() {
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.$auth
            .loginWith('local', {
              data: {
                email: this.email,
                password: this.password,
              },
            })
            .then((_) => {
              this.$auth.redirect('home')
            })
            .catch((error) => {
              if (error?.response?.data?.error) {
                this.$toast.error(error?.response?.data?.error)
              } else {
                this.$toast.error('Something went wrong.')
              }
            })
        }
      })
    },
  },
})
</script>
