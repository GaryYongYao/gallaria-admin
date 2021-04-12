const { buildSchema } = require('graphql')
const { userSchema, userQuery, userMutation } = require('./userSchema')

module.exports = buildSchema(`
${userSchema}
type RootQuery {
  ${userQuery}
}
type RootMutation {
  ${userMutation}
}
schema {
  query: RootQuery
  mutation: RootMutation
}
`)