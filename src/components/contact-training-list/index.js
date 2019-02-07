/* eslint-disable new-cap */
export default class {
  constructor (opt = {}) {
    this.__opt = opt
    this.__emailType = 'email'
    this.__emails = ''
    this.__contactInfo = ''
    return this.render(opt)
  }

  loadPopup () {
    const popupes = import('../popup-es')
    const popupesStyle = import('../popup-es/index.styl')

    // enable popup
    popupesStyle.then(css => {
      const style = document.createElement('style')
      style.id = 'popup-es-style'
      style.innerHTML = css.default.toString()
      if (!document.querySelector('#popup-es-style')) document.head.append(style)
    })
    popupes.then(loader => new loader.default())
  }

  bindRemove () {
    import('./actions/remove').then(loader => {
      return new loader.default({
        root: this.__template,
        selector: '.remove-btn-modal',
        id: this.__opt.training_id
      })
    })
  }

  bindUpdate () {
    import('../contact-training-form/actions/create').then(loader => {
      return new loader.default({
        root: this.__template,
        target: '.update-btn-modal',
        id: this.__opt.training_id,
        update: true
      })
    })
  }

  loadDropdown () {
    const DropdownLoader = import('../dropdown-loader')
    DropdownLoader.then(loader => loader.default('device-dropdown'))
  }

  __bindListeners () {
    this.bindRemove()
    this.bindUpdate()
    this.loadDropdown()
    setTimeout(() => this.loadPopup(), 1000)
  }

  async render () {
    console.log(this.__opt)
    this.__template = document.createElement('section')
    this.__template.classList.add('account-employment-list-item', 'col', 'col-lg-12', 'col-md-12', `training-section-${parseInt(this.__opt.training_id)}`)
    this.__template.innerHTML = `
    <span class="pull-right text-muted device-dropdown" data-device-dropdown="dropdown-training-${this.__opt.training_id}" data-resources="${this.__opt.training_id}"  style="margin-right: 10px; position: relative;">
      <i class="fa fa-angle-down"></i>
      <div class="dropdown-section float-right" id="dropdown-training-${this.__opt.training_id}">
        <ul class="list-group list-group-flush">
        <li class="list-group-item"><a href="#" data-target="#general-modal" data-popup-toggle="open" data-resource="2" class="update-btn-modal"><i class="fa fa-edit"></i> Update</a></li>
        <li class="list-group-item">
          <a href="#" data-target="#general-modal" data-popup-toggle="open" data-resource="2" class="text-danger remove-btn-modal"><i class="fa fa-remove"></i> Remove</a>
        </li>
        <ul>
      </ul></ul></div>
    </span>

    <b>${this.__opt.title} </b><br/>
      <small class="text-muted">
      ${this.__opt.dateStarted} ${this.__opt.dateEnded ? '- ' + this.__opt.dateEnded : ''}<br/>
      <b>${this.__opt.venue}</b><br/>
      <span class="badge badge-success">${this.__opt.trainingType ? this.__opt.trainingType : 'N/A'}</span>
      ${(parseInt(this.__opt.isSearcaTraining) === 1) ? '<i class="fa fa-check-circle text-success" style="font-size: 16px;"></i>  <span class="text-muted">This is a SEARCA\'s short-term training course or similar learning event</span>' : ''}
      <br/>
      <details>
        <summary>read more</summary>

        <div class="col col-lg-12"><br/>
          <strong><i class="fa fa-info-circle"></i> Event Details</strong><br/>
          Host University : ${this.__opt.hostUniversity || 'N/A'}<br/>
          Organizing Agency : ${this.__opt.organizingAgency || 'N/A'} <br/>
          Sponsors : ${this.__opt.sponsor || 'N/A'}<br/><br/>

          <strong><i class="fa fa-info-circle"></i> More Details</strong><br/>
          Scholarship: ${this.__opt.scholarship || 'N/A'}<br/>
          SAAF Type (Optional) : <br/>
          Supervisor : ${this.__opt.supervisor || 'N/A'}<br/>
          Supervisor Designation : ${this.__opt.supervisorDesignation || 'N/A'}<br/><br/>

          <strong><i class="fa fa-file-text-o"></i> Notes</strong><br/>
          ${this.__opt.notes || 'N/A'}
          <br/><br/>
        </div>
      </details>
      </small>  
      <hr/>`
    this.__bindListeners()
    return this.__template
  }
}
