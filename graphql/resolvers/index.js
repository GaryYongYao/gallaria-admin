const { GraphQLUpload } = require('graphql-upload')
const authHandlers = require('./handlerGenerators/auth')
const categoriesHandlers = require('./handlerGenerators/categories')
const enquiryHandlers = require('./handlerGenerators/enquiry')
const featureHandlers = require('./handlerGenerators/feature')
const highlightCatHandlers = require('./handlerGenerators/highlightCat')
const highlightProductHandlers = require('./handlerGenerators/highlightProduct')
const landingMediaHandlers = require('./handlerGenerators/landingMedia')
const leadsHandlers = require('./handlerGenerators/leads')
const locationsHandlers = require('./handlerGenerators/locations')
const mediaHandlers = require('./handlerGenerators/media')
const productHandlers = require('./handlerGenerators/products')
const projectHandlers = require('./handlerGenerators/projects')

module.exports = {
  ...authHandlers,
  ...categoriesHandlers,
  ...enquiryHandlers,
  ...featureHandlers,
  ...highlightCatHandlers,
  ...highlightProductHandlers,
  ...landingMediaHandlers,
  ...leadsHandlers,
  ...locationsHandlers,
  ...mediaHandlers,
  ...productHandlers,
  ...projectHandlers,
  Upload: GraphQLUpload
}
