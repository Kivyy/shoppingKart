var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop')

var Books = require('./models/books');

app.post('/books' , (req,res) => {
  console.log(req.body)
  var book = req.body;

  Books.create(book, (err,returnBook) =>{
    if(err){
      throw err;
    }
    res.json(returnBook)
  })
});

app.get('/books', (req,res) => {
  Books.find((err,books) => {
    if(err){
      throw err
    }

    res.json(books)
  })
})

app.delete('/books/:_id', (req,res) => {
  let query = {_id: req.params._id};

  Books.remove(query,(err,result) => {
    if(err){
      throw err
    }
    res.json(result)
  })
})

app.put('/books/:_id', (req,res) => {
  let book = req.body;
  let query = req.params._id;

  let update = {
    '$set': {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  }

  let options = {new: true};

  Books.findOneAndUpdate(query,update,options, (err , books) => {
    if(err){
      throw err
    }

    res.json(books)
  })
})

app.listen(3001,(err) => {
  if(err){
    return console.log(err);
  }
  console.log('API server is listening to localhost:3001')
})
