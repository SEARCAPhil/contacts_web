/* eslint-disable new-cap */
import { URL } from '../../config/app'

const Navigo = import('navigo')

Navigo.then(routerClass => {
  const router = new routerClass.default(URL.fullPath, true)
  router.on({
    '': () => { },
    '/account/:id/profile': async (params) => {
      const __profilePage = (await import('../../pages/profile-section')).default
      return new __profilePage(params).then(res => {
        const __targ = document.querySelector('.ajax-main-section')
        __targ.innerHTML = ''
        __targ.append(res)
      })
    },
    '/contacts': async (params) => {
      const __profilePage = (await import('../../pages/contacts-section')).default
      return new __profilePage().then(res => {
        const __targ = document.querySelector('.ajax-main-section')
        __targ.innerHTML = ''
        __targ.append(res)
      })
    },
    '/contacts/graduates': async (opt = {}) => {
      const __profilePage = (await import('../../pages/contacts-graduate-section')).default

      return new __profilePage(opt).then(res => {
        const __targ = document.querySelector('.ajax-main-section')
        __targ.innerHTML = ''
        __targ.append(res)
      })
    },
    '/contacts/engagements': async (opt) => {
      const __profilePage = (await import('../../pages/contacts-engagement-com-section')).default

      return new __profilePage(opt).then(res => {
        const __targ = document.querySelector('.ajax-main-section')
        __targ.innerHTML = ''
        __targ.append(res)
      })
    },
    '/contacts/associates': async () => {
      const __profilePage = (await import('../../pages/contacts-graduate-section')).default
      // set filter
      let opt = {
        filter: 'associates'
      }
      // load
      return new __profilePage(opt).then(res => {
        const __targ = document.querySelector('.ajax-main-section')
        __targ.innerHTML = ''
        __targ.append(res)
      })
    },
    '/contacts/trainees': async (opt = {}) => {
      const __profilePage = (await import('../../pages/contacts-training-section')).default

      return new __profilePage(opt).then(res => {
        const __targ = document.querySelector('.ajax-main-section')
        __targ.innerHTML = ''
        __targ.append(res)
      })
    },
    '/contacts/fellows': async (opt) => {
      const __profilePage = (await import('../../pages/contacts-fellowship-section')).default

      return new __profilePage(opt).then(res => {
        const __targ = document.querySelector('.ajax-main-section')
        __targ.innerHTML = ''
        __targ.append(res)
      })
    },
    '/contacts/form': async (params) => {
      console.log('a')
      const __page = (await import('../../pages/contact-form')).default
      return new __page().then(res => {
        const __targ = document.querySelector('.ajax-main-section')
        __targ.innerHTML = ''
        __targ.append(res)
      })
    },
    '/contacts/form/:id/update': async (params) => {
      const __page = (await import('../../pages/contact-form')).default

      // this will signal the app to get contact info
      // without the action parameter, form will add new contact by default
      params.action = 'update'

      return new __page(params).then(res => {
        const __targ = document.querySelector('.ajax-main-section')
        __targ.innerHTML = ''
        __targ.append(res)
      })
    }
  }).resolve()
})
