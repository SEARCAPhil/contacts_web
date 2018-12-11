const URL = import('../../../utils/xhr')

export default class {
  constructor(){
    this.timestamp = new Date().getTime()
    this.xhr = {}
    this.__submitted = false
	}
	
  async post (payload) { this.xhr  = new (await URL).default()
    let query = ''
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    for(let key in payload) {
      query += encodeURIComponent(key) +'='+encodeURIComponent(payload[key])+'&'
    }
    return this.xhr.__postData(`contact`, query, headers,  false)
  }

  __error () {
    this.__statusSection.innerHTML = '<span class="alert alert-danger" style="padding-bottom: 10px;"><i class="fa fa-warning"></i> Sorry! Unable to process request. Please try again later</span>'
  }
  __saving() {
    this.__statusSection.innerHTML = '<span class="text-danger"><i class="fa fa-spinner"></i> Saving . . .</span>'
  }
  __saved (id) {
    this.__statusSection.innerHTML = '<span class="alert alert-success"><i class="fa fa-check-circle"></i> Saved</span>'
    this.__form.reset ()
    this.__redirect (id)
  }
  __redirect (id) {
    this.__statusSection.innerHTML = '<span class="alert alert-success">redirecting . .  . please wait</span>'
    setTimeout(() => window.location.hash = `#/account/${id}/profile` ,800)
  }
  __submit(payload) {
    this.post(payload).then(res => {
      if(typeof res === 'number' && res > 0) {
        this.__saved (res)
      } else {
        this.__error ()
      }
    })
    
  }
  __validate() {
    let errors = {}
    let lastName = this.__template.querySelector('#lastName')
    let firstName = this.__template.querySelector('#firstName')
    let middleName = this.__template.querySelector('#middleName')
    let suffix = this.__template.querySelector('#suffix')
    let gender = this.__template.querySelectorAll('[name="gender"]')
    let birthday = this.__template.querySelector('#birthday')
    let nationality = this.__template.querySelector('#nationality')
    let specialization = this.__template.querySelector('#specialization')
    let civilStatus = this.__template.querySelectorAll('[name="civilStatus"]')
    let country = this.__template.querySelector('#country')
    let address = this.__template.querySelector('#address')
    let areaCode = this.__template.querySelector('#areaCode')
    let zipCode = this.__template.querySelector('#zipCode')
    let affiliateCode = this.__template.querySelector('#affiliateCode')
    let rank = this.__template.querySelector('#rank')
    let notes = this.__template.querySelector('#notes')

    // Validation
    if(!firstName.value.length) {
      errors['firstName'] = 'empty'
    } else {
      delete errors['firstName']
    }

    if(!lastName.value.length) {
      errors['lastName'] = 'empty'
    } else {
      delete errors['lastName']
    }

    // payload
    let payload = {
      lastname : lastName.value,
      firstname : firstName.value,
      middlename : middleName.value,
      suffix : suffix.value,
      birthdate: birthday.value,
      gender: gender[0].checked ? gender[0].value : gender[1].value,
      civilStatus: civilStatus[0].checked ? civilStatus[0].value : civilStatus[1].value,
      nationality: nationality.value,
      specialization: specialization.value,
      country : country.value,
      address: address.value,
      areaCode: areaCode.value,
      zipCode : zipCode.value,
      rank : rank.value,
      notes : notes.value,  
    }

    return new Promise((resolve, reject) => {
      if(errors.length) {
         reject ()
      } else {
        resolve(payload)
      }
    })
  }

  validate (dom = {}) {
    this.__template = dom || document
    this.__statusSection = this.__template.querySelector('.saving-status-section')

    this.__form = this.__template.querySelector('#contact-form')
    this.__form.addEventListener('submit', (e) => {
      e.preventDefault()
      // prevent multiple submit
      if(!this.__submitted) {
        this.__saving()
        // validate inputs
        this.__validate().then(payload => {
          // save
          this.__submit(payload)
          // reset after 3 secs
          setTimeout(() => this.__submitted = false ,3000)
        }).catch(err => {
          this.__error ()
        })

        // prevent multiple submit
        this.__submitted = true
      }
    });
  }
}