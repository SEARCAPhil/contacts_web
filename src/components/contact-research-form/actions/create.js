import { type } from 'os';

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
    return this.xhr.__postData(`contact/research`, opt, headers, false)
  }

  async update (opt, headers) { 
    this.xhr  = new (await URL).default()
    return this.xhr.__putData(`contact/research`, opt, headers, false)
  }

  async get (opt) {
    this.xhr  = new (await URL).default()
    return this.xhr.__getData(`contact/research/${opt.id}/details`)
  }

  async getSaaf () {
    this.xhr  = new (await URL).default()
    return this.xhr.__getData(`saaf/class`)
  }

  showEmptyDetails () {
    document.querySelector('#modal-education-form').innerHTML = '<center><h3>Unable to process request</h3><small>Please try again later</small></center>'
  }

  getDetails () {
    
    return this.get({ id: this.__opt.id}).then(res => {
      if(!res[0].research_id) return (this.showEmptyDetails ())
      //form fields
      const title = document.querySelector('#title')
      const from = document.querySelector('#from')
      const to = document.querySelector('#to')
      const study = document.querySelector('#study')
      const host = document.querySelector('#host')
      const fundings = document.querySelector('#fundings')
      const remarks = document.querySelector('#remarks')
      const type = document.querySelector('#type')

      title.value = res[0].title
      from.value = res[0].dateStarted
      to.value = res[0].dateEnded
      study.value = res[0].fieldStudy
      host.value = res[0].hostUniversity
      fundings.value = res[0].funding
      remarks.innerHTML = res[0].remarks

      // selected saaf type
      if(res[0].saaftype_id) {
        type.options[0].value = res[0].saaftype_id
        type.options[0].innerText = `${res[0].saafclass} (Selected)`
      }

        
      
      // save form
      let __proto__ = Object.assign({ __proto__: this.__proto__ }, this)
      document.querySelector('#modal-education-form').addEventListener('submit', this.__save.bind(__proto__))
    
    })
  }

  getRootSaafType () {
    let targ = document.querySelector('#type')
    return this.getSaaf ().then(res => {
      if (!res.data) return

      res.data.forEach((el, index) => {
        let opt = document.createElement('option')
        opt.innerHTML = el.saafclass
        opt.value = el.saafclass_id
        targ.append(opt)
      })
    })
  }
  
  __save (e) {
    e.preventDefault()
    const saveBtn = document.querySelector('#modal-dialog-save-button')
    const statusTextBox = document.querySelector('.status-text')
    const research = import('../../contact-research-list')
    const targ = document.querySelector('.contact-research-list-section')

    //form fields
    const title = e.target.querySelector('#title')
    const from = e.target.querySelector('#from')
    const to = e.target.querySelector('#to')
    const study = e.target.querySelector('#study')
    const host = e.target.querySelector('#host')
    const fundings = e.target.querySelector('#fundings')
    const remarks = e.target.querySelector('#remarks')
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
      title: title.value,
      dateStarted: from.value,
      dateEnded: to.value,
      fieldStudy: study.value,
      funding: fundings.value,
      hostUniversity: host.value,
      remarks: remarks.value,
      saafTypeId: type.value, 
    }

    for(let key in payload) { console.log(payload[key])
      query += encodeURIComponent(key) +'='+encodeURIComponent(payload[key])+'&'
    }

    // UPDATE
    // activated if "update" is set to true
    if(this.__opt.update) return this.update(query, headers, false).then(res => {
      if (res > 0) return window.location.reload()
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
          
        // append to DOM
        research.then(con => {
          // DOM
          // UPDATE ID
          payload.research_id = res
          return new con.default(payload).then(html => {
            targ.append(html)
          })
        })
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
      //console.log(saaf)
      // attach close event to btn
      targ.querySelector('#modal-dialog-close-button').addEventListener('click', () => document.querySelector('#general-modal').close())
      
      // get SAAF parent class
      this.getRootSaafType ()

      //show item information if "update" parameter is set to TRUE
      if(this.__opt.update) return this.getDetails()

      // save form
      document.querySelector('#modal-education-form').addEventListener('submit', this.__save.bind(__proto__))
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