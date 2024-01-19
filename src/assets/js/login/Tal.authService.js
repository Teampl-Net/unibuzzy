/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// import { firebaseApp } from "./Tal.firebase"

class AuthServcie {
  constructor () {
    // this.auth = firebase.getAuth()
    this.googleProvider = new firebase.auth.GoogleAuthProvider()
    this.githubProvider = new firebase.auth.GithubAuthProvider()

    // this.googleProvider = firebase.GoogleAuthProvider()
    // this.githubProvider = firebase.GithubAuthProvider()
  }

  async login (providerName) {
    const provider = this.getProvider(providerName)
    if (providerName === 'Google') {
      provider.setCustomParameters({
        prompt: 'select_account',
        redirect_uri: 'https://hybricnet.page.link/loginCallback/google'
      })
    }
    return await firebase.auth().signInWithPopup(provider)
  }

  getProvider (providerName) {
    switch (providerName) {
      case 'Google':
        return this.googleProvider
      case 'Github':
        return this.githubProvider
    }
  }
}

export default AuthServcie
