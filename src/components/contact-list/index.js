export default class {
  constructor(opt = {}) {
    this.__opt = opt
    return this.render(opt) 
  }

  async render () {
    this.__template = document.createElement('div')
    this.__template.classList.add('row')
    this.__template.onclick = `window.location.href='#/account/1/profile'`
    this.__template.innerHTML = `
    <div class="col col-lg-1">
      <img src="https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg" class="user-image img-circle margin-l-5" alt="User Image" width="40px">
    </div>
    <div class="col col-lg-2"><b>John Hae Doe</b></div>
    <div class="col col-lg-2"><a href="#">JohnHaeDoe@gmail.com</a></div>
    <div class="col col-lg-2">Filipino</div>
    <div class="col col-lg-2">
      <span class="text-muted">09429487865</span><br>
      <span class="text-muted">09429487865</span><br>
    </div>
    <div class="col col-lg-1">ABCDE123</div>
    <div class="col col-lg-2">
      <a href="#" class="text-danger">Remove</a>&emsp;
      <a href="#">Update</a>
    </div>`
    
      return this.__template;
  }
}