import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'

class AuthServcie {
  constructor (app) {
    this.auth = getAuth(app)
  }

  async login (providerName) {
    const Provider = this.getProvider(providerName)
    const result = await signInWithPopup(this.auth, new Provider())
    result.credential = Provider.credentialFromResult(result)
    return result
  }

  getProvider (providerName) {
    switch (providerName) {
      case 'Google':
        return GoogleAuthProvider
      case 'Github':
        return GithubAuthProvider
    }
  }
}

export default AuthServcie
