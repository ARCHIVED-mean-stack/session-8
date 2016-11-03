var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.json())
app.use(express.static('static'))
var Post = require('./models/post')

app.get('/', function (req, res) {
  res.sendfile('./layouts/index.html')
})

app.post('/api/posts', function (req, res, next) {
  var post = new Post({
    label: req.body.label,
    value: req.body.value
  })
  post.save(function (err, post) {
    if (err) { return next(err) }
    res.json(201, post)
  })
})

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})

// curl -v -H "Content-Type: application/json" -XPOST --data "{\"label\":\"February\", \"value\":65}" localhost:3000/api/posts