const D_CONTENTS = {
  namespaced: true,
  state: {
    scrollPosition: {},
    listData: [], // 목록 컨텐츠 데이터
    detailData: {}
  },
  getters: {
    GE_PRE_DATA (state) {
      return state
    },
    GE_PRE_SCROLL_POSITION (state) {
      return state.scrollPosition
    },
    GE_PRE_LIST (state) {
      return state.listData
    }
  },
  mutations: {
    MU_PRE_SCROLL_POSITION (state, payload) {
      state.scrollPosition = payload
    },
    MU_PRE_LIST_DATA (state, data) {
      state.listData = data
    },
    MU_PRE_DETAIL_DATA (state, data) {
      state.detailData = data
    },
    MU_CLEAN (state) {
      state.scrollPosition = {}
      state.detailData = {}
      state.listData = []
    }
  },
  actions: {
    AC_PRE_SCROLL_POSITION: ({ commit, state }, payload) => {
      commit('MU_PRE_SCROLL_POSITION', payload)
    },
    AC_PRE_LIST_DATA: ({ commit }, payload) => {
      commit('MU_PRE_LIST_DATA', payload)
    },
    AC_PRE_DETAIL_DATA: ({ commit }, payload) => {
      commit('MU_PRE_DETAIL_DATA', payload)
    },
    AC_CLEAN: ({ commit }, payload) => {
      commit('MU_CLEAN', payload)
    }
  }
}

export default D_CONTENTS
