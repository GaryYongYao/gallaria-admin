const { buildSchema } = require('graphql')
const { categoriesSchema, categoriesQuery, categoriesMutation } = require('./categoriesSchema')
const { enquirySchema, enquiryQuery, enquiryMutation } = require('./enquiriesSchema')
const { featureSchema, featureQuery, featureMutation } = require('./featureSchema')
const { leadSchema, leadQuery, leadMutation } = require('./leadSchema')
const { locationSchema, locationQuery, locationMutation } = require('./locationSchema')
const { productsSchema, productsQuery, productsMutation } = require('./productsSchema')
const { projectSchema, projectQuery, projectMutation } = require('./projectsSchema')
const { userSchema, userQuery, userMutation } = require('./userSchema')

module.exports = buildSchema(`
${categoriesSchema}
${enquirySchema}
${featureSchema}
${leadSchema}
${locationSchema}
${productsSchema}
${projectSchema}
${userSchema}
type RootQuery {
  ${categoriesQuery}
  ${enquiryQuery}
  ${featureQuery}
  ${leadQuery}
  ${locationQuery}
  ${productsQuery}
  ${projectQuery}
  ${userQuery}
}
type RootMutation {
  ${categoriesMutation}
  ${enquiryMutation}
  ${featureMutation}
  ${leadMutation}
  ${locationMutation}
  ${productsMutation}
  ${projectMutation}
  ${userMutation}
}
schema {
  query: RootQuery
  mutation: RootMutation
}
`)
