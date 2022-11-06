<template>
  <div class="min-vh-100 container">
    <div class="min-vh-100 row justify-content-center align-items-center">
      <div class="col-md-10 col-lg-6 col-xl-4 py-4">
        <div class="card shadow border-0">
          <div class="card-body p-4">
            <div class="text-center">
              <h1 class="h4 text-gray-900 mb-4">Register</h1>
            </div>
            <form name="register" method="POST" @submit.prevent="submit">
              <div class="form-group mb-3">
                <label for="name">Name</label>
                <input
                  id="name"
                  v-model="name"
                  v-validate="{ required: true }"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': $validator.errors.has('name') }"
                  name="name"
                  placeholder="Name"
                />
                <span class="invalid-feedback">
                  {{ $validator.errors.first('name') }}
                </span>
              </div>

              <!-- email input -->
              <div class="form-group mb-3">
                <label for="email">Email</label>
                <input
                  id="email"
                  v-model="email"
                  v-validate="{ required: true, email: true }"
                  type="email"
                  class="form-control"
                  :class="{ 'is-invalid': $validator.errors.has('email') }"
                  name="email"
                  placeholder="Email"
                />
                <span class="invalid-feedback">
                  {{ $validator.errors.first('email') }}
                </span>
              </div>

              <!-- password input -->
              <div class="form-group mb-3">
                <label for="password">Password</label>
                <input
                  id="password"
                  ref="password"
                  v-model="password"
                  v-validate="{ required: true }"
                  type="password"
                  class="form-control"
                  :class="{ 'is-invalid': $validator.errors.has('password') }"
                  name="password"
                  placeholder="Password"
                />
                <span class="invalid-feedback">
                  {{ $validator.errors.first('password') }}
                </span>
              </div>

              <!-- confirm password input -->
              <div class="form-group mb-3">
                <label for="password_confirmation">Confirm Password</label>
                <input
                  id="password_confirmation"
                  v-model="password_confirmation"
                  v-validate="{ required: true, confirmed: 'password' }"
                  data-vv-as="confirm password"
                  type="password"
                  class="form-control"
                  :class="{
                    'is-invalid': $validator.errors.has(
                      'password_confirmation'
                    ),
                  }"
                  name="password_confirmation"
                  placeholder="Confirm Password"
                />
                <span class="invalid-feedback">
                  {{ $validator.errors.first('password_confirmation') }}
                </span>
              </div>

              <!-- submit button -->
              <div class="form-group mb-3">
                <button
                  :disabled="isSubmitting"
                  type="submit"
                  class="btn btn-primary w-100"
                >
                  Register
                </button>
              </div>

              <p class="mb-0">
                Already have an account login
                <nuxt-link to="/login">here</nuxt-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
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
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          this.isSubmitting = true
          this.$axios
            .$post('/auth/register', {
              name: this.name,
              email: this.email,
              password: this.password,
              password_confirmation: this.password_confirmation,
            })
            .then(async (response) => {
              if (response && response.token) {
                await this.$auth.loginWith('local', {
                  data: {
                    email: this.email,
                    password: this.password,
                  },
                })
                this.$router.push('/')
              }
            })
            .catch((error) => {
              let emailExists = false

              if (error?.response?.data?.errors) {
                error.response.data.errors.forEach(
                  (error: { field: string; rule: string }) => {
                    if (error.field === 'email' && error.rule === 'unique') {
                      emailExists = true
                    }
                  }
                )
              }

              if (emailExists) {
                this.$toast.error('Email already exists.')
              } else {
                this.$toast.error('Something went wrong.')
              }

              this.isSubmitting = false
            })
        }
      })
    },
  },
})
</script>
