import { createStore } from 'vuex'

export default createStore({
  state: {
    // userDisplayName: localStorage.getItem('userName')
    email: localStorage.getItem('userEmail'),
    token: localStorage.getItem('userAToken')
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
