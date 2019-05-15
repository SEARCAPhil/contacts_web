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
        id: this.__opt.id
      })
    })
  }

  bindUpdate () {
    import('../contact-conference-form/actions/create').then(loader => {
      return new loader.default({
        root: this.__template,
        target: '.update-btn-modal',
        id: this.__opt.id,
        update: true
      })
    })
  }

  __bindListeners () {
    this.getLectureListComponent()
    this.bindRemove()
    this.bindUpdate()
    this.loadPopup()
    this.loadDropdown()
  }

  getLectureListComponent () {
    const contact = import('../../components/contact-conference-lecture-list')
    const targ = this.__template.querySelector('.contact-conference-lectures-list-section')
    const lectForm = import('../../components/contact-conference-lecture-form/actions/create')

    contact.then(res => {
      // get all employment records
      this.__opt.lectures.forEach((el, index) => {
        // DOM
        return new res.default(el).then(html => {
          targ.append(html)
        }) | this.loadDropdown()
      })
    })

    // bind  form
    lectForm.then(res => {
      return new res.default({
        root: this.__template,
        target: '.contact-conf-lect-list-add-btn',
        id: this.__opt.id
      })
    })
  }
  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('account-employment-list-item', 'col', 'col-lg-12', 'col-md-12', `conf-section-${parseInt(this.__opt.id)}`)
    this.__template.innerHTML = `
    <span class="pull-right text-muted device-dropdown" data-device-dropdown="dropdown-conf-${this.__opt.id}" data-resources="${this.__opt.id}"  style="margin-right: 10px; position: relative;">
      <i class="fa fa-angle-down"></i>
      <div class="dropdown-section float-right" id="dropdown-conf-${this.__opt.id}">
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
          <i class="fa fa-desktop"></i>
        </div>
      </div>
      <div class="media-body" style="padding-left: 20px;">
        <h4 class="media-heading">${this.__opt.title} </h4>
        <small class="text-muted">
        ${this.__opt.dateStarted} ${this.__opt.dateEnded ? '- ' + this.__opt.dateEnded : ''}<br/>
          <details>
            <summary><b>${this.__opt.venue}  </b><br/></summary><br/>
            <div class="col col-lg-12">
              <p>
                <strong>
                  <i class="fa fa-list"></i>Lectures
                </strong>
                <span class="pull-right contact-conf-lect-list-add-btn" data-target="#general-modal" data-popup-toggle="open">
                  <button class="btn btn-default btn-xs">Add New <i class="fa fa-plus-circle" style="margin-right: 20px;"></i></button> 
                </span>
              </p>
              <div class="contact-conference-lectures-list-section"></div>
            </div>
          </details>
        </small>  
      </div>
    </div><hr/>`
    this.__bindListeners()
    return this.__template
  }
}
