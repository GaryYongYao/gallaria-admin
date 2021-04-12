const userSchema = `
type User {
  _id: ID!
  username: String!
  token: String!
  role: String!
}
input UserInput {
  email: String!
  password: String!
  confirm: String!
}
`

const userQuery = `
login(username: String!, password: String!): User
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