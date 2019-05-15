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
        id: this.__opt.educ_id
      })
    })
  }

  bindUpdate () {
    import('../contact-educational-bg-form/actions/create').then(loader => {
      return new loader.default({
        root: this.__template,
        target: '.update-btn-modal',
        id: this.__opt.educ_id,
        update: true
      })
    })
  }

  __bindListeners () {
    this.bindRemove()
    this.bindUpdate()
    this.loadDropdown()
    this.loadPopup()
  }

  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('account-employment-list-item', 'col', 'col-lg-12', 'col-md-12', `educ-section-${parseInt(this.__opt.educ_id)}`)
    this.__template.innerHTML = `
    <span class="pull-right text-muted device-dropdown" data-device-dropdown="dropdown-educ-${this.__opt.educ_id}" data-resources="${this.__opt.educ_id}"  style="margin-right: 10px; position: relative;">
      <i class="fa fa-angle-down"></i>
      <div class="dropdown-section float-right" id="dropdown-educ-${this.__opt.educ_id}">
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
            <i class="fa fa-graduation-cap"></i>
          </div>
        </div>
        <div class="media-body" style="padding-left: 20px;">
          <h4 class="media-heading">${this.__opt.institution} </h4>
          <small class="text-muted">
            ${this.__opt.grad} <br/>
            <b> ${this.__opt.field}</b><br/>
            <span class="badge badge-success">${this.__opt.type || 'BS'}</span>
            <br/><br/>
            <em>Other details :<br/>
            Country : ${this.__opt.country}<br/>
            Scholarship : ${this.__opt.scholarship}
          </small>
        </div>
      </div><hr/>`

    this.__bindListeners()
    return this.__template
  }
}
