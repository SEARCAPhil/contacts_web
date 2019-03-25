/* eslint-disable new-cap */
import { URL as URI } from '../../config/api'

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    this.__emailType = 'email'
    this.__emails = ''
    this.__contactInfo = ''
    return this.render(opt)
  }

  __bindForm () {
    const form = import('../contact-communication-form/actions/create')
    // bind  form
    form.then(res => {
      return new res.default({
        root: this.__template,
        target: '.contact-commu-list-add-btn',
        id: this.__opt.contact_id
      })
    })
  }

  __bindListeners () {
    this.__bindForm()
    this.__parseCom()
  }

  __parseCom () {
    const commu = import('../contact-communication-list')
    let target = this.__template.querySelector('.communication-list-section')
    this.__opt.communications.forEach((el, index) => {
      commu.then(res => {
        return new res.default(el).then(html => {
          // exclude email address and place it somwhere else
          if (el.type === this.__emailType) this.__template.querySelector('.email-list-section').innerHTML += `<a href="mailto:${el.value}" style="color: #fff; cursor: pointer;">${el.value}</a>&emsp;`
          target.append(html)
        })
      })
    })
  }

  async render () {
    const photoSrc = `${URI.scheme}://${URI.host}/${URI.base}/uploads/${this.__opt.photo}`
    this.__template = document.createElement('div')
    this.__template.classList.add('col-md-3', 'user-profile-section')
    this.__template.innerHTML = `
          <!-- Profile Image -->
          <div class="box box-primary">
            <div class="box-body box-profile">

              <small><a href="#/contacts/form/${this.__opt.contact_id}/update" class=" pull-right"><i class="fa fa-pencil"></i> edit</a></small>

              ${this.__opt.photo !== null ? '<img class="profile-user-img img-responsive img-circle" src="' + photoSrc + '" alt="User profile picture" style="height: 100px;">' : '<img class="profile-user-img img-responsive img-circle" src="assets/img/boy.png" alt="User profile picture">'}

              <h3 class="profile-username text-center">${this.__opt.firstname || ''} ${this.__opt.middleinit || ''} ${this.__opt.lastname || ''} ${this.__opt.suffix || ''}</h3>
              ${(this.__opt.fullname && !this.__opt.lastname) ? `<p class="text-center">Imported as (${this.__opt.fullname})</p>` : ''}
              <p class="text-muted text-center">${this.__opt.affiliateCode || ''}</p><br/>
              

              <ul class="list-group list-group-unbordered">
                <li class="list-group-item">
                  <b>Contact Info</b> 
                  <span class="pull-right contact-commu-list-add-btn" data-target="#general-modal" data-popup-toggle="open">
                    <a href="#"><i class="fa fa-plus-circle"></i></a>
                  </span><br/>
                  <small class="communication-list-section"></small>
                    
                </li>
                <li class="list-group-item">
                  <b>Civil Status</b> <a class="pull-right">${this.__opt.civilStat || 'N/A'}</a>
                </li>
                <li style="overflow: auto;" class="list-group-item ${this.__opt.specialization ? '' : 'hidden'}">
                  <b>Specialization</b> <a class="pull-right">${this.__opt.specialization}</a>
                </li>
                <li class="list-group-item ${this.__opt.nationality ? '' : 'hidden'}">
                  <b>Nationality</b> <a class="pull-right">${this.__opt.nationality}</a>
                </li>
              </ul>

              <div class="btn btn-primary btn-block email-list-section" style="background: #009688;"><b></b></div>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->

          <!-- About Me Box -->
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">Information</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <strong>Gender : </strong>
              <span class="text-muted">
                ${this.__opt.gender}
              </span><hr>

              <section class="${this.__opt.birthdate ? '' : 'hidden'}">
                <strong>Birthdate : </strong>
                <span class="text-muted">
                  ${this.__opt.birthdate}
                </span><hr>
              </section>

              <section class="${this.__opt.children ? '' : 'hidden'}">
                <strong>Children :</strong>
                <span class="text-muted badge">
                  ${this.__opt.children}
                </span><hr>
              </section>

              <section class="${this.__opt.spouse ? '' : 'hidden'}">
                <strong>Spouse :</strong>
                <p class="text-muted">
                  ${this.__opt.spouse}
                </p><hr>
              </section>


              ${this.__opt.homeAddress ? `<strong><i class="fa fa-map-marker margin-r-5"></i> Permanent Address</strong>

              <p class="text-muted">${this.__opt.homeAddress},  ${this.__opt.homeZipCode},  ${this.__opt.homeCountry}</p>` : ''}

            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->`
    this.__bindListeners()
    return this.__template
  }
}
