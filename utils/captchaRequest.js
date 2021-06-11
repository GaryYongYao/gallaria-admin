const axios = require('axios')
const keys = require('../keys')

module.exports = async (token = null) => {
  const perms = {
    url: `https://www.google.com/recaptcha/api/siteverify `,
    method: 'POST',
    responseType: 'json',
    params: {
      secret: keys.captchaKey,
      response: token
    }
  }

  const response = await axios(perms)

  return response
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
