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
    return this.xhr.__postData(`contact/training`, opt, headers, false)
  }

  async update (opt, headers) { 
    this.xhr  = new (await URL).default()
    return this.xhr.__putData(`contact/training`, opt, headers, false)
  }

  async get (opt) {
    this.xhr  = new (await URL).default()
    return this.xhr.__getData(`contact/training/${opt.id}/details`)
  }

  async getSaaf (id = 0) {
    this.xhr  = new (await URL).default()
    return id ? this.xhr.__getData(`saaf/class/${id}`) : this.xhr.__getData(`saaf/class`)
  }

  bindSaffListener (targ, parentNode, parentNodeID, stat = '') {
    targ.addEventListener('change', (e) => {
      let id = (e.target.value)
    
      if (id == 'null') return document.querySelector(`#select-saaf-${parentNodeID}-container`).innerHTML = ''
     
        stat.innerHTML = 'loading sub categories . . .'
        this.getSaaf(id).then(res => {
          if(res.data.length) {
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
    new Promise((resolve, reject) => {
      this.getSaaf ().then(res => {
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
    document.querySelector('#modal-education-form').innerHTML = '<center><h3>Unable to process request</h3><small>Please try again later</small></center>'
  }

  getDetails () {
    
    return this.get({ id: this.__opt.id}).then(res => {
      if(!res[0].training_id) return (this.showEmptyDetails ())
      //form fields
      const title = document.querySelector('#title')
      const venue = document.querySelector('#venue')
      const from = document.querySelector('#from')
      const to = document.querySelector('#to')
      const trainType = document.querySelector('#trainType')
      const host = document.querySelector('#host')
      const sponsor = document.querySelector('#sponsor')
      const scholarship = document.querySelector('#scholarship')
      const saafType = document.querySelector('#type')
      const agency = document.querySelector('#agency')
      const supervisor = document.querySelector('#supervisor')
      const designation = document.querySelector('#designation')
      const notes = document.querySelector('#notes')

      title.value = res[0].title
      venue.value = res[0].venue
      from.value = res[0].dateStarted
      to.value = res[0].dateEnded
      host.value = res[0].hostUniversity
      sponsor.value = res[0].sponsor
      scholarship.value = res[0].scholarship
      agency.value = res[0].organizingAgency
      supervisor.value = res[0].supervisor
      designation.value = res[0].supervisorDesignation
      notes.innerHTML = res[0].notes

      // selected saaf type
      if(res[0].saaftype_id) {
        saafType.options[0].value = res[0].saaftype_id
        saafType.options[0].innerText = `${res[0].saafclass} (Selected)`
      }


      // selected  type
      if(res[0].trainingType) {
        trainType.options[0].value = res[0].saaftype_id
        trainType.options[0].innerText = `${res[0].trainingType} (Selected)`
      }
        
      
      // save form
      let __proto__ = Object.assign({ __proto__: this.__proto__ }, this)
      document.querySelector('#modal-education-form').addEventListener('submit', this.__save.bind(__proto__))
    
    })
  }
  
  __save (e) {
    e.preventDefault()
    const saveBtn = document.querySelector('#modal-dialog-save-button')
    const statusTextBox = document.querySelector('.status-text')
    const train = import('../../contact-training-list')
    const targ = document.querySelector('.contact-training-list-section')

    //form fields
    const title = e.target.querySelector('#title')
    const venue = e.target.querySelector('#venue')
    const from = e.target.querySelector('#from')
    const to = e.target.querySelector('#to')
    const trainType = e.target.querySelector('#trainType')
    const host = e.target.querySelector('#host')
    const sponsor = e.target.querySelector('#sponsor')
    const scholarship = e.target.querySelector('#scholarship')
    const agency = e.target.querySelector('#agency')
    const supervisor = e.target.querySelector('#supervisor')
    const designation = e.target.querySelector('#designation')
    const notes = e.target.querySelector('#notes')
    let saafType = null

    // set default behaviors
    saveBtn.setAttribute('disabled', 'disabled')
    statusTextBox.innerHTML = '<span class="text-danger">Saving . . . Please wait . . . <br/></span>'

    const types = document.querySelectorAll('.type')
    types.forEach((el, index) => {
      if(el.value != 'null') saafType = el.value
    })


    let query = ''
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    let payload = {
      id: this.__opt.id,
      title: title.value,
      venue: venue.value,
      dateStarted: from.value,
      dateEnded: to.value,
      scholarship: scholarship.value,
      sponsor: sponsor.value,
      supervisor: supervisor.value,
      supervisorDesignation: designation.value,
      trainingType: trainType.value,
      organizingAgency: agency.value,
      hostUniversity: host.value,
      notes: notes.value,
      saafTypeId: saafType,
    }

    for(let key in payload) {
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
       train.then(con => {
          // DOM
          payload.training_id = res
          
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