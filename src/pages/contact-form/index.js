import style from './index.styl'

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

  __bindForm () {
    const form = import('./actions/create')
    form.then(res => {
      new res.default().validate(this.__template)
    })
  }
  __bindListeners (opt = {}) {
    this.__bindForm ()
  }

  async render () {
    this.__contactComponent = (await import('../../components/contact-list')).default
    this.__template = document.createElement('section')
    this.__template.classList.add('contacts-form-section', 'col', 'col-lg-6', 'col-lg-offset-3')
    this.__template.innerHTML = `
    <style>${style.toString()}</style>
    <div class="saving-status-section"></div>
    <div class="box box-primary">
      <div class="box-header with-border">
        <h3 class="box-title">Profile</h3>
          <span class="text-muted pull-right">
            <small>
              <a href="#">Basic</a> 
              &gt; <a href="#">Location</a>
              &gt; <a href="#">Other</a>
            </small>
          </span>
      </div>

      <br/>
      <img class="profile-user-img img-responsive img-circle" src="assets/img/boy.png"  alt="User profile picture">

      <!-- /.box-header -->
      <!-- form start -->
      <form role="form" id="contact-form">
        <div class="box-body">
          <p class="text-muted"><small>BASIC INFORMATION</small></p>
          <div class="form-group">
            <label for="lastName">Lastname <span class="text-danger">*</span></label>
            <input type="text" class="form-control" id="lastName" placeholder="Enter Surname" required>
          </div>
          <div class="form-group">
            <label for="firstName">Firstname <span class="text-danger">*</span></label>
            <input type="text" class="form-control" id="firstName" placeholder="Enter First Name" required>
          </div>
          <div class="form-group">
            <label for="middleName">Middle Name</label>
            <input type="text" class="form-control" id="middleName" placeholder="Enter Middle Name">
          </div>
          <div class="form-group">
            <label for="suffix">Suffix</label>
            <input type="text" class="form-control" id="suffix" placeholder="Jr. , II, III, etc...">
          </div>

          <div class="form-group"> 
            <label for="gender">Gender <span class="text-danger">*</span></label><br/>
            <div class="radio">
              <label>
                <input type="radio" value="male" name="gender" checked> Male
              </label>&emsp;
              <label>
                <input type="radio" value="female" name="gender"> Female
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>Birthday: <span class="text-danger">*</span></label>

            <div class="input-group date">
              <div class="input-group-addon">
                <i class="fa fa-calendar"></i>
              </div>
              <input type="date" class="form-control pull-right" id="birthday" required>
            </div>
            <!-- /.input group -->
          </div>

          <div class="form-group">
            <label for="nationality">Nationality</label>
            <input type="text" class="form-control" id="nationality" placeholder="Enter Nationality">
          </div>
          <div class="form-group">
            <label for="nationality">Specialization</label>
            <input type="text" class="form-control" id="specialization" placeholder="Enter Specialization">
          </div>

          <div class="form-group">
            <label for="civilStatus">Civil Status</label><br/>
            <div class="radio">
              <label>
                <input type="radio" value="single" name="civilStatus" checked> Single
              </label>&emsp;
              <label>
                <input type="radio" value="married" name="civilStatus"> Married
              </label>
            </div>
          </div>

          <br/>
          <p class="text-muted"><small>LOCATION</small></p>
          <div class="form-group">
              <label>Country</label>
              <select class="form-control country country-hidden-accessible" id="country" style="width: 100%;" tabindex="-1" aria-hidden="true">
                <option selected="selected">Alabama</option>
                <option>Alaska</option>
                <option>California</option>
                <option>Delaware</option>
                <option>Tennessee</option>
                <option>Texas</option>
                <option>Washington</option>
              </select>
          </div>

          <div class="form-group">
            <label for="address">Home Address</label>
            <input type="text" class="form-control" id="address" placeholder="Enter Home Address">
          </div>
          <div class="form-group">
            <label for="areaCode">Area Code</label>
            <input type="text" class="form-control" id="areaCode" placeholder="Enter Area Code">
          </div>
          <div class="form-group">
            <label for="zipCode">ZIP Code</label>
            <input type="text" class="form-control" id="zipCode" placeholder="Enter ZIP Code">
          </div>


          <p class="text-muted"><small>OTHER INFORMATION</small></p>
          <div class="form-group">
            <label for="affiliateCode">Affiliate Code</label>
            <input type="text" class="form-control" id="affiliateCode" placeholder="Enter Affiliate Code">
          </div>
          <div class="form-group">
            <label for="rank">Rank</label>
            <input type="number" class="form-control" id="rank" min="1" max="1000" placeholder="(min. 1 - max. 1000)">
          </div>
          
          <div class="form-group">
            <label for="address">Notes</label>
            <textarea class="form-control" id="notes" placeholder="Enter Notes" rows="7"></textarea>
          </div>
          

          
        </div>
        <!-- /.box-body -->

        <div class="box-footer">
          <button type="submit" class="btn btn-primary submit-contact-btn">Submit</button>
        </div>
      </form>
    </div>
    `
    this.__bindListeners()
    return this.__template;
  }
}