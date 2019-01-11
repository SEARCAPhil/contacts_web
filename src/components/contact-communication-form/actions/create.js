const URL = import('../../../utils/xhr')

export default class {
  constructor(opt){
    this.timestamp = new Date().getTime()
    this.xhr = {}
    this.__opt = opt
    return this.render()
	}
	
  async create (opt, headers) { 
    this.xhr  = new (await URL).default()
    return this.xhr.__postData(`contact/communication`, opt, headers, false)
  }

  async update (opt, headers) { 
    this.xhr  = new (await URL).default()
    return this.xhr.__putData(`contact/communication`, opt, headers, false)
  }

  async get (opt) {
    this.xhr  = new (await URL).default()
    return this.xhr.__getData(`contact/communication/${opt.id}/details`)
  }

  showEmptyDetails () {
    document.querySelector('#modal-employment-form').innerHTML = '<center><h3>Unable to process request</h3><small>Please try again later</small></center>'
  }

  getDetails () {
    
    return this.get({ id: this.__opt.id}).then(res => {
      if(!res[0].employ_id) return (this.showEmptyDetails ())
      //form fields
      const company = document.querySelector('#company_name')
      const position = document.querySelector('#position')
  

      company.value = res[0].companyName
      position.value = res[0].position
      yearStarted.value = res[0].employedFrom
      yearEnded.value = res[0].employedTo
      sector.value = res[0].sector
      address.value = res[0].companyAddress

      // save form
      let __proto__ = Object.assign({ __proto__: this.__proto__ }, this)
      document.querySelector('#modal-employment-form').addEventListener('submit', this.__save.bind(__proto__))
    
    })
  }
  
  __save (e) {
    e.preventDefault()
    const saveBtn = document.querySelector('#modal-dialog-save-button')
    const statusTextBox = document.querySelector('.status-text')
    const contact = import('../../contact-employment-list')
    const targ = document.querySelector('.contact-employment-list-section')

    //form fields
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
      value: val.value,
    }

    for(let key in payload) { console.log(payload[key])
      query += encodeURIComponent(key) +'='+encodeURIComponent(payload[key])+'&'
    }

    // UPDATE
    // activated if "update" is set to true
    if(this.__opt.update) return this.update(query, headers, false).then(res => {
      if (res > 0) window.location.reload()
      statusTextBox.innerHTML = '<div class="alert alert-danger">Unable to save. Please try again later</div>'
      saveBtn.removeAttribute('disabled')
    })

    // CREATE
    this.create(query, headers, false).then(res => {
      // reset form
      if (res > 0) {
         (statusTextBox.innerHTML = '<div class="alert alert-success">Saved!</div>') | e.target.reset()
          setTimeout(() => {
            document.querySelector('#general-modal').close()
          }, 2500)
      }
      saveBtn.removeAttribute('disabled')
    }).catch(e => statusTextBox.innerHTML = '<div class="alert alert-danger">Unable to save. Please try again later</div>')
  }
  __load () {
    const targ = document.querySelector('#general-modal > .content > .body')
    const form = import('../index')
    const __proto__ = Object.assign({ __proto__: this.__proto__ }, this)
    targ.innerHTML = '<center class="text-muted mt-5" style="margin-top: 30%;">Loading <i class="fa fa-spinner"></i> <br/> Please wait . . .</center>'
    form.then(res => {
      targ.innerHTML = res.template

      // attach close event to btn
      targ.querySelector('#modal-dialog-close-button').addEventListener('click', () => document.querySelector('#general-modal').close())

      //show item information if "update" parameter is set to TRUE
      if(this.__opt.update) return this.getDetails()

      // save form
      document.querySelector('#modal-employment-form').addEventListener('submit', this.__save.bind(__proto__))
    })
  }

  bind () {
    const __proto__ = Object.assign({ __proto__: this.__proto__ }, this)
    this.__opt.root = this.__opt.root || document
    this.__opt.root.querySelector(this.__opt.target).addEventListener('click', this.__load.bind(__proto__))
  }

  render () {
    this.bind()
  }

}