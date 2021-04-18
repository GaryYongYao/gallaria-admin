const { buildSchema } = require('graphql')
const { userSchema, userQuery, userMutation } = require('./userSchema')
const { categoriesSchema, categoriesQuery, categoriesMutation } = require('./categoriesSchema')
const { productsSchema, productsQuery, productsMutation } = require('./productsSchema')

module.exports = buildSchema(`
${userSchema}
${productsSchema}
${categoriesSchema}
type RootQuery {
  ${userQuery}
  ${productsQuery}
  ${categoriesQuery}
}
type RootMutation {
  ${userMutation}
  ${productsMutation}
  ${categoriesMutation}
}
schema {
  query: RootQuery
  mutation: RootMutation
}
`)