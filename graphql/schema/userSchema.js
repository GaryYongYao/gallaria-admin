const userSchema = `
type User {
  _id: ID!
  email: String!
  token: String!
}
input UserInput {
  email: String!
  password: String!
  confirm: String!
}
`

const userQuery = `
login(email: String!, password: String!): User
verifyToken(token: String!): User
`

const userMutation = `
createUser(userInput: UserInput): User
`

module.exports = {
  userSchema,
  userQuery,
  userMutation
}