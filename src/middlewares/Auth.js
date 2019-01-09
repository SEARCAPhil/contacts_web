import {Middleware} from '../mixins/middleware'
const Profiler = import('../mixins/profiler')

export default class{
  constructor () {
    this.error = 'Unauthenticated'
    return new Middleware().set('Auth', this.render)
  }

  async render () {
    const data = await Profiler.then(res => {
      this.data = (new res.default().get())
      return (typeof this.data.id === 'undefined') ?  0 : 1
    }).catch(error => { return 0 })
    
    return data
  }
}