/* eslint-disable new-cap */
const URL = import('../../../utils/xhr')

export default class {
  constructor (opt) {
    this.timestamp = new Date().getTime()
    this.xhr = {}
    this.__opt = opt
    return this.render()
  }

  async create (opt, headers) {
    this.xhr = new (await URL).default()
    return this.xhr.__postData(`contact/communication`, opt, headers, false)
  }

  async update (opt, headers) {
    this.xhr = new (await URL).default()
    return this.xhr.__putData(`contact/communication`, opt, headers, false)
  }

  async get (opt) {
    this.xhr = new (await URL).default()
    return this.xhr.__getData(`contact/communication/${opt.id}/details`)
  }

  showEmptyDetails () {
    document.querySelector('#modal-employment-form').innerHTML = '<center><h3>Unable to process request</h3><small>Please try again later</small></center>'
  }

  __save (e) {
    e.preventDefault()
    const saveBtn = document.querySelector('#modal-dialog-save-button')
    const statusTextBox = document.querySelector('.status-text')

    // form fields
    const val = e.target.querySelector('#value')
    const type = e.target.querySelector('#type')

    // set default behaviors
    saveBtn.setAttribute('disabled', 'disabled')
    statusTextBox.innerHTML = '<span class="text-danger">Saving . . . Please wait . . . <br/></span>'

    let query = ''
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    let payload = {
      id: this.__opt.id,
      type: type.value,
      value: val.value
    }

    for (let key in payload) {
      console.log(payload[key])
      query += encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]) + '&'
    }

    // UPDATE
    // activated if "update" is set to true
    if (this.__opt.update) {
      return this.update(query, headers, false).then(res => {
        if (res > 0) window.location.reload()
        statusTextBox.innerHTML = '<div class="alert alert-danger">Unable to save. Please try again later</div>'
        saveBtn.removeAttribute('disabled')
      })
    }

    // CREATE
    this.create(query, headers, false).then(res => {
      // reset form
      if (res > 0) {
        // saved
        statusTextBox.innerHTML = '<div class="alert alert-success">Saved!</div>'
        e.target.reset()

        setTimeout(() => {
          document.querySelector('#general-modal').close()
        }, 2500)
      }
      saveBtn.removeAttribute('disabled')
    }).catch(e => (statusTextBox.innerHTML = '<div class="alert alert-danger">Unable to save. Please try again later</div>'))
  }
  __load () {
    const targ = document.querySelector('#general-modal > .content > .body')
    const form = import('../index')
    const __proto__ = Object.create(this)
    targ.innerHTML = '<center class="text-muted mt-5" style="margin-top: 30%;">Loading <i class="fa fa-spinner"></i> <br/> Please wait . . .</center>'
    form.then(res => {
      targ.innerHTML = res.template

      // attach close event to btn
      targ.querySelector('#modal-dialog-close-button').addEventListener('click', () => document.querySelector('#general-modal').close())

      // show item information if "update" parameter is set to TRUE
      if (this.__opt.update) return this.getDetails()

      // save form
      document.querySelector('#modal-employment-form').addEventListener('submit', this.__save.bind(__proto__))
    })
  }

  bind () {
    const __proto__ = Object.create(this)
    this.__opt.root = this.__opt.root || document
    this.__opt.root.querySelector(this.__opt.target).addEventListener('click', this.__load.bind(__proto__))
  }

  render () {
    this.bind()
  }
}
