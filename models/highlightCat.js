const mongoose = require('mongoose')
const { Schema } = mongoose

const highlighCatSchema = new Schema({
  title: String,
  subtitle: String,
  cat: [ String ]
})

module.exports = mongoose.model('HighlightCat', highlighCatSchema)
