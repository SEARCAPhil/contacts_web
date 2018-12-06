export default class {
  constructor(opt = {}) {
    this.__opt = opt
    this.__emailType = 'email'
    this.__emails = ''
    this.__contactInfo = ''
    return this.render(opt) 
  }

  __bindListeners () {
    this.getLectureListComponent ()
  }


  getLectureListComponent () {
    const contact = import('../../components/contact-conference-lecture-list')
    const targ = this.__template.querySelector('.contact-conference-lectures-list-section')
    return contact.then(res => {
      // get all employment records
      this.__opt.lectures.forEach((el, index) => {
        // DOM
        return new res.default(el).then(html => {
          targ.append(html)
        })
      })
    })
  }
  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('account-employment-list-item', 'col', 'col-lg-12', 'col-md-12')
    this.__template.innerHTML = `
    <b>${this.__opt.title} </b><br/>
      <small class="text-muted">
      ${this.__opt.dateStarted} ${this.__opt.dateEnded ?  '- ' + this.__opt.dateEnded : ''}<br/>
        <details>
          <summary><b>${this.__opt.venue}  </b><br/></summary><br/>
          <div class="col col-lg-12">
            <p><strong><i class="fa fa-list"></i>Lectures</strong></p>
            <div class="contact-conference-lectures-list-section"></div>
          </div>
        </details>
      </small>  
      <hr/>`
    this.__bindListeners()
    return this.__template;
  }
}