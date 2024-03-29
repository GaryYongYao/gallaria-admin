const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    unique : true,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32
  },
  role: {
    type: String,
    default: 'editor'
  },
  createdBy: { type: Schema.Types.ObjectId , ref: 'User' },
})

module.exports = mongoose.model('User', userSchema)