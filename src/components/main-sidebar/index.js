import style from './index.styl'
import PubSub from 'pubsub-js'

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    return this.render(opt)
  }

  setActiveNav (nav) {
    this.__template.querySelectorAll('.sidebar-menu > li').forEach((el, index) => {
      if(el.classList.contains(nav)) {
        el.classList.add('active')
      } else {
        el.classList.remove('active')
      }
    })
  }
  __bindListeners () {
    PubSub.unsubscribe('MAIN_NAV')
    PubSub.subscribe('MAIN_NAV', (msg, data) => {
      this.setActiveNav (data) 
    })
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
        <li class="home"><a href="#"><i class="fa fa-home"></i> <span>Home</span></a></li>
        <li class="header">PERSONAL</li>
        <li class="treeview menu-open contacts">
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
        <li class="engagement"><a href="#/contacts/engagements"><i class="fa fa-suitcase"></i> <span>Engagement</span></a></li>
        <li class="graduate_alumni"><a href="#/contacts/graduates"><i class="fa fa-graduation-cap"></i> <span>Graduate Alumni</span></a></li>
        <li class="training_alumni"><a href="#/contacts/trainees"><i class="fa fa-wrench"></i> <span>Training Alumni</span></a></li>
        <li class="associates"><a href="#/contacts/associates"><i class="fa fa-users"></i> <span>Associates</span></a></li>
        <li class="fellows"><a href="#/contacts/fellows"><i class="fa fa-link"></i> <span>Fellows</span></a></li>
        
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
        <li class="reports"><a href="#/reports"><i class="fa fa-file-pdf-o"></i> <span>Reports</span></a></li>
      </ul>

      <ul class="sidebar-menu" data-widget="tree" style="margin-top: 50px;">
        <li><a href="#/signout" id="signout" style="background: #334852;"><i class="fa fa-long-arrow-left"></i> <span>Sign-out</span></a></li>
      </ul>

      <!-- /.sidebar-menu -->
    </section>`
    this.__bindListeners ()
    return this.__template
  }
}
