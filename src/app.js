'user strict'
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import reducers from "./reducers/index";
import {addToCart} from './actions/cartActions';
import {postBooks,deleteBooks,updateBooks} from './actions/booksActions';
import Bookslist from './components/pages/booksList';

const middleware = applyMiddleware(logger);
const store = createStore(reducers,middleware);

render(
  <Provider store={store}>
    <Bookslist/>
  </Provider>
  ,document.getElementById('app')
);
