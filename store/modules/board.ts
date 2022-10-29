import { Commit } from 'vuex'

interface Task {
  id: number
  title: string
  description: string
  date: string
}

interface Group {
  id: number
  name: number
  tasks: Task[]
}

interface BoardState {
  groups: Group[]
}

const state = () =>
  <BoardState>{
    groups: [],
  }

const getters = {
  getGroups: (state: BoardState, _getters: any, _rootState: any) => {
    return state.groups
  },
}

const actions = {
  setGroups({ commit }: { commit: Commit }, groups: Group[]) {
    commit('setGroups', groups)
  },
}

const mutations = {
  setGroups(state: BoardState, groups: Group[]) {
    state.groups = groups
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
