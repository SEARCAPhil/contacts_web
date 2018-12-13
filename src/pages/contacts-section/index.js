
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

  __goToPage(page) {
    this.__bindListeners ({page})
  }
  __createPageNav (treshold, currentPage = 1) { 
    let pager = document.createElement('span')
    for( let x = 1; x <=treshold; x++) {
      let span = document.createElement('span')
      span.classList.add('btn', 'btn-xs', 'btn-default', 'contact-last-page', (currentPage === x ? 'active' : 'not-active'))
      span.style.marginRight = '3px'
      span.innerHTML = x
      // navigate to page
      span.addEventListener('click', () => {
        this.__goToPage(x)
      })
      pager.append(span)  
    }
    return pager
  }

  __pager (firstPage, lastPage) { 
    let html =  document.createElement('div')
    html.innerHTML = ` <span class="btn btn-xs btn-default contact-first-page">&laquo&laquo</span>
    <span class="pager-boxes"></span>
    <span class="btn btn-xs btn-default contact-last-page">&raquo&raquo</span>`

    // Go to first page
    html.querySelector('.contact-first-page').addEventListener('click', () => {
      this.__goToPage(1)
    })

    // Go to last page
    html.querySelector('.contact-last-page').addEventListener('click', () => {
      this.__goToPage(lastPage)
    })

    this.__template.querySelector('.contact-list-section').append(html)
  }

  async __getContacts (opt = {}) {
    const __contacts = (await import('../../components/contact-list/actions/retrieve')).default
    return new __contacts().get(opt).then(res => {
      let __data = res.data

      // total count
      const totalCount = res.data.length
      const totalOutOf = res.total
      const lastPage  = res.last_page
      document.querySelector('.total-count').innerText = totalCount
      document.querySelector('.total-count-out-of').innerText = totalOutOf


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

      // show pagination
      this.__pager(res.first_page_url, res.last_page)
      // page
      let pagerBox = document.querySelector('.pager-boxes')
      pagerBox.innerHTML = ''
      pagerBox.append(this.__createPageNav(lastPage, res.current_page))
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

  __bindListeners (opt = {}) {
    
    this.__createContactListSection()
    this.__getContacts(opt)
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

      <div class="media">
        <div class="media-left">
          <span>
            <img class="media-object" src="https://banner2.kisspng.com/20180221/bqq/kisspng-smartphone-mobile-phone-cartoon-hand-phone-5a8e02d08fa7e1.2797760215192562725884.jpg" alt="..." width="50px">
          </span>
        </div>
        <div class="media-body">
          <h4 class="media-heading">Phonebook</h4>helps you easily find person on your records</div>
      </div>

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
      
      <p>Total : <span class="badge"><span class="total-count"></span> out of <span class="total-count-out-of"></span></span></p>

    </section>

    <!-- Main content -->
    <section class="content contact-list-section"></section>
    


    <!-- /.content -->
  </div>`
    this.__bindListeners()
    return this.__template;
  }
}