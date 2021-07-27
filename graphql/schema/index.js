const { buildSchema } = require('graphql')
const { categoriesSchema, categoriesQuery, categoriesMutation } = require('./categoriesSchema')
const { enquirySchema, enquiryQuery, enquiryMutation } = require('./enquiriesSchema')
const { featureSchema, featureQuery, featureMutation } = require('./featureSchema')
const { highlighCatSchema, highlighCatQuery, highlighCatMutation } = require('./highlighCatSchema')
const { highlighProductSchema, highlighProductQuery, highlighProductMutation } = require('./highlightProductSchema')
const { landingMediaSchema, landingMediaQuery, landingMediaMutation } = require('./landingMediaSchema')
const { leadSchema, leadQuery, leadMutation } = require('./leadSchema')
const { locationSchema, locationQuery, locationMutation } = require('./locationSchema')
const { mediaQuery } = require('./mediaSchema')
const { productsSchema, productsQuery, productsMutation } = require('./productsSchema')
const { projectSchema, projectQuery, projectMutation } = require('./projectsSchema')
const { userSchema, userQuery, userMutation } = require('./userSchema')

module.exports = buildSchema(`
${categoriesSchema}
${enquirySchema}
${featureSchema}
${highlighCatSchema}
${highlighProductSchema}
${landingMediaSchema}
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
  ${landingMediaQuery}
  ${leadQuery}
  ${locationQuery}
  ${mediaQuery}
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
  ${landingMediaMutation}
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
