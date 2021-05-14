const mongoose = require('mongoose')
const { Schema } = mongoose

const locationSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  website: String,
  position: [Number]
})

module.exports = mongoose.model('Locations', locationSchema)
