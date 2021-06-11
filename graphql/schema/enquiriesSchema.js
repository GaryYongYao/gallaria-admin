const enquirySchema = `
type Enquiry {
  _id: ID
  name: String
  email: String
  phone: String
  company: String
  profile: String
  subject: String
  message: String
  products: [EnquiryProduct]
  read: Boolean
  replied: Boolean
  createdDate: String
}
type EnquiryProduct {
  info: Product
  quantity: Int
  variant: String
}
input EnquiryInput {
  name: String
  email: String
  phone: String
  company: String
  profile: String
  subject: String
  message: String
  products: [EnquiryProductInput]
  token: String
}
input EnquiryProductInput {
  info: ID
  quantity: Int
  variant: String
}
`

const enquiryQuery = `
getEnquiries: [Enquiry]
`

const enquiryMutation = `
submitEnquiry(enquiryInput: EnquiryInput!): String
readEnquiry(_id: ID!, read: Boolean!): String
repliedEnquiry(_id: ID!, replied: Boolean!): String
deleteEnquiry(_id: ID!): String
`

module.exports = {
  enquirySchema,
  enquiryQuery,
  enquiryMutation
}