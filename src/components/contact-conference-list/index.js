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

  loadDropdown () {
    const DropdownLoader = import('../dropdown-loader')
    DropdownLoader.then(loader => loader.default('device-dropdown'))
  }

  __bindListeners () {
    this.getLectureListComponent()
    this.bindRemove()
    this.bindUpdate()
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
    <b>${this.__opt.title} </b><br/>
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
      <hr/>`
    this.__bindListeners()
    return this.__template
  }
}
