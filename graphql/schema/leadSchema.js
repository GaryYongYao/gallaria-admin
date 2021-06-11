const leadSchema = `
type Lead {
  _id: ID
  name: String
  email: String
  phone: String
  company: String
  message: String
  read: Boolean
  replied: Boolean
  createdDate: String
}
input LeadInput {
  name: String
  email: String
  phone: String
  company: String
  message: String
  token: String
}
`

const leadQuery = `
getLeads: [Lead]
`

const leadMutation = `
submitContact(leadInput: LeadInput!): String
readMessage(_id: ID!, read: Boolean!): String
replied(_id: ID!, replied: Boolean!): String
deleteLead(_id: ID!): String
`

module.exports = {
  leadSchema,
  leadQuery,
  leadMutation
}