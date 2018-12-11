export default class {
  constructor(opt = {}) {
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
        if(!document.querySelector('#popup-es-style')) document.head.append(style)
        
      })
  
      popupes.then(loader => new loader.default())
  
  }

  loadDropdown () {
    const DropdownLoader = import('../dropdown-loader')
    DropdownLoader.then(loader =>  loader.default('device-dropdown'))
  }

  __bindListeners () {
    this.loadPopup ()
    this.loadDropdown ()
  }

  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('account-employment-list-item', 'col', 'col-lg-12', 'col-md-12')
    this.__template.innerHTML = `
      <span class="pull-right text-muted device-dropdown" data-device-dropdown="dropdown-115" data-resources="115"  style="margin-right: 10px; position: relative;">
        <i class="fa fa-angle-down"></i>
        <div class="dropdown-section float-right" id="dropdown-115">
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><a href="#" data-target="#general-modal" data-popup-toggle="open" data-resource="2"><i class="fa fa-edit"></i> Update</a></li>
          <ul>
        </ul></ul></div>
      </span>
      ${this.__opt.companyName} <br/>
      <small class="text-muted">
        ${this.__opt.employedFrom} - ${(this.__opt.employedTo != '0000' || this.__opt.employedTo != this.__opt.employedFrom) ? this.__opt.employedTo : 'Current'}<br/>
        <b>${this.__opt.position}</b>
      </small>  
      <hr/>`
    this.__bindListeners()
    return this.__template;
  }
}