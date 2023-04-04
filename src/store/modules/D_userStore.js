
const D_USER = {
  namespaced: true,
  state: {
    /* userDispMtext: '',
    userEmail: '',
    userKey: '',
    userNameMtext: '',
    userProfileImg: '',
    domainPath: '',
    phoneLast: '',
    creDate: '',
    deviceId: '',
    picMfilekey: '', */
    userInfo: null,
    deviceInfo: null,
    netStateYn: null,
    statusBarHeight: '30px',
    userCerti: { certiYn: null, certi: {}, saveYn: false }
  },
  getters: {
    GE_CERTI: state => state.userCerti,
    /* GE_USER_USER_NAME: state => state.userNameMtext,
    GE_USER_DISP_NAME: state => state.userDispMtext,
    GE_USER_USER_KEY: state => state.userKey,
    GE_USER_USER_EMAIL: state => state.userEmail,
    GE_USER_PROFILE_PATH: state => state.userProfileImg,
    GE_USER_PROFILE_DOMAIL: state => state.phoneLast,
    GE_USER_PROFILE_FILEKEY: state => state.picMfilekey,
    GE_USER_FCM_KEY: state => state.fcmKey,
    GE_USER_DEVICE_ID: state => state.deviceId, */
    /* GE_USER: state => {
        userNameMtext: state.userNameMtext,
        userDispMtext: state.userDispMtext,
        userKey: state.userKey,
        userEmail: state.userEmail,
        userProfileImg: state.userProfileImg,
        phoneLast: state.phoneLast,
        picMfilekey: state.picMfilekey,
        fcmKey: state.fcmKey,
        deviceId: state.deviceId,
    } */
    GE_USER (state) {
      // if (!state.userInfo) {
      //   state.userInfo.userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      // }
      if (state.userInfo && state.userInfo.userKey) {
        return state.userInfo
      } else {
        return { unknownYn: true }
      }
      /* {
        userNameMtext: state.userNameMtext,
        userDispMtext: state.userDispMtext,
        userKey: state.userKey,
        userEmail: state.userEmail,
        userProfileImg: state.userProfileImg,
        phoneLast: state.phoneLast,
        picMfilekey: state.picMfilekey,
        fcmKey: state.fcmKey,
        deviceId: state.deviceId
      } */
    },
    GE_DEVICE (state) {
      // if (!state.userInfo) {
      //   state.userInfo.userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      // }
      return state.deviceInfo /* {
          userNameMtext: state.userNameMtext,
          userDispMtext: state.userDispMtext,
          userKey: state.userKey,
          userEmail: state.userEmail,
          userProfileImg: state.userProfileImg,
          phoneLast: state.phoneLast,
          picMfilekey: state.picMfilekey,
          fcmKey: state.fcmKey,
          deviceId: state.deviceId
        } */
    },
    GE_NET_STATE (state) {
      // if (!state.userInfo) {
      //   state.userInfo.userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      // }
      return state.netStateYn /* {
            userNameMtext: state.userNameMtext,
            userDispMtext: state.userDispMtext,
            userKey: state.userKey,
            userEmail: state.userEmail,
            userProfileImg: state.userProfileImg,
            phoneLast: state.phoneLast,
            picMfilekey: state.picMfilekey,
            fcmKey: state.fcmKey,
            deviceId: state.deviceId
          } */
    }
  },
  mutations: {
    /* MU_USER1 (state, payload) {
      state.userInfo = payload
      state.userDispMtext = payload.userDispMtext
      state.userNameMtext = payload.userNameMtext
      state.userKey = payload.userKey
      state.userEmail = payload.userEmail
      state.userProfileImg = payload.userProfileImg
      state.domainPath = payload.domainPath
      state.phoneLast = payload.phoneLast
      state.picMfilekey = payload.picMfilekey
      state.fcmKey = payload.fcmKey
      state.deviceId = payload.deviceId
    }, */
    MU_USER (state, payload) {
      const uAccessToken = state.uAccessToken
      const partnerToken = state.partnerToken
      state.userInfo = payload
      if (uAccessToken) {
        state.uAccessToken = uAccessToken
      }
      if (partnerToken) {
        state.partnerToken = partnerToken
      }
      /* state.userInfo = payload
      state.userDispMtext = payload.userDispMtext
      state.userNameMtext = payload.userNameMtext
      state.userKey = payload.userKey
      state.userEmail = payload.userEmail
      state.userProfileImg = payload.userProfileImg
      state.domainPath = payload.domainPath
      state.phoneLast = payload.phoneLast
      state.picMfilekey = payload.picMfilekey
      state.fcmKey = payload.fcmKey
      state.deviceId = payload.deviceId */
    },
    MU_USER_ACCESS (state, payload) {
      var user = {}
      if (!state.userInfo) state.userInfo = {}
      if (localStorage.getItem('user')) {
        user = JSON.parse(localStorage.getItem('user'))
      }
      if (payload.uAccessToken) {
        user.uAccessToken = payload.uAccessToken
        state.userInfo.uAccessToken = payload.uAccessToken
      }
      if (payload.partnerToken) {
        user.partnerToken = payload.partnerToken
        state.userInfo.partnerToken = payload.partnerToken
      }
      localStorage.setItem('user', JSON.stringify(user))
    },
    MU_CLEAN_USER (state, payload) {
      state.userInfo = {}
    },
    MU_NET_STATE (state, payload) {
      state.netStateYn = payload
    },
    MU_SET_CERTI (state, payload) {
      if (payload.success) {
        state.userCerti.certiYn = payload.success
        state.userCerti.certi = payload
      }
    },
    MU_STATUS_BAR_HEIGHT (state, payload) {
      state.statusBarHeight = payload
    }
  },
  actions: {
    AC_USER ({ commit }, payload) {
      commit('MU_USER', payload)
    },
    AC_NET_STATE ({ commit }, payload) {
      commit('MU_NET_STATE', payload)
    },
    AC_SET_CERTI ({ commit }, payload) {
      commit('MU_SET_CERTI', payload)
    }
  }
}

export default D_USER
