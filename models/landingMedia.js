const mongoose = require('mongoose')
const { Schema } = mongoose

const landingMediaSchema = new Schema({
  media: String
})

module.exports = mongoose.model('LandingMedia', landingMediaSchema)
