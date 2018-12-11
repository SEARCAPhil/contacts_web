import {URL} from './config/app'

const Navigo = import('navigo')

const loadHeader = () => {
  const __header = import('./components/main-header')
  const __target = document.querySelector('header')
  __header.then(res => {
    return new res.default().then(html => {
      return __target ? __target.replaceWith(html) : document.body.prepend(html)
    })
  })
}

const loadSidebar = () => {
  const __sidebar = import('./components/main-sidebar')
  const __target = document.querySelector('.main-sidebar')
  __sidebar.then(res => {
    return new res.default().then(html => {
      return __target ? __target.replaceWith(html) : document.body.prepend(html)
    })
  })
}

const loadAccountRouters = () => {
  import ('./routers/account/')
}

const loadMain = () => {
  loadHeader()
  loadSidebar()
}

Navigo.then(routerClass => {
  const router = new routerClass.default(URL.fullPath, true)
  router.on({
    '' : () => {
      loadMain()
    },
    '/account/*' : () => {
      loadMain()
      loadAccountRouters()
    },
    '/contacts' : () => {
      loadMain()
      loadAccountRouters()
    },
    '/contacts/*' : () => {
      loadMain()
      loadAccountRouters()
    },
  }).resolve()
})
