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
    <b>${this.__opt.title} </b><br/>
      <small class="text-muted">
      ${this.__opt.dateStarted} ${this.__opt.dateEnded ?  '- ' + this.__opt.dateEnded : ''}<br/>
      <b>${this.__opt.venue}</b><br/>
      <span class="badge badge-success">${this.__opt.trainingType}</span><br/>
      <details>
        <summary>read more</summary>

        <div class="col col-lg-12"><br/>
          <strong><i class="fa fa-info-circle"></i> Event Details</strong><br/>
          Host University : ${this.__opt.hostUniversity}<br/>
          Organizing Agency : ${this.__opt.organizingAgency} <br/>
          Sponsors : ${this.__opt.sponsor}<br/><br/>

          <strong><i class="fa fa-info-circle"></i> More Details</strong><br/>
          Scholarship: ${this.__opt.scholarship}<br/>
          SAAF Type (Optional) : <br/>
          Supervisor : ${this.__opt.supervisor}<br/>
          Supervisor Designation : ${this.__opt.supervisorDesignation}<br/><br/>

          <strong><i class="fa fa-file-text-o"></i> Notes</strong><br/>
          ${this.__opt.notes}
          <br/><br/>
        </div>
      </details>
      </small>  
      <hr/>`
    this.__bindListeners()
    return this.__template;
  }
}