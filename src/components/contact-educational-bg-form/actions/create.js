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
    return this.xhr.__postData(`contact/education`, opt, headers, false)
  }

  async update (opt, headers) {
    this.xhr = new (await URL).default()
    return this.xhr.__putData(`contact/education`, opt, headers, false)
  }

  async get (opt) {
    this.xhr = new (await URL).default()
    return this.xhr.__getData(`contact/education/${opt.id}/details`)
  }

  showEmptyDetails () {
    document.querySelector('#modal-education-form').innerHTML = '<center><h3>Unable to process request</h3><small>Please try again later</small></center>'
  }

  getDetails () {
    return this.get({ id: this.__opt.id }).then(res => {
      if (!res[0].educ_id) return (this.showEmptyDetails())
      // form fields
      const institution = document.querySelector('#institution')
      const country = document.querySelector('#country')
      const type = document.querySelector('#type')
      const yearEnded = document.querySelector('#year_ended')
      const field = document.querySelector('#field')
      const scholarship = document.querySelector('#scholarship')

      institution.value = res[0].institution
      country.value = res[0].country
      type.value = res[0].type
      yearEnded.value = res[0].grad
      field.value = res[0].field
      scholarship.value = res[0].scholarship

      // save form
      let __proto__ = Object.create(this)
      document.querySelector('#modal-education-form').addEventListener('submit', this.__save.bind(__proto__))
    })
  }

  __save (e) {
    e.preventDefault()
    const saveBtn = document.querySelector('#modal-dialog-save-button')
    const statusTextBox = document.querySelector('.status-text')
    const educ = import('../../contact-educational-bg-list')
    const targ = document.querySelector('.contact-employment-list-section')

    // form fields
    const institution = e.target.querySelector('#institution')
    const country = e.target.querySelector('#country')
    const type = e.target.querySelector('#type')
    const yearEnded = e.target.querySelector('#year_ended')
    const field = e.target.querySelector('#field')
    const scholarship = e.target.querySelector('#scholarship')

    // set default behaviors
    saveBtn.setAttribute('disabled', 'disabled')
    statusTextBox.innerHTML = '<span class="text-danger">Saving . . . Please wait . . . <br/></span>'

    let query = ''
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    let payload = {
      id: this.__opt.id,
      institution: institution.value,
      country: country.value,
      type: type.value,
      field: field.value,
      scholarship: scholarship.value,
      grad: yearEnded.value
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
        statusTextBox.innerHTML = '<div class="alert alert-success">Saved!</div>'
        e.target.reset()
        setTimeout(() => {
          document.querySelector('#general-modal').close()
        }, 2500)
        // append to DOM
        educ.then(con => {
          // DOM
          // UPDATE ID
          payload.educ_id = res
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
