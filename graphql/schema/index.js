const { buildSchema } = require('graphql')
const { categoriesSchema, categoriesQuery, categoriesMutation } = require('./categoriesSchema')
const { enquirySchema, enquiryQuery, enquiryMutation } = require('./enquiriesSchema')
const { featureSchema, featureQuery, featureMutation } = require('./featureSchema')
const { highlighCatSchema, highlighCatQuery, highlighCatMutation } = require('./highlighCatSchema')
const { highlighProductSchema, highlighProductQuery, highlighProductMutation } = require('./highlightProductSchema')
const { leadSchema, leadQuery, leadMutation } = require('./leadSchema')
const { locationSchema, locationQuery, locationMutation } = require('./locationSchema')
const { productsSchema, productsQuery, productsMutation } = require('./productsSchema')
const { projectSchema, projectQuery, projectMutation } = require('./projectsSchema')
const { userSchema, userQuery, userMutation } = require('./userSchema')

module.exports = buildSchema(`
${categoriesSchema}
${enquirySchema}
${featureSchema}
${highlighCatSchema}
${highlighProductSchema}
${leadSchema}
${locationSchema}
${productsSchema}
${projectSchema}
${userSchema}
type RootQuery {
  ${categoriesQuery}
  ${enquiryQuery}
  ${featureQuery}
  ${highlighCatQuery}
  ${highlighProductQuery}
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
  ${highlighCatMutation}
  ${highlighProductMutation}
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
