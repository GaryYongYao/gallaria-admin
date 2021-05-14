const { buildSchema } = require('graphql')
const { productsSchema, productsQuery, productsMutation } = require('./productsSchema')
const { leadSchema, leadQuery, leadMutation } = require('./leadSchema')
const { locationSchema, locationQuery, locationMutation } = require('./locationSchema')
const { categoriesSchema, categoriesQuery, categoriesMutation } = require('./categoriesSchema')
const { userSchema, userQuery, userMutation } = require('./userSchema')

module.exports = buildSchema(`
${categoriesSchema}
${leadSchema}
${locationSchema}
${productsSchema}
${userSchema}
type RootQuery {
  ${categoriesQuery}
  ${leadQuery}
  ${locationQuery}
  ${productsQuery}
  ${userQuery}
}
type RootMutation {
  ${categoriesMutation}
  ${leadMutation}
  ${locationMutation}
  ${productsMutation}
  ${userMutation}
}
schema {
  query: RootQuery
  mutation: RootMutation
}
`)