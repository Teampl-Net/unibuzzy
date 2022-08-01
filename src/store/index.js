import { createStore } from 'vuex'

export default createStore({
  state: {
    archivingServerList: [],
    historyStack: [0],
    currentPage: null,
    removePage: 0,
    pageUpdate: 0,
    recvPushQueue: [],
    deepLinkQueue: []
  },
  mutations: {
    updateServerList (state, server) {
      state.archivingServerList = server // state의 account변수에 넘겨 받은 account값을 입력함
    },
    updateStack (state, stack) {
      state.historyStack = stack // state의 account변수에 넘겨 받은 account값을 입력함
    },
    setRemovePage (state, page) {
      state.removePage = page
    },
    setCurrentPage (state, page) {
      state.currentPage = page
    },
    updatePage (state, page) {
      state.pageUpdate = page
    },
    addPushQueue (state, page) {
      state.recvPushQueue = page
    },
    addDeepLinkQueue (state, page) {
      state.deepLinkQueue = page
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    archServerList (state) { // 현재 로그인 상태인지 확인 (true/false)
      return state.archivingServerList
    },
    hStack (state) { // 현재 로그인 상태인지 확인 (true/false)
      return state.historyStack
    },
    hRPage (state) { // 현재 로그인 상태인지 확인 (true/false)
      return state.removePage
    },
    hCPage (state) { // 현재 로그인 상태인지 확인 (true/false)
      return state.historyStack[state.historyStack.length - 1]
    },
    hUpdate (state) { // 현재 로그인 상태인지 확인 (true/false)
      return state.pageUpdate
    },
    pushQueue (state) { // 현재 로그인 상태인지 확인 (true/false)
      return state.recvPushQueue
    },
    deepLinkQueue (state) { // 현재 로그인 상태인지 확인 (true/false)
      return state.deepLinkQueue
    }
  }
})
