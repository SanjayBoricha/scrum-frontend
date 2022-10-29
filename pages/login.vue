<template>
  <div
    class="flex flex-col min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50"
  >
    <div class="mb-10">
      <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <NuxtLink
          to="/register"
          class="font-medium text-indigo-600 hover:text-indigo-500"
          >create new account here.</NuxtLink
        >
      </p>
    </div>
    <div class="w-full max-w-md border rounded-xl p-8 shadow-md bg-white">
      <form class="-mt-6 space-y-6" method="POST" @submit.prevent="submit">
        <input type="hidden" name="remember" value="true" />
        <div>
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
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              for="remember-me"
              class="ml-2 block text-sm text-gray-700 font-semibold"
            >
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-500"
              >Forgot your password?</a
            >
          </div>
        </div>

        <div>
          <button
            :disabled="isSubmitting"
            type="submit"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2.5 px-4 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign in
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
              // this.$router.push('/')

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
