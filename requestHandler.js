'use strict'
import axios from 'axios'

function handleRender(req,res) {
  axios.get('http://localhost:3001/books')
    .then((response) => {
      let myHtml = JSON.stringify(response.data);
      res.render('index', {myHtml})
    })
    .catch((err) => {
      console.log('#Intial Server-side rendering error')
    })
}

module.exports = handleRender;
