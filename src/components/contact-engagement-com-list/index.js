
const URL = import('../../config/api')

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    this.research = ''
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
      if (this.__opt.photo !== null) targ.innerHTML = `<img src="${photoSrc}" class="user-image img-circle margin-l-5" alt="User Image" style="margin-left: 20px;height: 40px;width: 40px;">`
    })
  }

  __parseResearch () {
    this.__opt.engage_research.forEach((el, index) => {
      this.research += `
    <br/>
    
    <b>Engage From: ${el.engageFrom || 'N/A'}</b><br/>
    <b>Engage To: ${el.engageTo || 'N/A'}</b><br/>
    <b>Affiliation : ${el.afftypeName ? '<span class="badge">' + el.afftypeName + '</span>' : 'N/A'}</b><br/>
    <br/>
    <small>
      <details open>
          <summary>Research</summary>
          <b>${el.title || 'No Research'}</b><br/>
          <b/>${el.hostUniversity ? ('<i class="fa fa-map-marker"></i> ' + el.hostUniversity) : ''}</b><br/>
          <b>Fundings : ${el.fundings || 'N/A'}</b><br/>
      </details>
    </small>
    <br/><br/>`
    })
  }

  async render () {
    this.__parseResearch()
    this.__template = document.createElement('div')
    this.__template.classList.add('col', 'row', `contact-list-section-item-${this.__opt.contact_id}`)
    this.__template.innerHTML = `
      <section class="col col-sm-12"">
        <div class="col col-lg-1 img-sec  col-xs-4">
          <img class="profile-user-img img-responsive img-circle" src="assets/img/boy.png" alt="User profile picture" style="width: 50px; height: 50px;">
        </div>
        <div class="col col-lg-2  col-xs-8"><b>${this.__opt.fullname || ''} ${this.__opt.firstname || ''} ${this.__opt.middleinit || ''} ${this.__opt.lastname || ''}</b></div>
        <div class="col col-lg-7 col-lg-offset-0  col-xs-8 col-xs-offset-4">${this.research}</div>
        <div class="col col-lg-2 col-lg-offset-0  col-xs-8 col-xs-offset-4">
          <span class="badge" style="background: #00BCD4; padding: 8px;">
            <a href="#/account/${this.__opt.contact_id}/profile" class="text-info" style="color: #fff;">View</a>
          </span>&emsp;
          <a href="#/contacts/form/${this.__opt.contact_id}/update" class="text-info"> <i class="fa fa-pencil"></i> Update</a>
        </div>
        <div class="col col-lg-12  col-xs-12" style="border-bottom: 1px solid rgba(200,200,200,0.3);margin-bottom: 20px;margin-top: 20px;"></div> </section>`
    this.__bindListeners()
    return this.__template
  }
}
