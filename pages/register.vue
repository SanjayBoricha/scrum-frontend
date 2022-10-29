<template>
  <div
    class="flex flex-col min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50"
  >
    <div class="mb-10">
      <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">
        Register new account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Already have one?&nbsp;
        <NuxtLink
          to="/login"
          class="font-medium text-indigo-600 hover:text-indigo-500"
          >login here.</NuxtLink
        >
      </p>
    </div>
    <div class="w-full max-w-md border rounded-xl p-8 shadow-md bg-white">
      <form class="-mt-6 space-y-6" method="POST" @submit.prevent="submit">
        <input type="hidden" name="remember" value="true" />
        <div>
          <div class="mb-5">
            <label class="inline-block mb-1 font-semibold" for="name">
              Name
            </label>
            <input
              id="name"
              v-model="name"
              v-validate="{ required: true }"
              name="name"
              type="text"
              class="relative block w-full appearance-none rounded-md border-2 border-gray-300 px-3 py-2 text-gray-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
            <span class="text-red-500 text-sm">{{ errors.first('name') }}</span>
          </div>
          <div class="mb-5">
            <label class="inline-block mb-1 font-semibold" for="email-address">
              Email address
            </label>
            <input
              id="email-address"
              v-model="email"
              v-validate="{ required: true, email: true }"
              name="email"
              type="text"
              autocomplete="email"
              class="relative block w-full appearance-none rounded-md border-2 border-gray-300 px-3 py-2 text-gray-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
            <span class="text-red-500 text-sm">{{
              errors.first('email')
            }}</span>
          </div>
          <div class="mb-5">
            <label class="inline-block mb-1 font-semibold" for="password">
              Password
            </label>
            <input
              id="password"
              ref="password"
              v-model="password"
              v-validate="{ required: true }"
              name="password"
              type="password"
              autocomplete="current-password"
              class="relative block w-full appearance-none rounded-md border-2 border-gray-300 px-3 py-2 text-gray-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
            <span class="text-red-500 text-sm">{{
              errors.first('password')
            }}</span>
          </div>
          <div class="mb-5">
            <label class="inline-block mb-1 font-semibold" for="password">
              Confirm Password
            </label>
            <input
              id="password_confirmation"
              v-model="password_confirmation"
              v-validate="{ required: true, confirmed: 'password' }"
              data-vv-as="confirm password"
              name="password_confirmation"
              type="password"
              class="relative block w-full appearance-none rounded-md border-2 border-gray-300 px-3 py-2 text-gray-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
            <span class="text-red-500 text-sm">{{
              errors.first('password_confirmation')
            }}</span>
          </div>
        </div>

        <div>
          <button
            :disabled="isSubmitting"
            type="submit"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2.5 px-4 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Register
          </button>
        </div>
      </form>
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
                this.$toast.error('Email already exists.', {
                  duration: 5000,
                })
              } else {
                this.$toast.error('Something went wrong.', {
                  duration: 5000,
                })
              }

              this.isSubmitting = false
            })
        }
      })
    },
  },
})
</script>
