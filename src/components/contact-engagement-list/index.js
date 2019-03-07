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
        id: this.__opt.engage_id
      })
    })
  }

  bindUpdate () {
    import('../contact-engagement-form/actions/create').then(loader => {
      return new loader.default({
        root: this.__template,
        target: '.update-btn-modal',
        id: this.__opt.engage_id,
        update: true
      })
    })
  }

  loadDropdown () {
    const DropdownLoader = import('../dropdown-loader')
    DropdownLoader.then(loader => loader.default('device-dropdown'))
  }

  __bindListeners () {
    this.loadPopup()
    this.loadDropdown()
    this.bindRemove()
    this.bindUpdate()
  }

  async render () {
    console.log(this.__opt)
    this.__template = document.createElement('section')
    this.__template.classList.add('account-engagement-list-item', 'col', 'col-lg-12', 'col-md-12', `engagement-section-${parseInt(this.__opt.engage_id)}`)
    this.__template.innerHTML = `
      <span class="pull-right text-muted device-dropdown" data-device-dropdown="dropdown-engagement-${this.__opt.engage_id}" data-resources="${this.__opt.engage_id}"  style="margin-right: 10px; position: relative;">
        <i class="fa fa-angle-down"></i>
        <div class="dropdown-section float-right" id="dropdown-engagement-${this.__opt.engage_id}">
          <ul class="list-group list-group-flush">
          <li class="list-group-item"><a href="#" data-target="#general-modal" data-popup-toggle="open" data-resource="2" class="update-btn-modal"><i class="fa fa-edit"></i> Update</a></li>
          <li class="list-group-item">
            <a href="#" data-target="#general-modal" data-popup-toggle="open" data-resource="2" class="text-danger remove-btn-modal"><i class="fa fa-remove"></i> Remove</a>
          </li>
          <ul>
        </ul></ul></div>
      </span>
      
      <div class="media">
        <div class="media-left text-center text-muted margin-r-5" style="
          background: #f7f7f7;
          width: 70px;
          height: 70;
          padding: 20px;
          font-size: 30px;
      ">
          <i class="fa fa-slideshare"></i>
        </div>
        <div class="media-body" style="padding-left: 20px;">
          <h4 class="media-heading">${this.__opt.title || 'No Research'} </h4>
          <b>Engage From: ${this.__opt.engageFrom}</b> <br/>
          <b>Engage To: ${(this.__opt.engageTo === '0000') || (this.__opt.engageFrom === this.__opt.engageTo) || (this.__opt.engageTo === null) ? 'Current' : this.__opt.engageTo}</b><br/>
          <br/>
          <small>
            <b>Type: ${this.__opt.afftypeName || 'N/A'}</b><br/>
            <span class="text-muted">Nature : <span class="badge badge-default">${this.__opt.engagement || 'N/A'}</span></span>
          </small>
        </div>
      </div>
      <hr/>`
    this.__bindListeners()
    return this.__template
  }
}
