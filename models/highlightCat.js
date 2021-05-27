const mongoose = require('mongoose')
const { Schema } = mongoose

const highlighCatSchema = new Schema({
  title: String,
  subtitle: String,
  cat: [{
    id: String,
    photo: String
  }]
})

module.exports = mongoose.model('HighlightCat', highlighCatSchema)
