'use strict'

const express = require('express');
const app = express();
const patch = require('path');


app.use(express.static('public'))

app.get('/*', function(req, res){
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});


app.listen(3000,() =>  {
  console.log('server start')
})
