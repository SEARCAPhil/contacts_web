export default class {
  constructor(opt = {}) {
    this.__opt = opt
    return this.render(opt) 
  }

  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('profile-section')
    this.__template.innerHTML = `
    <div style="min-height: 1170px;">
    <!-- Content Header (Page header) -->
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

      <div class="row">
        <div class="col-md-3">

          <!-- Profile Image -->
          <div class="box box-primary">
            <div class="box-body box-profile">
              <img class="profile-user-img img-responsive img-circle" src="https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg" alt="User profile picture">

              <h3 class="profile-username text-center">Nina Mcintire</h3>

              <p class="text-muted text-center">Software Engineer</p>

              <ul class="list-group list-group-unbordered">
                <li class="list-group-item">
                  <b>Civil Status</b> <a class="pull-right">Single</a>
                </li>
                <li class="list-group-item">
                  <b>Specialization</b> <a class="pull-right">Web Development</a>
                </li>
                <li class="list-group-item">
                  <b>Nationality</b> <a class="pull-right">Indonesian</a>
                </li>
              </ul>

              <a href="#" class="btn btn-primary btn-block" style="background: #009688;"><b>Follow</b></a>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->

          <!-- About Me Box -->
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">About Me</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <strong><i class="fa fa-book margin-r-5"></i> Education</strong>

              <p class="text-muted">
                B.S. in Computer Science from the University of Tennessee at Knoxville
              </p>

              <hr>

              <strong><i class="fa fa-map-marker margin-r-5"></i> Permanent Address</strong>

              <p class="text-muted">Malibu, California</p>

            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
        <!-- /.col -->
        <div class="col-md-9">
          <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#activity" data-toggle="tab" aria-expanded="true">Info</a></li>
              <li class=""><a href="#timeline" data-toggle="tab" aria-expanded="false">Activity</a></li>
              <li class=""><a href="#settings" data-toggle="tab" aria-expanded="false">Settings</a></li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" id="activity">
              <section>
               <h4><i class="fa fa-briefcase margin-r-5"></i> Employment</h4>
                <hr/>
              </section>

              <section>
                Quantum Computer Services <br/>
                <small class="text-muted">
                  2013 - 2014<br/>
                  <b>Senior Computer Network engineer</b>
                </small>  
                <hr/>
              </section>

              <section>
              Quantum Computer Services <br/>
              <small class="text-muted">
                2013 - 2014<br/>
                <b>Senior Computer Network engineer</b>
              </small>  
              <hr/>
            </section>
                

                <section>
                  <h4><i class="fa fa-graduation-cap margin-r-5"></i> Education</h4>
                  <hr/>
                </section>


                <section>
                  <h4><i class="fa fa-desktop margin-r-5"></i> Conference</h4>
                  <hr/>
                </section>


                <section>
                  <h4><i class="fa fa-book margin-r-5"></i> Research</h4>
                  <hr/>
                </section>


                <section>
                  <h4><i class="fa fa-cubes margin-r-5"></i> Trainings</h4>
                  <hr/>
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
  </div>`
    
    return this.__template;
  }
}