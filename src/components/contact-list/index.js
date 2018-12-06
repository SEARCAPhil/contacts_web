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
    this.__template.classList.add('row')
    this.__template.innerHTML = `
    <div class="col col-lg-1">
      <img src="https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg" class="user-image img-circle margin-l-5" alt="User Image" width="40px" style="margin-left: 20px;">
    </div>
    <div class="col col-lg-2"><b>${this.__opt.firstname} ${this.__opt.middleinit} ${this.__opt.lastname}</b></div>
    <div class="col col-lg-2"><a href="#">${this.__emails}</a></div>
    <div class="col col-lg-2">${this.__opt.nationality}</div>
    <div class="col col-lg-2">
      <span class="text-muted">${this.__contactInfo}</span><br>
    </div>
    <div class="col col-lg-1">${this.__opt.affiliateCode}</div>
    <div class="col col-lg-2">
      <a href="#" class="text-danger"><i class="fa fa-remove"></i>Remove</a>&emsp;
      <a href="#">Update</a>
    </div><div class="col col-lg-12"><hr/></div>`
    this.__bindListeners()
      return this.__template;
  }
}