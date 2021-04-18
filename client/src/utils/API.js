import axios from 'axios'

axios.defaults.baseURL = (process.env.NODE_ENV === 'production') ? '/' : 'http://localhost:5000/'

function APIRequest(type, url, data = null) {
  const promise = new Promise((resolve, reject) => {
    const perms = {
      url: `${url}`,
      method: `${type}`,
      responseType: 'json'
    }
    if (type !== 'GET' && data) {
      perms.data = data
    } else if (type === 'GET' && data) {
      perms.params = data
    }

    axios(perms)
      .then(successHandler(resolve, reject))
      .catch(errorHandler(resolve, reject))
  })
  return promise
}

function successHandler(resolve) {
  return (response) => {
    resolve(response)
  }
}

function errorHandler(resolve, reject) {
  return (error) => {
    reject(error)
  }
}

export default APIRequest
