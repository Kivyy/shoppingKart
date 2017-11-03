'user strict'
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute,browserHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk'
import reducers from "./reducers/index";
import {addToCart} from './actions/cartActions';
import {postBooks,deleteBooks,updateBooks} from './actions/booksActions';
import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';


const middleware = applyMiddleware(logger,thunk);
const store = createStore(reducers,middleware);


render(<Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Main}>
        <IndexRoute component={BooksList} />
        <Route path='/admin' component={BooksForm}/>
        <Route path='/cart' component={Cart}/>
      </Route>
    </Router>
  </Provider>
  ,document.getElementById('app')
);