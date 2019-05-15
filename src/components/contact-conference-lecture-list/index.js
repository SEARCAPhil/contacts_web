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

  bindUpdate () {
    import('../contact-conference-lecture-form/actions/create').then(loader => {
      return new loader.default({
        root: this.__template,
        target: '.update-btn-modal',
        id: this.__opt.id,
        update: true
      })
    })
  }

  bindRemove () {
    import('./actions/remove').then(loader => {
      return new loader.default({
        root: this.__template,
        selector: '.remove-btn-modal',
        id: this.__opt.id
      })
    })
  }

  __bindListeners () {
    this.bindRemove()
    this.bindUpdate()
    setTimeout(() => {
      this.loadPopup()
      this.loadDropdown()
    }, 1000)
  }

  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('account-employment-list-item', 'col', 'col-lg-12', 'col-md-12', `conf-lect-section-${parseInt(this.__opt.id)}`)
    this.__template.innerHTML = `
    <span class="pull-right text-muted device-dropdown" data-device-dropdown="dropdown-conf-lect-${this.__opt.id}" data-resources="${this.__opt.id}"  style="margin-right: 10px; position: relative;">
      <i class="fa fa-angle-down"></i>
      <div class="dropdown-section float-right" id="dropdown-conf-lect-${this.__opt.id}">
        <ul class="list-group list-group-flush">
        <li class="list-group-item"><a href="#" data-target="#general-modal" data-popup-toggle="open" data-resource="2" class="update-btn-modal"><i class="fa fa-edit"></i> Update</a></li>
        <li class="list-group-item">
          <a href="#" data-target="#general-modal" data-popup-toggle="open" data-resource="2" class="text-danger remove-btn-modal"><i class="fa fa-remove"></i> Remove</a>
        </li>
        <ul>
      </ul></ul></div>
    </span>
      <b>${this.__opt.lectureTitle}</b> <br/>
      <small class="text-muted">
        ${this.__opt.lectureVenue}<br/>
        ${this.__opt.dateStarted} ${this.__opt.dateEnded ? '-' : ''} ${this.__opt.dateEnded || ''}<br/>
        <b><i class="fa fa-file"></i> ${this.__opt.paperTitle || 'N/A'}</b>
      </small>  
      <hr/>`
    this.__bindListeners()
    return this.__template
  }
}
