import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider
} from 'firebase/auth'

class AuthServcie {
  constructor () {
    this.auth = getAuth()
    this.googleProvider = new GoogleAuthProvider()
    this.githubProvider = new GithubAuthProvider()
  }

  login (providerName) {
    const provider = this.getProvider(providerName)
    return signInWithPopup(getAuth(), provider)
  }

  getProvider (providerName) {
    switch (providerName) {
      case 'Google':
        return new GoogleAuthProvider()
      case 'Github':
        return this.githubProvider
    }
  }
}

export default AuthServcie
