export default class {
  constructor(opt = {}) {
    this.__opt = opt
    this.__emailType = 'email'
    this.__emails = ''
    this.__contactInfo = ''
    return this.render(opt) 
  }

  __bindListeners () {
    
  }

  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('account-employment-list-item', 'col', 'col-lg-12', 'col-md-12')
    this.__template.innerHTML = `
      ${this.__opt.companyName} <br/>
      <small class="text-muted">
        ${this.__opt.employedFrom} - ${(this.__opt.employedTo != '0000' || this.__opt.employedTo != this.__opt.employedFrom) ? this.__opt.employedTo : 'Current'}<br/>
        <b>${this.__opt.position}</b>
      </small>  
      <hr/>`
    this.__bindListeners()
    return this.__template;
  }
}