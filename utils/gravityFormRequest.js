const axios = require('axios')
const keys = require('../keys')

axios.defaults.baseURL = 'https://www.mamoliving.com.au/wp-json/gf/v2/'

module.exports = (type, url, data = null) => {
  const promise = new Promise((resolve, reject) => {
    const perms = {
      url: `${url}`,
      method: `${type}`,
      responseType: 'json',
      auth: {
        username: keys.gravityUser,
        password: keys.gravityPassword
      }
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
