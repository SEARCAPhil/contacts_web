/* eslint-disable new-cap */
const URL = import('../../utils/xhr')

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    this.__contactComponent = {}
    this.__listSecTemplate = {}
    return this.render(opt)
  }

  loadPopup () {
    const popupes = import('../../components/popup-es')
    const popupesStyle = import('../../components/popup-es/index.styl')

    // enable popup
    popupesStyle.then(css => {
      const style = document.createElement('style')
      style.id = 'popup-es-style'
      style.innerHTML = css.default.toString()
      if (!document.querySelector('#popup-es-style')) document.head.append(style)
    })

    popupes.then(loader => new loader.default())
  }

  clearSection () {
    document.querySelector('#tab-engagement').innerHTML = ''
  }


  getFellowshipListComponent () {
    const contact = import('../../components/contact-fellowship-list')
    const targ = this.__template.querySelector('.contact-fellowship-list-section')
    let form = import('../../components/contact-fellowship-form/actions/create')
    contact.then(res => {
      this.__opt.fellowships.forEach((el, index) => {
        new res.default(el).then(html => {
          targ.append(html)
        })
      })
    })

    // bind  form
    return form.then(res => {
      return new res.default({
        root: this.__template,
        target: '.contact-fellowship-list-add-btn',
        id: this.__opt.contact_id,
        research: this.__opt.research
      })
    })
  }

  async search (opt) {
    this.xhr = new (await URL).default()
    return this.xhr.__getData(`contact/search/${opt.param}?page=${opt.page ? opt.page : 1}`)
  }

  __bindListeners (opt = {}) {
    this.clearSection()
    this.getFellowshipListComponent()
    this.loadPopup ()
  }

  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('contacts-engagement-section')
    this.__template.innerHTML = `<div style="min-height: 1170px;">
    <article>
        <section>
          <h4 class="info-title">Fellowship<br/>          
            <span class="pull-right contact-fellowship-list-add-btn" data-target="#general-modal" data-popup-toggle="open">
              <i class="fa fa-plus-circle" style="margin-right: 20px;"></i>
            </span>
            <p class="text-muted">
              <small>Appointment for Senior Fellows, Visiting Research Fellows, or Adjunct Fellows of the Center</small>
            </p> 
          </h4>
          <hr/>
      </section>

      <section class="contact-fellowship-list-section"></section>


      </article>
    <!-- /.content -->
    </div>`
    this.__bindListeners()
    return this.__template
  }
}
