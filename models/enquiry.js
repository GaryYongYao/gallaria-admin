const mongoose = require('mongoose')
const { Schema } = mongoose

const enquiriesSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String, required: true },
  profile: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  products: [{
    info: { type: Schema.Types.ObjectId , ref: 'Products' },
    quantity: { type: Number, default: 1, min: 1 },
    variant: String
  }],
  read: { type: Boolean, default: false },
  replied: { type: Boolean, default: false },
  createdDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Enquiries', enquiriesSchema)
