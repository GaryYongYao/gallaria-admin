const categoriesSchema = `
type Category {
  _id: ID!
  name: String!
  sub: [String]
  createdBy: ID
  updatedBy: ID
}
type CategoryOption {
  _id: ID!
  name: String!
}
input CategoryInput {
  name: String!
  sub: [String]
  createdBy: ID!
  updatedBy: ID!
}
input CategoryUpdate {
  _id: ID!
  name: String!
  sub: [String]
  updatedBy: ID!
}
`

const categoriesQuery = `
getCategories: [Category]
getCategoriesOption: [CategoryOption]
getSubCategoriesOption(_id: ID!): [String]
`

const categoriesMutation = `
createCategory(categoryInput: CategoryInput!): Category
editCategory(categoryUpdate: CategoryUpdate!): String
deleteCategory(_id: ID!): String
`

module.exports = {
  categoriesSchema,
  categoriesQuery,
  categoriesMutation
}