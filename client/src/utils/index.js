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

export * from './customHooks'
