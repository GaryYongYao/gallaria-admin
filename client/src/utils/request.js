import axios from 'axios'

function request(data = null) {
  const url = (process.env.NODE_ENV === 'production') ? '/graphql' : 'http://localhost:5000/graphql'

  const promise = new Promise((resolve, reject) => {
    const perms = {
      url,
      method: 'post',
      responseType: 'json',
      data: {
        query: data
      }
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

export default request
