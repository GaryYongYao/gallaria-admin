const mongoose = require('mongoose')
const { Schema } = mongoose

const leadSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  replied: { type: Boolean, default: false },
  createdDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Leads', leadSchema)
