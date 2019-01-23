/* eslint-disable new-cap */
const URL = import('../../../utils/xhr')

export default class {
  constructor (opt) {
    this.timestamp = new Date().getTime()
    this.xhr = {}
    this.__opt = opt
    this.__headers = { 'Authorization': `Bearer ${window.localStorage.getItem('cwp.access_token')}` }
    return this.render()
  }

  async create (opt, headers) {
    this.xhr = new (await URL).default()
    return this.xhr.__postData(`contact/conference/lecture`, opt, headers, false)
  }

  async update (opt, headers) {
    this.xhr = new (await URL).default()
    return this.xhr.__putData(`contact/conference/lecture`, opt, headers, false)
  }

  async get (opt, headers) {
    this.xhr = new (await URL).default()
    return this.xhr.__getData(`contact/conference/lecture/${opt.id}/details`, headers)
  }

  showEmptyDetails () {
    document.querySelector('#modal-education-form').innerHTML = '<center><h3>Unable to process request</h3><small>Please try again later</small></center>'
  }

  getDetails () {
    return this.get({ id: this.__opt.id }, this.__headers).then(res => {
      if (!res[0].id) return (this.showEmptyDetails())
      // form fields
      const title = document.querySelector('#title')
      const venue = document.querySelector('#venue')
      const from = document.querySelector('#from')
      const to = document.querySelector('#to')
      const lectureTitle = document.querySelector('#lectureTitle')

      title.value = res[0].paperTitle
      venue.value = res[0].lectureVenue
      from.value = res[0].dateStarted
      to.value = res[0].dateEnded
      lectureTitle.value = res[0].lectureTitle

      // save form
      let __proto__ = Object.create(this)
      document.querySelector('#modal-education-form').addEventListener('submit', this.__save.bind(__proto__))
    })
  }

  __save (e) {
    e.preventDefault()
    const saveBtn = document.querySelector('#modal-dialog-save-button')
    const statusTextBox = document.querySelector('.status-text')
    const conf = import('../../contact-conference-lecture-list')
    const targ = document.querySelector('.contact-conference-lectures-list-section')

    // form fields
    const title = e.target.querySelector('#title')
    const venue = e.target.querySelector('#venue')
    const from = e.target.querySelector('#from')
    const to = e.target.querySelector('#to')
    const lectureTitle = e.target.querySelector('#lectureTitle')

    // set default behaviors
    saveBtn.setAttribute('disabled', 'disabled')
    statusTextBox.innerHTML = '<span class="text-danger">Saving . . . Please wait . . . <br/></span>'

    let query = ''
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': this.__headers.Authorization
    }

    let payload = {
      id: this.__opt.id,
      title: title.value,
      lectureVenue: venue.value,
      dateStarted: from.value,
      dateEnded: to.value,
      lectureTitle: lectureTitle.value
    }

    for (let key in payload) {
      query += encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]) + '&'
    }

    // UPDATE
    // activated if "update" is set to true
    if (this.__opt.update) {
      return this.update(query, headers, false).then(res => {
        if (res > 0) return window.location.reload()
        statusTextBox.innerHTML = '<div class="alert alert-danger">Unable to save. Please try again later</div>'
        saveBtn.removeAttribute('disabled')
      })
    }

    // CREATE
    this.create(query, headers, false).then(res => {
      // reset form
      if (res > 0) {
        document.querySelector('#modal-body').innerHTML = `<center>
          <h3 style="color: green;">
            <i class="fa fa-check" style="color: green;font-size: 1em;"></i>
            Saved Successfully!
          </h3>
          <p>Your changes has been saved. This will close automatically</p>
        </center>`
        setTimeout(() => {
          document.querySelector('#general-modal').close()
        }, 2500)

        // append to DOM
        conf.then(con => {
          // DOM
          // UPDATE ID
          payload.id = res
          // empty lectures
          payload.lectures = []
          return new con.default(payload).then(html => {
            targ.append(html)
          })
        })
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
      document.querySelector('#modal-education-form').addEventListener('submit', this.__save.bind(__proto__))
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
