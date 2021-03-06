/* eslint-disable new-cap */
const URL = import('../../../utils/xhr')

export default class {
  constructor () {
    this.timestamp = new Date().getTime()
    this.xhr = {}
  }

  async get (opt) {
    this.xhr = new (await URL).default()
    return this.xhr.__getData(`contact?page=${opt.page ? opt.page : 1}`, opt.headers)
  }
}
