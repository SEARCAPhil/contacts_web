/* eslint-disable new-cap */
import { URL } from '../config/app'

const Navigo = import('navigo')

Navigo.then(routerClass => {
  const router = new routerClass.default(URL.fullPath, true)
  router.on({
    '': () => { },
    '/reports': async (params) => {
      const __profilePage = (await import('../pages/reports-section')).default
      return new __profilePage().then(res => {
        const __targ = document.querySelector('.ajax-main-section')
        __targ.innerHTML = ''
        __targ.append(res)
      })
    }
  }).resolve()
})
