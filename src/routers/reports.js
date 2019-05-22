/* eslint-disable new-cap */
import { URL } from '../config/app'

const Navigo = import('navigo')

Navigo.then(routerClass => {
  const router = new routerClass.default(URL.fullPath, true)
  router.on({
    '': () => { },
    '/reports': async (params) => {
      // set active
      let PubSub = (await import('pubsub-js')).default
      PubSub.publish('MAIN_NAV', 'reports')

      const __profilePage = (await import('../pages/reports-section')).default
      return new __profilePage().then(res => {
        const __targ = document.querySelector('.ajax-main-section')
        __targ.innerHTML = ''
        __targ.append(res)
      })
    }
  }).resolve()
})
