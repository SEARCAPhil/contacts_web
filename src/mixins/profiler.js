export default class {
  constructor (opt = {}) {
    this.__opt = opt
    this.__profile =  {}
  }
  set (data) {
    localStorage.setItem('profile', JSON.stringify(data))
  }

  get() {
    this.__profile = localStorage.getItem('profile')
    return this.__profile ? JSON.parse(this.__profile) : {}
  }
}