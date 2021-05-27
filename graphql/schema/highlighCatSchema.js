const highlighCatSchema = `
type CatHighlight {
  _id: ID
  title: String
  subtitle: String
  cat: [String]
}

input CatHighlightInput {
  _id: ID
  title: String
  subtitle: String
  cat: [String]
}
`

const highlighCatQuery = `
getCatHighlight: [CatHighlight]
`

const highlighCatMutation = `
updateCatHighlight(catHighlightInput: CatHighlightInput): String
`

module.exports = {
  highlighCatSchema,
  highlighCatQuery,
  highlighCatMutation
}