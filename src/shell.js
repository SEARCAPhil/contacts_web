/* eslint-disable new-cap */
import { URL } from './config/app'
import { Middleware } from './mixins/middleware'

const AuthMiddleWare = import('./middlewares/Auth')

const Navigo = import('navigo')
const Profiler = import('./mixins/profiler')

const loadHeader = (opt) => {
  const __header = import('./components/main-header')
  __header.then(Res => {
    const __target = document.querySelector('header')
    return new Res.default(opt).then(html => {
      return __target ? __target.replaceWith(html) : document.body.prepend(html)
    })
  })
}

const loadSidebar = (opt) => {
  const __sidebar = import('./components/main-sidebar')
  const __target = document.querySelector('.main-sidebar')
  __sidebar.then(Res => {
    return new Res.default(opt).then(html => {
      return __target ? __target.replaceWith(html) : document.body.prepend(html)
    })
  })
}

const loadCookieSection = (opt) => {
  const __cookie = import('./components/cookie-notice-section')
  const __target = document.querySelector('.cookie-section')
  __cookie.then(Res => {
    return new Res.default(opt).then(html => {
      return __target ? __target.replaceWith(html) : document.body.append(html)
    })
  })
}

const loadAccountRouters = () => {
  import('./routers/account/')
}

const loadMain = (opt = {}) => {
  loadHeader(opt)
  loadSidebar(opt)
  loadCookieSection(opt)

  let token = window.localStorage.getItem('adal.access.token.keyhttps://graph.microsoft.com')

  // get image from server if not exists
  if (opt.image) return
  getImage(token).then(res => {
    res.blob().then(blob => {
      // reader
      let reader = new window.FileReader()
      reader.readAsDataURL(blob)
      reader.onloadend = function () {
        Profiler.then(prof => {
          let p = new prof.default()
          if (reader.result.indexOf('data:image') !== -1) {
            // check for valid image
            let data = { ...p.get(), image: reader.result }
            // save image
            p.set(data)
            // reload header
            loadHeader(opt)
          }
        })
      }
    })
  })

  document.querySelector('.wrapper').classList.remove('hidden')
  let loginContainer = document.querySelector('.loginContainer')
  if (loginContainer) loginContainer.remove()
}

const loadLoginPage = () => {
  document.querySelector('.wrapper').classList.add('hidden')
  const loginContainer = document.createElement('main')
  loginContainer.classList.add('loginContainer')

  // hide other section
  let header = document.querySelector('.main-header')
  let sidebar = document.querySelector('.main-sidebar')
  if (header) header.classList.add('hidden')
  if (sidebar) sidebar.classList.add('hidden')

  import('./pages/login-page').then(res => {
    return new res.default().then(html => {
      loginContainer.innerHTML = ''
      loginContainer.append(html)
      if (!document.querySelector('.loginContainer')) document.body.append(loginContainer)
      document.querySelector('.loginContainer').replaceWith(loginContainer)
    })
  })
}

const loadProfile = () => {
  return new Promise((resolve, reject) => {
    Profiler.then(res => {
      let profile = new res.default().get()
      resolve(profile)
    })
  })
}

const getImage = (token) => {
  // https://graph.microsoft.com/v1.0/me/photo/$value
  return window.fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
    headers: { 'Authorization': 'Bearer ' + token },
    method: 'GET'
  })
}

let profile = {}
const loadRoutes = () => {
  Navigo.then(routerClass => {
    const router = new routerClass.default(URL.fullPath, true)
    router.on({
      '': async () => {
        profile = await loadProfile()
        if (profile.id) return (window.location.hash = '#/contacts')
        loadLoginPage()
      },
      '/account/*': async () => {
        profile = await loadProfile()
        loadMain(profile)
        loadAccountRouters()
      },
      '/contacts': async () => {
        profile = await loadProfile()
        loadMain(profile)
        loadAccountRouters()
      },
      '/contacts/*': async () => {
        profile = await loadProfile()
        loadMain(profile)
        loadAccountRouters()
      },
      '/reports': async () => {
        profile = await loadProfile()
        loadMain(profile)
        import('./routers/reports')
      },
      '/login': () => {
        loadLoginPage()
      },
      '/signout': () => {
        Profiler.then(prof => {
          new prof.default().clear()
          setTimeout(() => (window.location.hash = '#/'), 100)
        })
      }
    }).resolve()
  })
}

const MiddleWare = new Middleware()
let auth = AuthMiddleWare.then(middleware => { return new middleware.default() })

MiddleWare.merge([auth]).then((value) => {
  MiddleWare.run(['Auth']).then(() => {
    loadRoutes()
  }).catch(e => {
    loadLoginPage()
  })
})

// service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(registration => {
      console.log('SW registered: ', registration)
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError)
    })
  })
}
