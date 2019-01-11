const URL = import('../../utils/xhr')

export default class {
  constructor(opt = {}) {
    this.__opt = opt
    this.__contactComponent = {}
    this.__listSecTemplate = {}
    return this.render(opt) 
  }


  getEngagementListComponent () {
    const contact = import('../../components/contact-engagement-list')
    const targ = this.__template.querySelector('.contact-engagement-list-section')
    let form = import('../../components/contact-engagement-form/actions/create')
    contact.then(res => {
      this.__opt.engagements.forEach((el, index) => {
        new res.default(el).then(html => {
          targ.append(html)
        })
      })
    })

     // bind  form
    return form.then(res => { 
      new res.default({
        root: this.__template,
        target: '.contact-engagement-list-add-btn',
        id: this.__opt.contact_id,
        research: this.__opt.research
      })
    })
  }

  async search (opt) {
    this.xhr  = new (await URL).default()
    return this.xhr.__getData(`contact/search/${opt.param}?page=${opt.page ? opt.page : 1}`)
  }

  __bindListeners (opt = {}) {
    this.getEngagementListComponent ()
  }

  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('contacts-engagement-section')
    this.__template.innerHTML = `<div style="min-height: 1170px;">
    <article>
        <p class="alert alert-info" style="background-color: #607d8b !important; border:none !important;">This Section contains data for SEARCA engagement, trainings, and fellows </p>
        <section>
        <h4 class="info-title">
          Enagement 
          <span class="pull-right contact-engagement-list-add-btn" data-target="#general-modal" data-popup-toggle="open">
            <i class="fa fa-plus-circle" style="margin-right: 20px;"></i>
          </span>
        </h4>
        <hr/>
        </section>

        <section class="contact-engagement-list-section"></section>

        <section>
          <h4 class="info-title">
            Training<br/>          <span class="pull-right contact-employment-list-add-btn" data-target="#general-modal" data-popup-toggle="open">
              <i class="fa fa-plus-circle" style="margin-right: 20px;"></i>
            </span>
            <p class="text-muted">
              <small>SEARCA's short-term training courses and similar learning events (e.g., executive forums and study tours)
              / successfully completed Center's Academic Bridging Program</small>
            </p> 
          </h4>
          <hr/>
        </section>


        <section>
          <h4 class="info-title">
            Associate<br/>          <span class="pull-right contact-employment-list-add-btn" data-target="#general-modal" data-popup-toggle="open">
              <i class="fa fa-plus-circle" style="margin-right: 20px;"></i>
            </span>
            <p class="text-muted">
              <small>Grants' requirements (e.g., Seed Fund for Research and Training,
                Travel Grants, and Professional Chairs) and research interns completed at SEARCA</small>
            </p> 
          </h4>
          <hr/>
        </section>

        <section>
          <h4 class="info-title">
            Fellowship<br/>          <span class="pull-right contact-employment-list-add-btn" data-target="#general-modal" data-popup-toggle="open">
              <i class="fa fa-plus-circle" style="margin-right: 20px;"></i>
            </span>
            <p class="text-muted">
              <small>Appointment for Senior Fellows, Visiting Research Fellows, or Adjunct Fellows of the Center</small>
            </p> 
          </h4>
          <hr/>
      </section>


      </article>
    <!-- /.content -->
    </div>`
    this.__bindListeners()
    return this.__template;
  }
}