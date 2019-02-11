import style from './index.styl'

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    return this.render(opt)
  }

  async render () {
    this.__template = document.createElement('aside')
    this.__template.classList.add('main-sidebar')
    this.__template.innerHTML = `
    <style>${style.toString()}</style>
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar Menu -->
      <ul class="sidebar-menu" data-widget="tree" style="margin-top: 10px;">
        <li class="header">PERSONAL</li>
        <li class="active treeview menu-open active">
          <a href="#/contacts"><i class="fa fa-users"></i> <span>Contacts</span></a>
          <ul class="treeview-menu" style="">
            <li class="active"><a href="#/contacts/form/"><i class="fa fa-circle-o"></i> <span>Form</span></a></li>
          </ul>
        </li>
        <!--<li><a href="#"><i class="fa fa-briefcase"></i> <span>Employment</span></a></li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-graduation-cap"></i> <span>Education</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu" style="">
            <li class="active"><a href="#"><i class="fa fa-link"></i> <span>Bachelors</span></a></li>
            <li class="active"><a href="#"><i class="fa fa-link"></i> <span>Masters</span></a></l
            <li class="active"><a href="#"><i class="fa fa-link"></i> <span>Doctoral</span></a></li>
          </ul>
        </li>-->
      </ul>
  
  
      <!-- Sidebar Menu -->
      <ul class="sidebar-menu" data-widget="tree">
        <li class="header">SEARCA</li>
        <li><a href="#/contacts/engagements"><i class="fa fa-link"></i> <span>Engagement</span></a></li>
        <li><a href="#/contacts/graduates"><i class="fa fa-link"></i> <span>Graduate Alumni</span></a></li>
        <li><a href="#/contacts/trainees"><i class="fa fa-link"></i> <span>Training Alumni</span></a></li>
        <li><a href="#/contacts/associates"><i class="fa fa-link"></i> <span>Associates</span></a></li>
        <li><a href="#/contacts/fellows"><i class="fa fa-link"></i> <span>Fellows</span></a></li>
        
      </ul>
          
      <!-- Sidebar Menu 
      <ul class="sidebar-menu" data-widget="tree">
        <li class="header">GENERAL</li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-table"></i> <span>Tables</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu" style="">
            <li class="active"><a href="#"><i class="fa fa-link"></i> <span>Aff-Type</span></a></li>
            <li class="active"><a href="#"><i class="fa fa-link"></i> <span>SAAF-Class / Type</span></a></li>
            <li class="active"><a href="#"><i class="fa fa-link"></i> <span>Country</span></a></li>
            <li class="active"><a href="#"><i class="fa fa-link"></i> <span>Prefix</span></a></li>
            <li class="active"><a href="#"><i class="fa fa-link"></i> <span>Sector</span></a></li>
          </ul>
        </li>
        
      </ul>-->

      <!-- Sidebar Menu -->
      <ul class="sidebar-menu" data-widget="tree">
        <li class="header">Others</li>
        <li><a href="#/reports"><i class="fa fa-file-pdf-o"></i> <span>Reports</span></a></li>
      </ul>

      <ul class="sidebar-menu" data-widget="tree" style="margin-top: 100px;">
        <li><a href="#/signout" style="background: #334852;"><i class="fa fa-long-arrow-left"></i> <span>Sign-out</span></a></li>
      </ul>

      <!-- /.sidebar-menu -->
    </section>`

    return this.__template
  }
}
