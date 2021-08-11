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
  token: String!
}
input EnquiryProductInput {
  info: ID
  quantity: Int
  variant: String
}
input PurchaseInput {
  email: String
  phone: String
  line_items: [LineItem]
}
input LineItem {
  price_data: PriceData
  quantity: Int
}
input PriceData {
  currency: String
  unit_amount: Int
  product_data: ProductData
}
input ProductData {
  images: [String]
  name: String
}
type SessionID {
  id: String
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
checkout(purchaseInput: PurchaseInput!): SessionID
`

module.exports = {
  enquirySchema,
  enquiryQuery,
  enquiryMutation
}