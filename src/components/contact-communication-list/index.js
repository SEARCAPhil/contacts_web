export default class {
  constructor(opt = {}) {
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
        selector: '.remove-commu-btn-modal',
        id: this.__opt.communication_id
      })
    })
  }

  __bindListeners () {
    this.bindRemove ()
  }
  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('col', 'row', `commu-section-${parseInt(this.__opt.communication_id)}`)
    this.__template.innerHTML = `
    <div style="float:left;" class="col col-lg-12"><b>${this.__opt.type}</b> : ${this.__opt.value} <a href="#" data-target="#general-modal" data-popup-toggle="open" data-resource="2" class=" text-muted remove-commu-btn-modal" style="opacity: 0.3;">
        <i class="fa fa-minus-circle"></i></a></div>`
    this.__bindListeners()
    return this.__template;
  }
}