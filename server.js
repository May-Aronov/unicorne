var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const SERVER_PORT = 8080;

mongoose.connect('mongodb://localhost/UnicornsDB', function() {
  console.log("DB connection established!!!");
})

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let UniSchema = new mongoose.Schema({
    Name: String,
    Magic:String
});

let Unicorn = mongoose.model('unicorn', UniSchema);

app.get('/unicorns', function (req, res) {
  Unicorn.find({}, function (err, unicorns) {
    if (err) {
      res.status(500).send(err);
    }
    res.send(unicorns);
  })
});

app.post('/unicorns',function (req,res) {
  let unicorn= new Unicorn(req.body)
  unicorn.save(function(err,unicorni){
      if(err){
          res.status(500).send(err)
      }
      else {
        res.status(201).send(unicorni);
      }
  })
})

app.delete('/unicorns/:id', function (req, res) {
  let unicornId = req.params.id
  Unicorn.findByIdAndRemove({ _id: unicornId }, function (err) {
    if (err) { res.status(500).send(err) }
    else { res.status(204).send() }
  })
});

app.listen(SERVER_PORT, () => {
    console.log("Server started on port " + SERVER_PORT);
  });