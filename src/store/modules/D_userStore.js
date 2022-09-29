
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
    userInfo: null
  },
  getters: {
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
      return state.userInfo /* {
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
      state.userInfo = payload
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
    }
  },
  actions: {
    AC_USER ({ commit }, payload) {
      commit('MU_USER', payload)
    }
  }
}

export default D_USER
