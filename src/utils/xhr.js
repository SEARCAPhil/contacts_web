import {URL} from '../config/api'

export default class {
  constructor(){
		this.timestamp = new Date().getTime()
	}

	__postData(url, body, headers = {}, isJson = true) {
		return new Promise((resolve, reject) => {
      fetch(`${URL.fullPath}${url}`,
      {
        method: 'POST',
        body: (isJson ? JSON.stringify(body) : body),
        headers,
      })
      .then(res => {
        resolve(res.json())
      })
    })
  
  }
  
  __deleteData(url, body, headers = {}, isJson = true) {
		return new Promise((resolve, reject) => {
      fetch(`${URL.fullPath}${url}`,
      {
        method: 'DELETE',
        body: (isJson ? JSON.stringify(body) : body),
        headers,
      })
      .then(res => {
        resolve(res.json())
      })
    })
  
	}

	__getData(url) {
		return new Promise((resolve, reject) => {
      fetch(`${URL.fullPath}${url}`,
      {
        method: 'GET',
      })
      .then(res => {
        resolve(res.json())
      })
    })

	}
	

  get () {
    return this.__getData('contact')
  }
}