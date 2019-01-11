
const URL =  import('../../config/api')

export default class {
  constructor(opt = {}) {
    this.__opt = opt
    this.__emailType = 'email'
    this.__emails = ''
    this.__contactInfo = ''
    return this.render(opt) 
  }

  __bindListeners () {
    this.__template.addEventListener('click', () => {
      window.location.href = `#/account/${this.__opt.contact_id}/profile`
    })

    URL.then(conf => {
      let URI = conf.URL
      let photoSrc = `${URI.scheme}://${URI.host}/${URI.base}/uploads/${this.__opt.photo}`
      let targ = this.__template.querySelector('.img-sec')
      if(this.__opt.photo !== null) targ.innerHTML = `<img src="${photoSrc}" class="user-image img-circle margin-l-5" alt="User Image" width="40px" style="margin-left: 20px;">`
    })
  }

  __parseCom () {
    this.__opt.communications.forEach((el, index) => {
      if(el.type === this.__emailType)  {
        this.__emails += `${el.value}<br/>`
      } else {
        this.__contactInfo += `<b>${el.type}</b> : ${el.value} <br/>`
      }
    })
  }

  async render () {
    this.__parseCom()
    this.__template = document.createElement('div')
    this.__template.classList.add('col', 'row', `contact-list-section-item-${this.__opt.contact_id}`)
    this.__template.innerHTML = `
      <section class="col col-sm-12"">
        <div class="col col-lg-1 img-sec">
          <img class="profile-user-img img-responsive img-circle" src="assets/img/boy.png" alt="User profile picture">
        </div>
        <div class="col col-lg-2"><b>${this.__opt.firstname} ${this.__opt.middleinit} ${this.__opt.lastname}</b></div>
        <div class="col col-lg-2"><a href="#">${this.__emails}</a></div>
        <div class="col col-lg-2">${this.__opt.nationality}</div>
        <div class="col col-lg-2">
          <span class="text-muted">${this.__contactInfo}</span><br>
        </div>
        <div class="col col-lg-1">${this.__opt.affiliateCode}</div>
        <div class="col col-lg-2">
          <a href="#/account/${this.__opt.contact_id}/profile" class="text-info">View</a>&emsp;
          <a href="#/contacts/form/${this.__opt.contact_id}/update" class="text-info"> <i class="fa fa-pencil"></i> Update</a>
        </div>
        <div class="col col-lg-12" style="border-bottom: 1px solid rgba(200,200,200,0.3);margin-bottom: 20px;margin-top: 20px;"></div> </section>`
    this.__bindListeners()
    return this.__template;
  }
}