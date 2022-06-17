import { createStore } from 'vuex'

export default createStore({
  state: {
    historyStack: [0],
    currentPage: null,
    removePage: 0
  },
  mutations: {
    updateStack (state, stack) {
      state.historyStack = stack // state의 account변수에 넘겨 받은 account값을 입력함
    },
    setRemovePage (state, page) {
      state.removePage = page
    },
    setCurrentPage (state, page) {
      state.currentPage = page
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    hStack (state) { // 현재 로그인 상태인지 확인 (true/false)
      return state.historyStack
    },
    hRPage (state) { // 현재 로그인 상태인지 확인 (true/false)
      return state.removePage
    },
    hCPage (state) { // 현재 로그인 상태인지 확인 (true/false)
      return state.historyStack[state.historyStack.length - 1]
    }
  }
})
