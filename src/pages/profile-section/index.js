import style from './index.styl'

export default class {
  constructor(opt = {}) {
    this.__opt = opt
    this.__info = {}
    return this.render(opt) 
  }

  __bindListeners () {
    this.getProfileBoxComponent ()
    this.getProfileEmploymentListComponent ()
    this.getProfileEducListComponent ()
    this.getConferenceListComponent()
    this.getResearchListComponent()
    this.getTrainingListComponent()
  }

  getProfileBoxComponent () {
    const contact = import('../../components/contact-profile-box')
    return contact.then(res => {
      return new res.default (this.__info[0]).then(html => {
        document.querySelector('.user-profile-section').replaceWith(html)
      })
    })
  }

  getProfileEmploymentListComponent () {
    const contact = import('../../components/contact-employment-list')
    const targ = this.__template.querySelector('.contact-employment-list-section')
    return contact.then(res => {
      // get all employment records
      this.__info[0].employments.forEach((el, index) => {
        // DOM
        return new res.default(el).then(html => {
          targ.append(html)
        })
      })
    })
  }


  getProfileEducListComponent () {
    const contact = import('../../components/contact-educational-bg-list')
    const targ = this.__template.querySelector('.contact-educ-list-section')
    return contact.then(res => {
      // get all employment records
      this.__info[0].educational_backgrounds.forEach((el, index) => {
        // DOM
        return new res.default(el).then(html => {
          targ.append(html)
        })
      })
    })
  }


  getConferenceListComponent () {
    const contact = import('../../components/contact-conference-list')
    const targ = this.__template.querySelector('.contact-conference-list-section')
    return contact.then(res => {
      // get all employment records
      this.__info[0].conferences.forEach((el, index) => {
        // DOM
        return new res.default(el).then(html => {
          targ.append(html)
        })
      })
    })
  }

  getResearchListComponent () {
    const contact = import('../../components/contact-research-list')
    const targ = this.__template.querySelector('.contact-research-list-section')
    return contact.then(res => {
      // get all employment records
      this.__info[0].research.forEach((el, index) => {
        // DOM
        return new res.default(el).then(html => {
          targ.append(html)
        })
      })
    })
  }

  getTrainingListComponent () {
    const contact = import('../../components/contact-training-list')
    const targ = this.__template.querySelector('.contact-training-list-section')
    return contact.then(res => {
      // get all employment records
      this.__info[0].trainings.forEach((el, index) => {
        // DOM
        return new res.default(el).then(html => {
          targ.append(html)
        })
      })
    })
  }
  getInfo (params) {
    return new Promise((resolve, reject) => {
      import('../../components/contact-profile-box/actions/retrieve').then(res => {
        new res.default(params).get().then(html => {
          resolve(html)
        })
      })
    })
  }
  

  async render () {
    const __payload = {
      id: this.__opt.id,
    }
    this.__infoXHRResult = await this.getInfo (__payload)
    this.__info = this.__infoXHRResult.data

    this.__template = document.createElement('section')
    this.__template.classList.add('profile-section')
    this.__template.innerHTML = `
    <div style="min-height: 1170px;">
    <!-- Content Header (Page header) -->
    <style>${style.toString()}</style>
    <section class="content-header">
      <h1>
        User Profile
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">Contacts</a></li>
        <li class="active">User profile</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <main class="row">
        <div class="user-profile-section row"></div>
      

        <!-- /.col -->
        <div class="col-md-9">
          <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#activity" data-toggle="tab" aria-expanded="true">Info</a></li>
              <li class=""><a href="#timeline" data-toggle="tab" aria-expanded="false">Activity</a></li>
              <li class=""><a href="#settings" data-toggle="tab" aria-expanded="false">Settings</a></li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" id="activity" style="height: auto;overflow:auto;">
                <section>
                <h4 class="info-title"><i class="fa fa-briefcase margin-r-5"></i> Employment</h4>
                  <hr/>
                  <div class="contact-employment-list-section"></div>
                </section>


                <section>
                  <h4 class="info-title"><i class="fa fa-graduation-cap margin-r-5"></i> Education</h4>
                  <hr/>
                  <div class="contact-educ-list-section"></div>
                </section>


                <section>
                  <h4 class="info-title"><i class="fa fa-desktop margin-r-5"></i> Conference</h4>
                  <hr/>
                  <div class="contact-conference-list-section"></div>
                </section>


                <section>
                  <h4 class="info-title"><i class="fa fa-book margin-r-5"></i> Research</h4>
                  <hr/>
                  <div class="contact-research-list-section"></div>
                </section>


                <section>
                  <h4 class="info-title"><i class="fa fa-cubes margin-r-5"></i> Trainings</h4>
                  <hr/>
                  <div class="contact-training-list-section"></div>
                </section>
              </div>

              <div class="tab-pane" id="timeline"></div>
    
            </div>
            <!-- /.tab-content -->
          </div>
          <!-- /.nav-tabs-custom -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    <div>
    
    </section>
    <!-- /.content -->
    </main>
  </div>`
    this.__bindListeners()
    return this.__template;
  }
}