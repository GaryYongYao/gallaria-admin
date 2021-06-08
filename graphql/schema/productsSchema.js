const productsSchema = `
type Product {
  _id: ID!
  code: String!
  name: String
  price: Float
  desc: String
  variants: [String]
  altCode: [String]
  category: ID
  sub: String
  series: String
  details: [ProductDetail]
  tags: [String]
  isFeature: Boolean
  forSale: Boolean
  file: [String]
  images: [String]
  primaryImage: String
  featureImage: String
  features: [String]
  isDraft: Boolean
  createdBy: ID
  updatedBy: ID
  createdDate: String
}
type ProductDetail {
  title: String
  info: String
}
input ProductDetailInput {
  title: String
  info: String
}
input ProductInput {
  code: String!
  name: String
  price: Float
  desc: String
  variants: [String]
  altCode: [String]
  category: ID
  sub: String
  series: String
  details: [ProductDetailInput]
  tags: [String]
  isFeature: Boolean
  forSale: Boolean
  file: [String]
  images: [String]
  primaryImage: String
  featureImage: String
  features: [String]
  isDraft: Boolean
  createdBy: ID!
  updatedBy: ID!
}
input ProductUpdate {
  _id: ID!
  code: String
  name: String
  price: Float
  desc: String
  variants: [String]
  altCode: [String]
  category: ID
  sub: String
  series: String
  details: [ProductDetailInput]
  tags: [String]
  isFeature: Boolean
  forSale: Boolean
  file: [String]
  images: [String]
  primaryImage: String
  featureImage: String
  features: [String]
  isDraft: Boolean
  deletedFiles:[String]
  updatedBy: ID!
}
`

const productsQuery = `
getAllProducts: [Product]
getProducts: [Product]
checkProductCode(_id: ID, code: String!): Boolean
getProductById(_id: ID!): Product
getProductByCode(code: String!): Product
getRecommendedProducts(code: String!): [Product]
getFeatureProducts: [Product]
`

const productsMutation = `
createProduct(productInput: ProductInput!): Product
editProduct(productUpdate: ProductUpdate!): Product
deleteProduct(_id: ID!): String
updateWebsite: String
`

module.exports = {
  productsSchema,
  productsQuery,
  productsMutation
}