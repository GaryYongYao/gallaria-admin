const highlighProductSchema = `
type ProductHighlight {
  _id: ID
  title: String
  subtitle: String
  products: [Product]
}

input ProductHighlightInput {
  _id: ID
  title: String
  subtitle: String
  products: [ID]
}
`

const highlighProductQuery = `
getProductHighlight: [ProductHighlight]
`

const highlighProductMutation = `
createProductHighlight: String
updateProductHighlight(productHighlightInput: ProductHighlightInput): String
`

module.exports = {
  highlighProductSchema,
  highlighProductQuery,
  highlighProductMutation
}