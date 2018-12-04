export default class {
  constructor(opt = {}) {
    this.__opt = opt
    this.__contactComponent = {}
    return this.render(opt) 
  }

  getContactListComponent () {
    const contact = import('../../components/contact-list')
    return contact.then(res => {
      this.__contactComponent = res.default
    })
  }

  createContactListSection () {
    
  }

  async render () {
    this.__contactComponent = (await import('../../components/contact-list')).default
    new this.__contactComponent().then(res => {
      console.log(res)
    })
    this.__template = document.createElement('section')
    this.__template.classList.add('contacts-section')
    this.__template.innerHTML = `<div " style="min-height: 1170px;">
     <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        <small>Contact List</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">Contact List</li>
      </ol>
      <div class="row col-12">
        <form action="#" method="get" class="sidebar-form">
          <div class="input-group">
            <input type="text" name="q" class="form-control" placeholder="Search..." autocomplete="off">
            <span class="input-group-btn">
                  <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                  </button>
                </span>
          </div>
        </form>
      </div>
      
      <p>Total : <span class="badge">5</span></p>
    </section>

    <!-- Main content -->
    <section class="content">

      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">A</h3>
        </div>
        <div class="box-body">
          <br>
          <div class="row" onclick="window.location.href='#/account/1/profile'">
            <div class="col col-lg-1">
              <img src="https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg" class="user-image img-circle margin-l-5" alt="User Image" width="40px">
            </div>
            <div class="col col-lg-2"><b>John Hae Doe</b></div>
            <div class="col col-lg-2"><a href="#">JohnHaeDoe@gmail.com</a></div>
            <div class="col col-lg-2">Filipino</div>
            <div class="col col-lg-2">
              <span class="text-muted">09429487865</span><br/>
              <span class="text-muted">09429487865</span><br/>
            </div>
            <div class="col col-lg-1">ABCDE123</div>
            <div class="col col-lg-2">
            <a href="#" class="text-danger">Remove</a>&emsp;
            <a href="#">Update</a>
            </div>
          </div>

          <div class="row"><hr/>
            <div class="col col-lg-1">
              <img src="https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg" class="user-image img-circle margin-l-5" alt="User Image" width="40px">
            </div>
            <div class="col col-lg-2"><b>John Hae Doe</b></div>
            <div class="col col-lg-2"><a href="#">JohnHaeDoe@gmail.com</a></div>
            <div class="col col-lg-2">Filipino</div>
            <div class="col col-lg-2">
              <span class="text-muted">09429487865</span><br/>
              <span class="text-muted">09429487865</span><br/>
            </div>
            <div class="col col-lg-1">ABCDE123</div>
            <div class="col col-lg-2">
            <a href="#" class="text-danger">Remove</a>&emsp;
            <a href="#">Update</a>
            </div>
          </div>

          <div class="row"><hr/>
            <div class="col col-lg-1">
              <img src="https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg" class="user-image img-circle margin-l-5" alt="User Image" width="40px">
            </div>
            <div class="col col-lg-2"><b>John Hae Doe</b></div>
            <div class="col col-lg-2"><a href="#">JohnHaeDoe@gmail.com</a></div>
            <div class="col col-lg-2">Filipino</div>
            <div class="col col-lg-2">
              <span class="text-muted">09429487865</span><br/>
              <span class="text-muted">09429487865</span><br/>
            </div>
            <div class="col col-lg-1">ABCDE123</div>
            <div class="col col-lg-2">
            <a href="#" class="text-danger">Remove</a>&emsp;
            <a href="#">Update</a>
            </div>
          </div>

          <div class="row"><hr/>
            <div class="col col-lg-1">
              <img src="https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg" class="user-image img-circle margin-l-5" alt="User Image" width="40px">
            </div>
            <div class="col col-lg-2"><b>John Hae Doe</b></div>
            <div class="col col-lg-2"><a href="#">JohnHaeDoe@gmail.com</a></div>
            <div class="col col-lg-2">Filipino</div>
            <div class="col col-lg-2">
              <span class="text-muted">09429487865</span><br/>
              <span class="text-muted">09429487865</span><br/>
            </div>
            <div class="col col-lg-1">ABCDE123</div>
            <div class="col col-lg-2">
            <a href="#" class="text-danger">Remove</a>&emsp;
            <a href="#">Update</a>
            </div>
          </div>

          
          <div class="ajax-content"></div>
        </div>
        <!-- /.box-body -->
      </div>

      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">B</h3>
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col col-lg-1">
              <img src="https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg" class="user-image img-circle margin-l-5" alt="User Image" width="40px">
            </div>
            <div class="col col-lg-2"><b>John Hae Doe</b></div>
            <div class="col col-lg-2"><a href="#">JohnHaeDoe@gmail.com</a></div>
            <div class="col col-lg-2">Filipino</div>
            <div class="col col-lg-2">
              <span class="text-muted">09429487865</span><br/>
              <span class="text-muted">09429487865</span><br/>
            </div>
            <div class="col col-lg-1">ABCDE123</div>
            <div class="col col-lg-2">
            <a href="#" class="text-danger">Remove</a>&emsp;
            <a href="#">Update</a>
            </div>
          </div>

          <div class="ajax-content">
          </div>
        </div>
        <!-- /.box-body -->
      </div>


    </section>



    <!-- /.content -->
  </div>`
    
    return this.__template;
  }
}