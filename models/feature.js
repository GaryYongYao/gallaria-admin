const mongoose = require('mongoose')
const { Schema } = mongoose

const featureSchema = new Schema({
  product: { type: Schema.Types.ObjectId , ref: 'Products' }
})

module.exports = mongoose.model('Featured', featureSchema)
