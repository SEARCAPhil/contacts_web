import {URL} from '../../config/app'

const Navigo = import('navigo')

const loadProfileSection = () => {
  const __page = import('../../pages/profile-section').default
  const __targ = document.querySelector('.ajax-main-section')

}

Navigo.then(routerClass => {
  const router = new routerClass.default(URL.fullPath, true)
  router.on({
    '' : () => { },
    '/account/:id/profile' : async (params) => {
      console.log('profile')
      const __profilePage = (await import('../../pages/profile-section')).default
      return new __profilePage().then(res => {
        const __targ = document.querySelector('.ajax-main-section')
        __targ.innerHTML = ''
        __targ.append(res)
      })
    },
    '/contacts' : async (params) => {
      console.log('profile')
      const __profilePage = (await import('../../pages/contacts-section')).default
      return new __profilePage().then(res => {
        const __targ = document.querySelector('.ajax-main-section')
        __targ.innerHTML = ''
        __targ.append(res)
      })
    },
  }).resolve()
})
