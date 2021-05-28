const mongoose = require('mongoose')
const { Schema } = mongoose

const highlighCatSchema = new Schema({
  title: String,
  subtitle: String,
  products: [{ type: Schema.Types.ObjectId , ref: 'Products' }]
})

module.exports = mongoose.model('HighlightProduct', highlighCatSchema)
