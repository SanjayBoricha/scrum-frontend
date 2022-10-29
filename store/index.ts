import Vuex, { createLogger } from 'vuex'
import board from './modules/board'

const debug = process.env.NODE_ENV !== 'production'

// export default () =>

// eslint-disable-next-line no-new
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
