const { buildSchema } = require('graphql')
const { productsSchema, productsQuery, productsMutation } = require('./productsSchema')
const { leadSchema, leadQuery, leadMutation } = require('./leadSchema')
const { categoriesSchema, categoriesQuery, categoriesMutation } = require('./categoriesSchema')
const { userSchema, userQuery, userMutation } = require('./userSchema')

module.exports = buildSchema(`
${categoriesSchema}
${leadSchema}
${productsSchema}
${userSchema}
type RootQuery {
  ${categoriesQuery}
  ${leadQuery}
  ${productsQuery}
  ${userQuery}
}
type RootMutation {
  ${categoriesMutation}
  ${leadMutation}
  ${productsMutation}
  ${userMutation}
}
schema {
  query: RootQuery
  mutation: RootMutation
}
`)