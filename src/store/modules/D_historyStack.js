/* eslint-disable camelcase */

const D_historyStack = {
  namespaced: true,
  state: {
    archivingServerList: [],
    historyStack: [0],
    currentPage: null,
    removePage: 0,
    canRemoveYn: true,
    pageUpdate: 0,
    recvPushQueue: [],
    deepLinkQueue: []
  },
  mutations: {
    updateServerList (state, server) {
      state.archivingServerList = server // state의 account변수에 넘겨 받은 account값을 입력함
    },
    changeRemoveYn (state, blean) {
      state.canRemoveYn = blean // state의 account변수에 넘겨 받은 account값을 입력함
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
    changeDeepLinkQueue (state, page) {
      state.deepLinkQueue = page
    }
  },
  actions: {
    AC_UPDATE_HISTOY ({ commit }, payload) {
      commit('updateStack', payload)
    }
  },
  modules: {
  },
  getters: {
    archServerList (state) {
      return state.archivingServerList
    },
    canRYn (state) {
      return state.canRemoveYn
    },
    hStack (state) {
      return state.historyStack
    },
    hRPage (state) {
      return state.removePage
    },
    hCPage (state) {
      return state.historyStack[state.historyStack.length - 1]
    },
    hUpdate (state) {
      return state.pageUpdate
    },
    pushQueue (state) {
      return state.recvPushQueue
    },
    deepLinkQueue (state) {
      return state.deepLinkQueue
    }
  }
}

export default D_historyStack
