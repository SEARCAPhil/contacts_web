/* eslint-disable new-cap */
export default class {
  constructor (opt = {}) {
    this.__opt = opt
    this.__emailType = 'email'
    this.__emails = ''
    this.__contactInfo = ''
    return this.render(opt)
  }

  bindRemove () {
    import('./actions/remove').then(loader => {
      return new loader.default({
        root: this.__template,
        selector: '.remove-btn-modal',
        id: this.__opt.research_id
      })
    })
  }

  bindUpdate () {
    import('../contact-research-form/actions/create').then(loader => {
      return new loader.default({
        root: this.__template,
        target: '.update-btn-modal',
        id: this.__opt.research_id,
        update: true
      })
    })
  }

  __bindListeners () {
    this.bindRemove()
    this.bindUpdate()
  }

  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('account-employment-list-item', 'col', 'col-lg-12', 'col-md-12', `research-section-${parseInt(this.__opt.research_id)}`)
    this.__template.innerHTML = `
    <span class="pull-right text-muted device-dropdown" data-device-dropdown="dropdown-research-${this.__opt.research_id}" data-resources="${this.__opt.research_id}"  style="margin-right: 10px; position: relative;">
      <i class="fa fa-angle-down"></i>
      <div class="dropdown-section float-right" id="dropdown-research-${this.__opt.research_id}">
        <ul class="list-group list-group-flush">
        <li class="list-group-item"><a href="#" data-target="#general-modal" data-popup-toggle="open" data-resource="2" class="update-btn-modal"><i class="fa fa-edit"></i> Update</a></li>
        <li class="list-group-item">
          <a href="#" data-target="#general-modal" data-popup-toggle="open" data-resource="2" class="text-danger remove-btn-modal"><i class="fa fa-remove"></i> Remove</a>
        </li>
        <ul>
      </ul></ul></div>
    </span>
    <b></i> ${this.__opt.title} </b><br/>
      <small class="text-muted">
      ${this.__opt.dateStarted} ${this.__opt.dateEnded ? '- ' + this.__opt.dateEnded : ''}<br/>
      ${this.__opt.fieldStudy ? this.__opt.fieldStudy : ''}
      ${(parseInt(this.__opt.isSearcaTraining) === 1) ? '<i class="fa fa-check-circle text-success" style="font-size: 16px;"></i>  <p class="alert alert-info" style="background-color: #607d8b !important; border:none !important;margin-top: 20px;">This research was completed in SEARCA </p>' : ''}
        <details>
          <summary>read more</summary><br/>
          <div class="col col-lg-12">
            <strong><i class="fa fa-info-circle"></i> More Details</strong><br/>
            Host University : ${this.__opt.hostUniversity}<br/>
            Type : ${this.__opt.saafclass}<br/><br/>
            <strong><i class="fa fa-file-text-o"></i> Remarks</strong><br/>
            ${this.__opt.remarks ? this.__opt.remarks : ''}<br/><br/>
          </div>
        </details>
      </small>  
      <hr/>`
    this.__bindListeners()
    return this.__template
  }
}
