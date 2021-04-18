const mongoose = require('mongoose')
const { Schema } = mongoose

const productsSchema = new Schema({
  code: {
    type: String,
    unique : true,
    required: true
  },
  name: String,
  price: Number,
  desc: String,
  variants: [String],
  category: { type: Schema.Types.ObjectId , ref: 'ProductCategories' },
  sub: String,
  details: [{
    title: String,
    info: String
  }],
  tags: [String],
  isFeature: Boolean,
  forSale: Boolean,
  file: String,
  images: [String],
  primaryImage: String,
  isDraft: Boolean,
  createdBy: { type: Schema.Types.ObjectId , ref: 'User' },
  updatedBy: { type: Schema.Types.ObjectId , ref: 'User' }
})

module.exports = mongoose.model('Products', productsSchema)
