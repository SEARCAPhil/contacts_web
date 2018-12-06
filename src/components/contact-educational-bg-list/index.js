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
    <b>${this.__opt.institution}</b><br/>
      <small class="text-muted">
        ${this.__opt.grad} <br/>
        <b> ${this.__opt.field}</b><br/><br/>
        <em>Other details :<br/>
        Country : ${this.__opt.country}<br/>
        Scholarship : ${this.__opt.scholarship}
      </small>  
      <hr/>`
    this.__bindListeners()
    return this.__template;
  }
}