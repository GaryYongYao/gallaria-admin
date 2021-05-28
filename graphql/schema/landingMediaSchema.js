const landingMediaSchema = `
type LandingMedia {
  _id: ID
  media: String
}

input LandingMediaInput {
  _id: ID
  media: String
}
`

const landingMediaQuery = `
getLandingMedia: [LandingMedia]
`

const landingMediaMutation = `
updateLandingMedia(landingMediaInput: LandingMediaInput): String
`

module.exports = {
  landingMediaSchema,
  landingMediaQuery,
  landingMediaMutation
}