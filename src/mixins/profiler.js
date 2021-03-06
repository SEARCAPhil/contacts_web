export default class {
  constructor (opt = {}) {
    this.__opt = opt
    this.__profile = {}
  }
  set (data) {
    window.localStorage.setItem('profile', JSON.stringify(data))
  }

  get () {
    this.__profile = window.localStorage.getItem('profile')
    return this.__profile ? JSON.parse(this.__profile) : {}
  }

  clear () {
    window.localStorage.clear()
    return this
  }

  setAccessToken (accessToken) {
    // set in private mode
    window.localStorage.setItem('cwp.access_token', accessToken)
  }

  getAccessToken () {
    // set in private mode
    return window.localStorage.getItem('cwp.access_token')
  }
}
