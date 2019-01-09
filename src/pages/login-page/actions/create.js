import AuthenticationContext from 'adal-angular'
import config from '../../../config/adal'


const URL = import('../../../utils/xhr')
const profiler = import('../../../mixins/profiler')

export default class {
  constructor(opt = {}){
    this.__opt = opt
    this.__config = config
    this.timestamp = new Date().getTime()
    this.xhr = {}
    return this.render()
	}
	
  async create (opt, headers) { 
    this.xhr  = new (await URL).default()
    return this.xhr.__postData(`contact/research`, opt, headers, false)
  }

  
  __load () { 
    const __proto__ = Object.assign({ __proto__: this.__proto__ }, this)
    window.ADAL.login()
  }

  userSignedIn (err, token) {
    if (!err) {
        window.ADAL.acquireToken("https://graph.microsoft.com", function (error, token) { 
            if(token.length) { 
              window.ADALUserCLass.getGraph(token)
            } else {
              window.ADALUserCLass.authError()
            }
        })
    }
  }

  loginOnPremise (data) { 
    profiler.then(res => {
      let setProfile = new res.default().set(data)
      window.location.reload()
    })
  }

  getGraph (token) { 
    fetch('https://graph.microsoft.com/beta/me/',{ 
        headers:{'Authorization':'Bearer '+token}, 
        method: 'GET'}
    ).then(response => response.json()).catch((err) => {
        alert('Oops Something went wrong. Please try again later')
    }).then(data => {
        // auth to onpremise
        if(data.id) { 
          window.ADALUserCLass.loginOnPremise(data)
        }
    })
  }
  


  bind () {
    const __proto__ = Object.assign({ __proto__: this.__proto__ }, this)
    this.__opt.root = this.__opt.root || document
    let targ = this.__opt.root.querySelector(this.__opt.target)

    // ADAL config
    // add callback to config
    this.__config.callback = this.userSignedIn.bind(__proto__)
    // adal global instance
    window.AuthenticationContext = AuthenticationContext
    window.ADAL = new window.AuthenticationContext(this.__config)  
    window.ADALUserCLass = this
    // adal cllback
    window.ADAL.handleWindowCallback()


    if(targ) targ.addEventListener('click', this.__load.bind(__proto__))


    
  }

  render () {
    this.bind()
    return this
  }

}