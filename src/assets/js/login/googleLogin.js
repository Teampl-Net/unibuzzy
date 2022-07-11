import firebase from 'firebase/app'
import 'firebase/auth'
const firebaseConfig = {
  apiKey: 'AIzaSyCNLjqHR8F9kQKma056lThVIu5v2JsfSAg',
  authDomain: 'thealim-2602c.firebaseapp.com',
  projectId: 'thealim-2602c',
  storageBucket: 'thealim-2602c.appspot.com',
  messagingSenderId: '777053173385',
  appId: '1:777053173385:web:0de7347501346c761d3858',
  measurementId: 'G-0BYBFKL8TS'
}

const _this = this

var provider = new firebase.auth.GoogleAuthProvider()

firebase.auth().signInWithPopup(provider).then(function (result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken
  // The signed-in user info.
  var user = result.user
  // ...
  console.log(user)
  _this.$router.push('/profile')
}).catch(function (error) {
  // Handle Errors here.
  var errorCode = error.code
  var errorMessage = error.message
  // The email of the user's account used.
  var email = error.email
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential
  // ...
})

// firebase.js
firebase.initializeApp(firebaseConfig)
firebase.auth().onAuthStateChanged((fireU) => store.commit('setFireUser', fireU))

export default {
  install (Vue) {
    Vue.config.globalProperties.$firebase = methods.firebase
  }
}
