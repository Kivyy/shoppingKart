'user strict'
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute , browserHistory, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import reducers from "./reducers/index";
import {addToCart} from './actions/cartActions';
import {postBooks,deleteBooks,updateBooks} from './actions/booksActions';
import Bookslist from './components/pages/booksList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';


const middleware = applyMiddleware(logger);
const store = createStore(reducers,middleware);

const Routes = (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={Main}>
        <IndexRoute component={Bookslist}/>
        <Route path='/admin' component={BooksForm}/>
        <Route path='/cart' component={Cart}/>
      </Route>
    </Router>
  </Provider>
)

render(Routes,document.getElementById('app'));
