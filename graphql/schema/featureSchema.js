const featureSchema = `
type FeatureProducts {
  _id: ID
  product: Product
}
`

const featureQuery = `
getFeaturedAdmin: [FeatureProducts]
getFeatured: [Product]
getCarousel: [Product]
`

const featureMutation = `
addFeature(_id: ID!): String
deleteFeature(_id: ID!): String
`

module.exports = {
  featureSchema,
  featureQuery,
  featureMutation
}