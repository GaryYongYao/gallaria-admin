const mongoose = require('mongoose')
const { Schema } = mongoose

const productCategoriesSchema = new Schema({
  name: {
    type: String,
    unique : true,
    required: true
  },
  baseShipping: Number,
  shipping: Number,
  sub: [String],
  series: [{
    sub: String,
    name: String
  }],
  createdBy: { type: Schema.Types.ObjectId , ref: 'User' },
  updatedBy: { type: Schema.Types.ObjectId , ref: 'User' }
})

module.exports = mongoose.model('ProductCategories', productCategoriesSchema)
