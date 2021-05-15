const locationSchema = `
type Location {
  _id: ID!
  name: String
  address: String
  phone: String
  website: String
  position: [Float]
}
input LocationInput {
  name: String!
  address: String!
  phone: String!
  website: String
  position: [Float]!
}
input LocationUpdate {
  _id: ID!
  name: String!
  address: String!
  phone: String!
  website: String
  position: [Float]!
}
`

const locationQuery = `
getLocations: [Location]
getLocationById(_id: ID!): Location
`

const locationMutation = `
createLocation(locationInput: LocationInput!): Location
editLocation(locationUpdate: LocationUpdate!): Location
deleteLocation(_id: ID!): String
`

module.exports = {
  locationSchema,
  locationQuery,
  locationMutation
}