const { GraphQLUpload } = require('graphql-upload')
const authHandlers = require('./handlerGenerators/auth')
const categoriesHandlers = require('./handlerGenerators/categories')
const leadsHandlers = require('./handlerGenerators/leads')
const locationsHandlers = require('./handlerGenerators/locations')
const productHandlers = require('./handlerGenerators/products')

module.exports = {
  ...authHandlers,
  ...categoriesHandlers,
  ...leadsHandlers,
  ...locationsHandlers,
  ...productHandlers,
  Upload: GraphQLUpload
}
