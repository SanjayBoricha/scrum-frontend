import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'

const dictionary = {
  en: {
    custom: {
      password_confirmation: {
        confirmed: () => 'The password confirmation does not match',
      },
    },
  },
}

Validator.localize(dictionary)

Vue.use(VeeValidate, {
  // This is the default
  inject: true,
  // Important to name this something other than 'fields'
  fieldsBagName: 'veeFields',
})
