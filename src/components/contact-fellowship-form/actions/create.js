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
    return this.xhr.__postData(`contact/fellow`, opt, headers, false)
  }

  async update (opt, headers) {
    this.xhr = new (await URL).default()
    return this.xhr.__putData(`contact/fellow`, opt, headers, false)
  }

  async get (opt, headers) {
    this.xhr = new (await URL).default()
    return this.xhr.__getData(`contact/fellow/${opt.id}/details`, headers)
  }

  async getSaaf (id = 0) {
    this.xhr = new (await URL).default()
    return id ? this.xhr.__getData(`saaf/class/${id}`, this.__headers) : this.xhr.__getData(`saaf/class`, this.__headers)
  }

  bindSaffListener (targ, parentNode, parentNodeID, stat = '') {
    targ.addEventListener('change', (e) => {
      let id = (e.target.value)

      if (id === 'null') return (document.querySelector(`#select-saaf-${parentNodeID}-container`).innerHTML = '')

      stat.innerHTML = 'loading sub categories . . .'
      this.getSaaf(id).then(res => {
        if (res.data.length) {
          // create new option
          let div = document.createElement('div')
          div.id = `select-saaf-${id}-container`
          let opts = ''
          div.classList.add('form-group')
          div.style.marginTop = '10px'

          // options
          res.data.forEach((el, index) => {
            opts += `<option value="${el.saafclass_id}">${el.saafclass}</option>`
          })

          div.innerHTML = `
            <select class="form-control type type-hidden-accessible" id="select-saaf-${id}" style="width: 100%;" tabindex="-1" aria-hidden="true">
              <option default="" value="null">Please Select SAAF Type</option>
              ${opts}
            </select>
            <div class="form-group id="select-saaf-${id}-container"></div>
            `
          this.bindSaffListener(div.querySelector('select'), div, id, stat)
          let newTarg = document.querySelector(`#select-saaf-${id}-container`)
          if (newTarg) newTarg.innerHTML = ''

          parentNode.append(div)
        }

        stat.innerHTML = ''
      })
    })
  }

  getRootSaafType () {
    let targ = document.querySelector('#type')
    let stat = document.querySelector('.saaf-type-status-text-section')
    let parentNode = targ.nextElementSibling
    return new Promise((resolve, reject) => {
      this.getSaaf().then(res => {
        if (!res.data) return

        res.data.forEach((el, index) => {
          let opt = document.createElement('option')
          opt.innerHTML = el.saafclass
          opt.value = el.saafclass_id
          targ.append(opt)
        })

        this.bindSaffListener(targ, parentNode, null, stat)
        resolve()
      })
    })
  }

  showEmptyDetails () {
    document.querySelector('#modal-employment-form').innerHTML = '<center><h3>Unable to process request</h3><small>Please try again later</small></center>'
  }

  getDetails () {
    return this.get({ id: this.__opt.id }, this.__headers).then(res => {
      if (!res[0].fellowaff_id) return (this.showEmptyDetails())
      // form fields
      const from = document.querySelector('#from')
      const to = document.querySelector('#to')
      const type = document.querySelector('select#type')

      from.value = res[0].dateFrom
      to.value = res[0].dateTo

      // selected saaf type
      if (res[0].saaftype_id) {
        type.options[0].value = res[0].saaftype_id
        type.options[0].innerText = `${res[0].saafclass} (Selected)`
      }

      // save form
      let __proto__ = Object.create(this)
      document.querySelector('#modal-employment-form').addEventListener('submit', this.__save.bind(__proto__))
    })
  }

  __save (e) {
    e.preventDefault()
    const saveBtn = document.querySelector('#modal-dialog-save-button')
    const statusTextBox = document.querySelector('.status-text')
    const contact = import('../../contact-fellowship-list')
    const targ = document.querySelector('.contact-fellowship-list-section')

    // form fields
    const from = e.target.querySelector('#from')
    const to = e.target.querySelector('#to')
    let type = null
    let typeName = ''

    // set default behaviors
    saveBtn.setAttribute('disabled', 'disabled')
    statusTextBox.innerHTML = '<span class="text-danger">Saving . . . Please wait . . . <br/></span>'

    const types = document.querySelectorAll('.type')
    types.forEach((el, index) => {
      if (el.value !== 'null') {
        type = el.value
        typeName = el.selectedOptions[0].innerText
      }
    })

    let query = ''
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': this.__headers.Authorization
    }

    let payload = {
      id: this.__opt.id,
      dateFrom: from.value,
      dateTo: to.value,
      saafTypeId: type
    }

    for (let key in payload) {
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
    if (!this.__opt.update) {
      this.create(query, headers, false).then(res => {
      // reset form
        if (res > 0) {
          statusTextBox.innerHTML = '<div class="alert alert-success">Saved!</div>'
          e.target.reset()
          setTimeout(() => {
            document.querySelector('#general-modal').close()
          }, 2500)

          // append to DOM
          contact.then(res => {
            payload.fellowaff_id = res
            payload.saafclass = typeName
            new res.default(payload).then(html => {
              targ.append(html)
            })
          })
        }
        saveBtn.removeAttribute('disabled')
      }).catch(e => console.log(e) | saveBtn.removeAttribute('disabled') | (statusTextBox.innerHTML = '<div class="alert alert-danger">Unable to save. Please try again later</div>'))
    }
  }
  __load () {
    const targ = document.querySelector('#general-modal > .content > .body')
    const form = import('../index')
    const __proto__ = Object.create(this)
    targ.innerHTML = '<center class="text-muted mt-5" style="margin-top: 30%;">Loading <i class="fa fa-spinner"></i> <br/> Please wait . . .</center>'
    form.then(res => {
      targ.innerHTML = res.template
      // load
      this.getRootSaafType()

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
