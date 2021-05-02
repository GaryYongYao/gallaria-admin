const categoriesSchema = `
type Category {
  _id: ID!
  name: String!
  sub: [String]
  series: [Series]
  createdBy: ID
  updatedBy: ID
}
type CategoryOption {
  _id: ID!
  name: String!
}
type SubCategoryAndSeries {
  sub: String
  series: [String]
}
type Series {
  sub: String
  name: String
}
input CategoryInput {
  name: String!
  sub: [String]
  series: [SeriesInput]
  createdBy: ID!
  updatedBy: ID!
}
input CategoryUpdate {
  _id: ID!
  name: String!
  sub: [String]
  series: [SeriesInput]
  updatedBy: ID!
}
input SeriesInput {
  sub: String
  name: String
}
`

const categoriesQuery = `
getCategories: [Category]
getCategoriesOption: [CategoryOption]
getSubCategoriesOption(_id: ID!): [SubCategoryAndSeries]
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