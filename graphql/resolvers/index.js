const { GraphQLUpload } = require('graphql-upload')
const authHandlers = require('./handlerGenerators/auth')
const categoriesHandlers = require('./handlerGenerators/categories')
const productHandlers = require('./handlerGenerators/products')

module.exports = {
  ...authHandlers,
  ...categoriesHandlers,
  ...productHandlers,
  Upload: GraphQLUpload
}
