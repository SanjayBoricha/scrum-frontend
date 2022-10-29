import Vuex, { createLogger } from 'vuex'
import board from './modules/board'

const debug = process.env.NODE_ENV !== 'production'

// export default () =>

new Vuex.Store({
  state: () => ({}),
  mutations: {},
  actions: {},
  modules: {
    board,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})
