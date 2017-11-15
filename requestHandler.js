'use strict'
import axios from 'axios';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {renderToString} from '/react-dom/server';
import {match, RouterContext} from 'react-router';

import reducers from './src/reducers/index';
import routes from './src/routes';
function handleRender(req,res) {
  axios.get('http://localhost:3001/books')
    .then((response) => {
      // create a redux store
      const store = createStore(reducers,{"books": {"books": response.data}} )
      // get initial state from store
      const initialState = JSON.stringify(store.getState()).replace(/<\/script/g,'<\\/script').replace(/<!--/g, '<\\!--');
      //implement router routing
      const Routes ={
        routes: routes,
        location: req.url
      }
      match(Routes, (error, redirect, props) =>{
        if(error){
          res.status(500).send('Error fullfilling the request');
        } else if (redirect) {
          res.static(302, redirect.pathname + redirect.search)
        } else if (props) {
          const reactComponent = renderToString(
            <Provider store={store}>
              
            </Provider>
          )
        }
      } )
    })
    .catch((err) => {
      console.log('#Intial Server-side rendering error')
    })
}

module.exports = handleRender;
