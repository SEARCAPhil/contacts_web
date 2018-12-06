
export default class {
  constructor(opt = {}) {
    this.__opt = opt
    this.__contactComponent = {}
    this.__listSecTemplate = {}
    return this.render(opt) 
  }

  getContactListComponent () {
    const contact = import('../../components/contact-list')
    return contact.then(res => {
      this.__contactComponent = res.default
    })
  }

  async __getContacts () {
    const __contacts = (await import('../../components/contact-list/actions/retrieve')).default
    return new __contacts().get().then(res => {
      let __data = res.data
      
      __data.forEach((el, index) => {
        // capture first letter and append to proper container 
        let firstLetter = el.firstname.charAt(0).toUpperCase()
        let targ = this.__template.querySelector(`.contact-list-section-${firstLetter}`)
        if (targ) {
          // create component and show container
          targ.classList.remove('hidden')
          new this.__contactComponent(el).then(res => {
            targ.append(res) 
          }) 
        }
      })
    })

  }
  __createContactListSection () {
    const __targ = this.__template.querySelector('.contact-list-section')
    // empty
    __targ.innerHTML = ''
    __targ.innerHTML += `
      <div class="box contact-list-section- hidden">
        <div class="box-header with-border">
          <h3 class="box-title"></h3>
        </div>
        <div class="box-body"><div class="ajax-content"></div>
        </div>
        <!-- /.box-body -->
      </div>`

    
    for (let i = 65; i <= 90; i++) {
      __targ.innerHTML += `
      <div class="box contact-list-section-${String.fromCharCode(i)} hidden">
        <div class="box-header with-border">
          <h3 class="box-title">${String.fromCharCode(i)}</h3>
        </div>
        <div class="box-body"><div class="ajax-content"></div>
        </div>
        <!-- /.box-body -->
      </div>`
    }
  }

  __bindListeners () {
    this.__createContactListSection()
    this.__getContacts()
  }

  async render () {
    this.__contactComponent = (await import('../../components/contact-list')).default
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
    <section class="content contact-list-section"></section>



    <!-- /.content -->
  </div>`
    this.__bindListeners()
    return this.__template;
  }
}