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
    return this.xhr.__postData(`contact/engagement`, opt, headers, false)
  }

  async update (opt, headers) { 
    this.xhr  = new (await URL).default()
    return this.xhr.__putData(`contact/engagement`, opt, headers, false)
  }

  async get (opt) {
    this.xhr  = new (await URL).default()
    return this.xhr.__getData(`contact/engagement/${opt.id}/details`)
  }

  async getAfftype () {
    this.xhr  = new (await URL).default()
    return this.xhr.__getData(`afftype`)
  }


  async getResearch (opt) {
    this.xhr  = new (await URL).default()
    return this.xhr.__getData(`contact/research/${opt.id}`)
  }


  showEmptyDetails () {
    document.querySelector('#modal-employment-form').innerHTML = '<center><h3>Unable to process request</h3><small>Please try again later</small></center>'
  }

  async loadResearch () {
    if(this.__opt.research) {
      let targ = document.querySelector('select.research')
      return this.__opt.research.forEach((el, index) => {
        let opt = document.createElement('option')
        opt.value = el.research_id
        opt.innerText = el.title
        targ.append(opt)
      })
    }
  }

  loadAfftype () {
    let targ = document.querySelector('select.afftype')
    return this.getAfftype().then(res => {
      res.data.forEach((el, index) => {
        let opt = document.createElement('option')
        opt.value = el.type_id
        opt.innerText = el.afftypeName
        targ.append(opt)
      })
    })
  }

  getDetails () {
    
    return this.get({ id: this.__opt.id}).then(res => {
      if(!res[0].engage_id) return (this.showEmptyDetails ())
      //form fields
      const engagement= document.querySelector('input#engagement')
      const from = document.querySelector('#from')
      const to = document.querySelector('#to')
      const research = document.querySelector('select.research')
      const afftype = document.querySelector('select.afftype')

      engagement.value = res[0].engagement
      from.value = res[0].engageFrom
      to.value = res[0].engageTo  
      research.value = res[0].researchId

      //afftpye
      let affVal = document.createElement('option')
      affVal.innerHTML = res[0].afftypeName
      affVal.value = res[0].type
      affVal.setAttribute('selected', 'selected')
      afftype.prepend(affVal)

      //research
      let researchVal = document.createElement('option')
      researchVal.innerHTML = res[0].title
      researchVal.value = res[0].research_id 
      research.prepend(researchVal)
      // load other research
      this.getResearch({id: res[0].contact_id}).then(r => {
        this.__opt.research = r.data
        // load other  research made
        this.loadResearch()
      })

      // save form
      let __proto__ = Object.assign({ __proto__: this.__proto__ }, this)
      document.querySelector('#modal-employment-form').addEventListener('submit', this.__save.bind(__proto__))
    
    })
  }
  
  __save (e) {
    e.preventDefault()
    const saveBtn = document.querySelector('#modal-dialog-save-button')
    const statusTextBox = document.querySelector('.status-text')
    const contact = import('../../contact-engagement-list')
    const targ = document.querySelector('.contact-engagement-list-section')

    //form fields
    const engagement = e.target.querySelector('input#engagement')
    const from = e.target.querySelector('#from')
    const to = e.target.querySelector('#to')
    const research = e.target.querySelector('select.research')
    const afftype = e.target.querySelector('select.afftype')
    const title = research.selectedOptions[0].innerText
    const type = afftype.selectedOptions[0].innerText

    // set default behaviors
    saveBtn.setAttribute('disabled', 'disabled')
    statusTextBox.innerHTML = '<span class="text-danger">Saving . . . Please wait . . . <br/></span>'


    let query = ''
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    let payload = {
      id: this.__opt.id,
      engagement: engagement.value,
      engageFrom: from.value,
      engageTo: to.value,
      researchId: research.value,
      type: afftype.value,
    }

    for(let key in payload) {
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
    if(!this.__opt.update) this.create(query, headers, false).then(res => {
      // reset form
      if (res > 0) {
         (statusTextBox.innerHTML = '<div class="alert alert-success">Saved!</div>') | e.target.reset()
          setTimeout(() => {
            document.querySelector('#general-modal').close()
          }, 2500)

        // append to DOM
        contact.then(res => {
          payload.engagement_id = res
          payload.title = title
          payload.type = type
            new res.default(payload).then(html => {
              targ.append(html)
            })
        })
      }
      saveBtn.removeAttribute('disabled')
    }).catch(e => saveBtn.removeAttribute('disabled') | (statusTextBox.innerHTML = '<div class="alert alert-danger">Unable to save. Please try again later</div>'))
  }
  __load () {
    const targ = document.querySelector('#general-modal > .content > .body')
    const form = import('../index')
    const __proto__ = Object.assign({ __proto__: this.__proto__ }, this)
    targ.innerHTML = '<center class="text-muted mt-5" style="margin-top: 30%;">Loading <i class="fa fa-spinner"></i> <br/> Please wait . . .</center>'
    form.then(res => {
      targ.innerHTML = res.template
      // load research and affiliation
      this.loadResearch()
      this.loadAfftype()

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