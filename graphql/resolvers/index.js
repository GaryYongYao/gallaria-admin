const { GraphQLUpload } = require('graphql-upload')
const authHandlers = require('./handlerGenerators/auth')
const categoriesHandlers = require('./handlerGenerators/categories')
const enquiryHandlers = require('./handlerGenerators/enquiry')
const featureHandlers = require('./handlerGenerators/feature')
const leadsHandlers = require('./handlerGenerators/leads')
const locationsHandlers = require('./handlerGenerators/locations')
const productHandlers = require('./handlerGenerators/products')
const projectHandlers = require('./handlerGenerators/projects')

module.exports = {
  ...authHandlers,
  ...categoriesHandlers,
  ...enquiryHandlers,
  ...featureHandlers,
  ...leadsHandlers,
  ...locationsHandlers,
  ...productHandlers,
  ...projectHandlers,
  Upload: GraphQLUpload
}
