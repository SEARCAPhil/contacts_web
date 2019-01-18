/* eslint-disable new-cap */
const URL = import('../../../utils/xhr')

export default class {
  constructor (opt) {
    this.opt = opt
    this.xhr = {}
    this.bind()
  }

  success () {
    // close popup
    document.getElementById('general-modal').close()
    let targ = document.querySelector(`.research-section-${this.opt.id}`)
    targ.style.color = '#ccc'
    targ.innerHTML = '<center>Item has been deleted</center>'

    setTimeout(() => targ.remove(), 3000)
  }

  error (err = '') {
    console.log('Unable to process this request! Please try again later')
    // close popup
    document.getElementById('general-modal').close()
    console.log(err)
  }

  async remove (e) {
    e.target.setAttribute('disabled', 'disabled')
    this.xhr = new (await URL).default()

    return this.xhr.__deleteData(`contact/research/${this.opt.id}`, {}, {}, false).then(res => {
      return parseInt(res) === 1 ? this.success() : this.error()
    })

    // remove from DB
    /* return new serve().remove(__payload).then(json => {
      return json.data == 1 ?  this.success(__payload.id) : this.error()
    }).catch(err => this.error(err)) */
  }

  load (e) {
    import('../../../components/remove-conf-modal').then(res => {
      const __proto = Object.create(this)
      // DOM
      const __target = document.querySelector('#general-modal  > .content > .body')

      __target.innerHTML = res.template
      // close button
      __target.querySelector('#modal-dialog-close-button').addEventListener('click', document.querySelector('#general-modal').close)

      // remove button
      document.getElementById('modal-dialog-remove-button').addEventListener('click', this.remove.bind(__proto))
    })
  }

  bind () {
    const proto = Object.create(this)
    const root = this.opt.root || document
    root.querySelector(this.opt.selector).addEventListener('click', this.load.bind(proto))
  }
}
