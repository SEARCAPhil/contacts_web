const URL = import('../../../utils/xhr')

export default class {
  constructor(){
    this.timestamp = new Date().getTime()
    this.xhr = {}
	}
	
  async get () { this.xhr  = new (await URL).default()
    return this.xhr.__getData('contact')
  }
}