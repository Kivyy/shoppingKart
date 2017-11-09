'use strict'
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

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

var db = mongoose.connection;
db.on('error' , console.error.bind(console, '# MongoDB - connection error'));

// setting session
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2},
  store: new MongoStore({mongooseConnection: db , ttl: 2 * 24 * 60 })
}));
// save session cart to backend api+mongod
app.post('/cart' , (req,res) => {
  var cart = req.body;
  req.session.cart = cart;
  req.session.save((err) => {
    if(err){
      console.log('API ERROR')
    }
    res.json(req.session.cart);
  })
});

app.get('/cart', (req,res) => {
  if(typeof req.session.cart !== 'undefined'){
    res.json(req.session.cart);
  }
});

var Books = require('./models/books');

app.post('/books' , (req,res) => {
  console.log(req.body)
  var book = req.body;

  Books.create(book, (err,returnBook) =>{
    if(err){
      console.log('API ERROR');
    }
    res.json(returnBook)
  })
});

app.get('/books', (req,res) => {
  Books.find((err,books) => {
    if(err){
      console.log('API ERROR')
    }

    res.json(books)
  })
})

app.delete('/books/:_id', (req,res) => {
  let query = {_id: req.params._id};

  Books.remove(query,(err,result) => {
    if(err){
      console.log('API ERROR')
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
      console.log('API ERROR')
    }

    res.json(books)
  })
})

// -->> Images APIs
app.get('/images', (req,res) => {
  const imgFolder = __dirname + '/public/images/';
  const fs = require('fs');

  fs.readdir(imgFolder, (err,files) => {
    if(err){
      return console.error(err);
    }
    const filesArr = [];
    files.forEach((file) => {
      filesArr.push({name: file});
    })
    res.json(filesArr);
  })
})

app.listen(3001,(err) => {
  if(err){
    return console.log(err);
  }
  console.log('API server is listening to localhost:3001')
})
