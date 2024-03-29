import { lowerCase, startCase } from 'lodash'

export const startCapital = text => startCase(lowerCase(text))

export const formatDate = (date, seperator = '/') => {
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()

  return `${twoDigit(day)}${seperator}${twoDigit(month + 1)}${seperator}${year}`
}

function twoDigit(num) {
  return (num < 10) ? `0${num}` : num
}

export const unique = (value, index, self) => self.indexOf(value) === index

export const mediaBaseURL = (window.location.hostname === 'gallaria-admin-prod.herokuapp.com' || window.location.hostname === 'admin.gallaria.com.au')
  ? 'https://storage.googleapis.com/gallaria-media/'
  : 'https://storage.googleapis.com/gallaria-dev-storage/'

export * from './customHooks'
