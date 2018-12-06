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
    <b></i> ${this.__opt.title} </b><br/>
      <small class="text-muted">
      ${this.__opt.dateStarted} ${this.__opt.dateEnded ?  '- ' + this.__opt.dateEnded : ''}<br/>
      ${this.__opt.fieldStudy ? this.__opt.fieldStudy : '' }
        <details>
          <summary>read more</summary><br/>
          <div class="col col-lg-12">
            <strong><i class="fa fa-info-circle"></i> More Details</strong><br/>
            Host University : ${this.__opt.hostUniversity}<br/>
            Type : <br/><br/>
            <strong><i class="fa fa-file-text-o"></i> Remarks</strong><br/>
            ${this.__opt.remarks ? this.__opt.remarks : ''}<br/><br/>
          </div>
        </details>
      </small>  
      <hr/>`
    this.__bindListeners()
    return this.__template;
  }
}