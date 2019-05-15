/* eslint-disable new-cap */
const URL = import('../../utils/xhr')
import { URL as URI } from '../../config/api'

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    this.__contactComponent = {}
    this.__listSecTemplate = {}
    this.__timeout = {}
    this.__headers = { 'Authorization': `Bearer ${window.localStorage.getItem('cwp.access_token')}` }
    return this.render(opt)
  }

  __getCountry () {
    return new Promise((resolve, reject) => {
      window.fetch(`${URI.scheme}://${URI.host}/${URI.base}/api/country`, { headers: this.__headers})
      .then(res => resolve(res.json()))
    })
  }

  async getSaaf (id = 0) {
    this.xhr = new (await URL).default()
    return id ? this.xhr.__getData(`saaf/class/${id}`, this.__headers) : this.xhr.__getData(`saaf/class`, this.__headers)
  }

  bindSaffListener (targ, parentNode, parentNodeID, stat = '') {
    targ.addEventListener('change', (e) => {
      let id = (e.target.value)

      if (id === 'null') return (document.querySelector(`#select-saaf-${parentNodeID}-container`).innerHTML = '')

      stat.innerHTML = 'loading sub categories . . .'
      this.getSaaf(id).then(res => {
        if (res.data.length) {
          // create new option
          let div = document.createElement('div')
          div.id = `select-saaf-${id}-container`
          let opts = ''
          div.classList.add('form-group')
          div.style.marginTop = '10px'

          // options
          res.data.forEach((el, index) => {
            opts += `<option value="${el.saafclass_id}">${el.saafclass}</option>`
          })

          div.innerHTML = `
            <select class="form-control type type-hidden-accessible" id="select-saaf-${id}" style="width: 100%;" tabindex="-1" aria-hidden="true">
              <option default="" value="null">Please Select SAAF Type</option>
              ${opts}
            </select>
            <div class="form-group id="select-saaf-${id}-container"></div>
            `
          this.bindSaffListener(div.querySelector('select'), div, id, stat)
          let newTarg = document.querySelector(`#select-saaf-${id}-container`)
          if (newTarg) newTarg.innerHTML = ''

          parentNode.append(div)
        }

        stat.innerHTML = ''
      })
    })
  }

  getRootSaafType () {
    let targ = this.__template.querySelector('#type')
    let stat = this.__template.querySelector('.saaf-type-status-text-section')
    let parentNode = targ.nextElementSibling
    return new Promise((resolve, reject) => {
      this.getSaaf().then(res => {
        if (!res.data) return

        res.data.forEach((el, index) => {
          let opt = document.createElement('option')
          opt.innerHTML = el.saafclass
          opt.value = el.saafclass_id
          targ.append(opt)
        })

        this.bindSaffListener(targ, parentNode, null, stat)
        resolve()
      })
    })
  }
  bindSubmit () {
    this.__template.querySelector('.generate-per-country-report').addEventListener('click', (e) => {
      // get types
      let type = null
      const types = this.__template.querySelectorAll('.type')
      types.forEach((el, index) => {
        if (el.value !== 'null') type = el.value
      })
      // country
      let country = this.__template.querySelector('#country').value
      // new PDF window
      window.open(`${URI.scheme}://${URI.host}/${URI.base}/api/reports/directory/country/?type=${type}&country=${country}`)
    })
  }
  __bindListeners (opt = {}) {
    // get SAAF parent class
    this.getRootSaafType()
    this.bindSubmit()
  }

  async render () {
    // countries
    this.__countries = (await this.__getCountry ())
    let countries = ''
    this.__countries.data.forEach((el, index) => {
      countries+=`<option value="${el.country_id}">${el.countryName}</option>`
    })
    this.__template = document.createElement('section')
    this.__template.classList.add('contacts-section')
    this.__template.innerHTML = `<div " style="min-height: 1170px;">
     <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        <small>Others</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">Others</li>
      </ol>

      <div class="media">
        <div class="media-left">
          <span>
            <img class="media-object" src="assets/img/report.png" alt="..." width="50px">
          </span>
        </div>
        <div class="media-body">
          <h4 class="media-heading">Reports</h4>Generate report in PDF format with ease!</div>
      </div>

    </section>

    <!-- Main content -->
    <section class="content contact-list-section">
      <section class="col col-lg-6">
        <div class="col box contact-list-section" style="border-top:none;">
          <div class="box-header with-border">
            <h3 class="box-title">Directory per Country</h3>
          </div>
          <div class="box-body">
            <div class="col col-lg-6">
              <p class="text-muted">SAAF Class</p>
              <span class="saaf-type-status-text-section"></span>
              <select class="form-control type type-hidden-accessible" id="type" style="width: 100%;" tabindex="-1" aria-hidden="true">
                <option default="" value="null">Please Select SAAF Type</option>
                <option value="null">N/A</option>
              </select>
              <div class="form-group" id="select-saaf-null"></div>
            </div>

            <div class="col col-lg-6">
              <p class="text-muted">Country</p>
              <select class="form-control" id="country">
                ${countries}
              </select>
            </div>

            <div class="col col-lg-12"><br/>
              <button class="btn generate-per-country-report" type="button" style="background: #6f6f6f;color:#fff;">PROCEED</button>
            </div>

          </div>
          <!-- /.box-body -->
        </div>
      </section>
    </section>
    


    <!-- /.content -->
  </div>`
    this.__bindListeners()
    return this.__template
  }
}
