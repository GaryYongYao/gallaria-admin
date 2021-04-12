const mongoose = require('mongoose')
const { Schema } = mongoose

const reminderSchema = new Schema({
  policy: String,
  name: String,
  phone: String,
  car: String,
  duedate: String,
  Nduedate: String,
  created: { type: Date, default: Date.now },
  update: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId , ref: 'User' }
})

module.exports = mongoose.model('Reminders', reminderSchema)