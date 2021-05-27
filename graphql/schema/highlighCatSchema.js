const highlighCatSchema = `
type CatHighlight {
  title: String
  subtitle: String
  cat: [CatHighlightItem]
}

type CatHighlightItem {
  photo: String
  id: Category
}

input CatHighlightInput {
  title: String
  subtitle: String
  cat: [CatHighlightItemInput]
}

input CatHighlightItemInput {
  photo: String
  id: String
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