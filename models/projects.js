const mongoose = require('mongoose')
const { Schema } = mongoose

const projectSchema = new Schema({
  name: String,
  location: String,
  type: String,
  date: String,
  desc: String,
  cover: String,
  photos: [String],
  isDraft: { type: Boolean, default: true },
  justCreated: { type: Boolean, default: true },
  products: [{ type: Schema.Types.ObjectId , ref: 'Products' }],
  createdBy: { type: Schema.Types.ObjectId , ref: 'User' },
  updatedBy: { type: Schema.Types.ObjectId , ref: 'User' },
  createdDate : { type: Date, default: Date.now }
})

module.exports = mongoose.model('Projects', projectSchema)
