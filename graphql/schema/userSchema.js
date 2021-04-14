const userSchema = `
type User {
  _id: ID!
  username: String!
  token: String
  role: String
}
type UserDetail {
  _id: ID!
  username: String
  role: String!
  createdBy: ID
}
input UserInput {
  username: String
  role: String
  createdBy: ID
}
input UserUpdate {
  _id: ID!
  confirm: String
  role: String
}
`

const userQuery = `
getUsers: [UserDetail]
login(username: String!, password: String!): User
verifyToken(token: String!): User
`

const userMutation = `
createUser(userInput: UserInput): User
editUser(userInput: UserUpdate): String
changePassword(_id: ID!, password: String!, confirm: String!): String
deleteUser(_id: ID!): String
`

module.exports = {
  userSchema,
  userQuery,
  userMutation
}