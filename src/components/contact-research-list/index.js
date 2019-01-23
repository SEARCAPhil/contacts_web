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

  loadDropdown () {
    const DropdownLoader = import('../dropdown-loader')
    DropdownLoader.then(loader => loader.default('device-dropdown'))
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
    this.loadPopup()
    this.loadDropdown()
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
    
      <div class="media">
        <div class="media-left text-center text-muted margin-r-5">
          <div style="background: #f7f7f7;width: 70px;height: 70;padding: 20px;font-size: 30px;">
            <i class="fa fa-flask"></i>
          </div>
        </div>
        <div class="media-body" style="padding-left: 20px;">
          <h4 class="media-heading">${this.__opt.title}</h4>
          <small class="text-muted">
            ${this.__opt.dateStarted} ${this.__opt.dateEnded ? '- ' + this.__opt.dateEnded : ''}<br/>
            ${this.__opt.fieldStudy ? this.__opt.fieldStudy : ''}
            ${(parseInt(this.__opt.isSearcaTraining) === 1) ? '<i class="fa fa-check-circle text-success" style="font-size: 16px;"></i> This research was completed at SEARCA' : ''}
              <details>
                <summary>read more</summary><br/>
                <div class="col col-lg-12">
                  <strong><i class="fa fa-info-circle"></i> More Details</strong><br/>
                  Host University : ${this.__opt.hostUniversity || 'N/A'}<br/>
                  Type : ${this.__opt.saafclass || 'N/A'}<br/><br/>
                  <strong><i class="fa fa-file-text-o"></i> Remarks</strong><br/>
                  ${this.__opt.remarks ? this.__opt.remarks : ''}<br/><br/>
                </div>
              </details>
            </small> 
        </div>
    </div><hr/>`
    this.__bindListeners()
    return this.__template
  }
}
