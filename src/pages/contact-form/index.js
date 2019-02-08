/* eslint-disable new-cap */
import style from './index.styl'
import { URL as URI } from '../../config/api'
const URL = import('../../utils/xhr')

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    this.__contactComponent = {}
    this.__listSecTemplate = {}
    this.__info = {}
    this.__headers = { 'Authorization': `Bearer ${window.localStorage.getItem('cwp.access_token')}` }
    return this.render(opt)
  }

  __getInfo () {
    return import('../../components/contact-profile-box/actions/retrieve').then(res => {
      return new res.default({ id: this.__opt.id, headers: this.__headers }).get(json => {
        return json
      }).catch(err => {
        return err
      })
    })
  }

  __bindForm (opt) {
    const form = import('./actions/create')
    form.then(res => {
      new res.default(opt).validate(this.__template)
    })
  }

  async uploadImage (file) {
    let formData = new window.FormData()
    formData.append('file', file)
    formData.append('id', this.__opt.id)

    this.xhr = new (await URL).default()
    return this.xhr.__postData(`contact/photo`, formData, this.__headers, false).then((res) => {
      let label = document.querySelector('#photoLabel')
      label.innerHTML = '<span class="text-success">Uploaded Successfully!</span>'
    })
  }

  __imageReader (e) {
    let file = e.target.files[0]
    let reader = new window.FileReader()
    let allowedFileType = ['jpeg', 'png']
    let label = document.querySelector('#photoLabel')
    label.innerHTML = 'uploading . . .'
    label.setAttribute('for', '')

    // read file
    reader.onload = (e) => {
      if (allowedFileType.indexOf(file.type.split('/')[1]) === -1) return (label.innerHTML = '<span class="text-danger">File type unsupported!</span>')
      let img = this.__template.querySelector('.profile-user-img')
      img.style.height = '100px'
      img.src = e.target.result
      // upload to server
      this.uploadImage(file)
    }

    reader.readAsDataURL(file)
  }
  __bindUploadPhoto () {
    let targ = this.__template.querySelector('#photo')
    let __proto__ = Object.create(this)
    if (!targ) return
    targ.addEventListener('change', this.__imageReader.bind(__proto__))
  }

  __loadPhoto () {
    // load photo if account is loaded on DOM
    if (!this.__opt.id) return
    let im = this.__template.querySelector('.profile-image')
    if (!im || !this.__info.photo) return
    im.src = `${URI.scheme}://${URI.host}/${URI.base}/uploads/${this.__info.photo}`
  }
  __bindListeners (opt = {}) {
    this.__bindForm(opt)
    this.__bindUploadPhoto()
    this.__loadPhoto()
  }

  async render () {
    // get information
    if (this.__opt.action === 'update') this.__info = await this.__getInfo()
    // template
    this.__template = document.createElement('section')
    this.__template.classList.add('contacts-form-section', 'col', 'col-lg-6', 'col-lg-offset-3')
    this.__template.innerHTML = `
    <style>${style.toString()}</style>
    ${this.__opt.action === 'update' ? `<a href="#/account/${this.__opt.id}/profile"><i class="fa fa-long-arrow-left"></i> Back</a>` : ''}
    <h3>Account Profile</h3>
    <p class="text-muted">All fields with (*) are required</p>
    <div class="saving-status-section"></div>
    <div class="box box-primary">
      <div class="box-header with-border">
        <h3 class="box-title">Profile</h3>
          <span class="text-muted pull-right">
            <small>
              <a href="#/contacts">Contacts</a> 
              &gt; <a href="#/contacts/form">Form</a>
            </small>
          </span>
      </div>

      <br/>
      <img class="profile-user-img img-responsive img-circle profile-image" src="assets/img/boy.png"  alt="User profile picture">
      ${this.__info.contact_id ? `<input type="file" id="photo" style="display:none;"/><center><label id="photoLabel" for="photo" style="color:#29b6f6;cursor:pointer;">Change Photo</label></center>` : ''}
      <!-- /.box-header -->
      <!-- form start -->
      <form role="form" id="contact-form">
        <div class="box-body">
          <p class="text-muted"><small>BASIC INFORMATION</small></p>
          <div class="form-group">
            <label for="lastName">Lastname <span class="text-danger">*</span></label>
            <input type="text" class="form-control" id="lastName" placeholder="Enter Surname" required value="${this.__info.lastname || ''}">
          </div>
          <div class="form-group">
            <label for="firstName">Firstname <span class="text-danger">*</span></label>
            <input type="text" class="form-control" id="firstName" placeholder="Enter First Name" required value="${this.__info.firstname || ''}">
          </div>
          <div class="form-group">
            <label for="middleName">Middle Name</label>
            <input type="text" class="form-control" id="middleName" placeholder="Enter Middle Name" value="${this.__info.middleinit || ''}">
          </div>
          <div class="form-group">
            <label for="suffix">Suffix</label>
            <input type="text" class="form-control" id="suffix" placeholder="Jr. , II, III, etc..." value="${this.__info.suffix || ''}">
          </div>

          <div class="form-group"> 
            <label for="gender">Gender <span class="text-danger">*</span></label><br/>
            <div class="radio">
              <label>
                <input type="radio" value="male" name="gender" checked ${this.__info.gender === 'male' ? 'checked' : ''}> Male
              </label>&emsp;
              <label>
                <input type="radio" value="female" name="gender" ${this.__info.gender === 'female' ? 'checked' : ''} > Female 
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>Birthday: <span class="text-danger">*</span></label>

            <div class="input-group date">
              <div class="input-group-addon">
                <i class="fa fa-calendar"></i>
              </div>
              <input type="date" class="form-control pull-right" id="birthday" required value="${this.__info.birthdate || ''}">
            </div>
            <!-- /.input group -->
          </div>

          <div class="form-group">
            <label for="nationality">Nationality</label>
            <input type="text" class="form-control" id="nationality" placeholder="Enter Nationality" value="${this.__info.nationality || ''}">
          </div>
          <div class="form-group">
            <label for="nationality">Specialization</label>
            <input type="text" class="form-control" id="specialization" placeholder="Enter Specialization" value="${this.__info.specialization || ''}">
          </div>

          <div class="form-group">
            <label for="civilStatus">Civil Status</label><br/>
            <div class="radio">
              <label>
                <input type="radio" value="single" name="civilStatus" checked ${this.__info.civilStat === 'single' ? 'checked' : ''}> Single
              </label>&emsp;
              <label>
                <input type="radio" value="married" name="civilStatus" ${this.__info.civilStat === 'married' ? 'checked' : ''}> Married
              </label>
            </div>
          </div>

          <br/>
          <p class="text-muted"><small>LOCATION</small></p>
          <div class="form-group">
              <label>Country</label>
              <select class="form-control country country-hidden-accessible" id="country" style="width: 100%;" tabindex="-1" aria-hidden="true">
                <option default value="${this.__info.homeCountry || ''}">${this.__info.homeCountry || ''}</option>
                <optionAlabama</option>
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
            <input type="text" class="form-control" id="address" placeholder="Enter Home Address" value="${this.__info.homeAddress || ''}">
          </div>
          <div class="form-group">
            <label for="areaCode">Area Code</label>
            <input type="text" class="form-control" id="areaCode" placeholder="Enter Area Code" value="${this.__info.homeAreaCode || ''}">
          </div>
          <div class="form-group">
            <label for="zipCode">ZIP Code</label>
            <input type="text" class="form-control" id="zipCode" placeholder="Enter ZIP Code" value="${this.__info.homeZipCode || ''}">
          </div>


          <p class="text-muted"><small>OTHER INFORMATION</small></p>
          <div class="form-group">
            <label for="affiliateCode">Affiliate Code</label>
            <input type="text" class="form-control" id="affiliateCode" placeholder="Enter Affiliate Code" value="${this.__info.affiliateCode || ''}">
            <br/>
            <div class="well well-sm">
              <small>
                <p><b class="text-danger">Affiliate format example</b></p>
                <p>SAMPLE CODE: <u>ABC2000PHL3M</u></p>
                <p><b>ABC</b>2000PHL3M - SAAF</p>
                <p>ABC<b>2000</b>PHL3M - First recorded SEARCA Alumni, Grads, etc...</p>
                <p>ABC2000<b>PHL3M</b> - 3rd Male from Philippines</p>
              </small>
            </div>
          </div>
          <div class="form-group">
            <label for="rank">Rank</label>
            <input type="number" class="form-control" id="rank" min="1" max="1000" placeholder="(min. 1 - max. 1000)" value="${this.__info.rank || ''}">
          </div>
          
          <div class="form-group">
            <label for="address">Notes</label>
            <textarea class="form-control" id="notes" placeholder="Enter Notes" rows="7">${this.__info.others || ''}</textarea>
          </div>
          

          
        </div>
        <!-- /.box-body -->

        <div class="box-footer">
          <button type="submit" class="btn btn-primary submit-contact-btn">Submit</button>
        </div>
      </form>
    </div>
    `
    this.__bindListeners(this.__opt)
    return this.__template
  }
}
