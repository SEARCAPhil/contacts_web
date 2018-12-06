export default class {
  constructor(opt = {}) {
    this.__opt = opt
    this.__emailType = 'email'
    this.__emails = ''
    this.__contactInfo = ''
    return this.render(opt) 
  }

  __bindListeners () {
    
  }

  __parseCom () {
    this.__opt.communications.forEach((el, index) => {
      if(el.type === this.__emailType)  {
        this.__emails += `${el.value} `
      } else {
        this.__contactInfo += `<b>${el.type}</b> : ${el.value} <br/>`
      }
    })
  }

  async render () {console.log(this.__opt)
    this.__parseCom ()
    this.__template = document.createElement('div')
    this.__template.classList.add('col-md-3', 'user-profile-section')
    this.__template.innerHTML = `
          <!-- Profile Image -->
          <div class="box box-primary">
            <div class="box-body box-profile">
              <img class="profile-user-img img-responsive img-circle" src="https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg" alt="User profile picture">

              <h3 class="profile-username text-center">${this.__opt.firstname} ${this.__opt.middleinit} ${this.__opt.lastname} ${this.__opt.suffix}</h3>

              <p class="text-muted text-center">${this.__opt.affiliateCode}</p><br/>
              

              <ul class="list-group list-group-unbordered">
                <li class="list-group-item">
                  <span>${this.__contactInfo}</span>
                    
                </li>
                <li class="list-group-item">
                  <b>Civil Status</b> <a class="pull-right">${this.__opt.civilStat}</a>
                </li>
                <li class="list-group-item" style="overflow: auto;">
                  <b>Specialization</b> <a class="pull-right">${this.__opt.specialization}</a>
                </li>
                <li class="list-group-item">
                  <b>Nationality</b> <a class="pull-right">${this.__opt.nationality}</a>
                </li>
              </ul>

              <a href="#" class="btn btn-primary btn-block" style="background: #009688;"><b>${this.__emails}</b></a>
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
              <strong><i class="fa fa-book margin-r-5"></i> Gender : </strong>
              <span class="text-muted">
                ${this.__opt.gender}
              </span><hr>

              <strong><i class="fa fa-book margin-r-5"></i> Birthdate : </strong>
              <span class="text-muted">
                ${this.__opt.birthdate}
              </span><hr>

              <strong><i class="fa fa-book margin-r-5"></i> Children :</strong>
              <span class="text-muted badge">
                ${this.__opt.children}
              </span><hr>

              <strong><i class="fa fa-book margin-r-5"></i> Spouse :</strong>
              <p class="text-muted">
                ${this.__opt.spouse}
              </p><hr>


              <strong><i class="fa fa-map-marker margin-r-5"></i> Permanent Address</strong>

              <p class="text-muted">${this.__opt.homeAddress},  ${this.__opt.homeZipCode},  ${this.__opt.homeCountry}</p>

            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->`
      this.__bindListeners()
      return this.__template;
  }
}