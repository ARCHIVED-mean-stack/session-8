var db = require('../db')
var Post = db.model('Post', {
  label:    { type: String, required: true },
  value:    { type: Number, required: true },
  date:     { type: Date, required: true, default: Date.now }
})
module.exports = Post