/* eslint-disable */
import { createStore } from 'vuex'

// 작성한 모듈을 가져옵니다.
import UB_USER from '@/store/modules/UB_userStore.js'
import UB_HISTORY from '@/store/modules/UB_historyStack.js'
import UB_CHANNEL from '@/store/modules/UB_channelStore.js'
import UB_NOTI from '@/store/modules/UB_notiStore.js'
import UB_PRE_DATA from '@/store/modules/UB_previousData.js'

import createPersistedState from 'vuex-persistedstate'

const storageState = createPersistedState({
  paths: ['UB_USER', 'UB_HISTORY', 'UB_CHANNEL', 'UB_NOTI', 'UB_PRE_DATA'],
  storage: window.localStorage
  /* key: 'vuexStore',
  storage: window.sessionStorage */
})

const store = createStore({
  modules: {
    // 키: 값 형태로 저장됩니다.
    UB_USER: UB_USER,
    UB_HISTORY: UB_HISTORY,
    UB_CHANNEL: UB_CHANNEL,
    UB_NOTI: UB_NOTI,
    UB_PRE_DATA: UB_PRE_DATA
  },
  plugins: [storageState]
})

export default store
