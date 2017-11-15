'user strict'
import React from 'react';
import {render} from 'react-dom';
//React-router
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute,browserHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk'
//combine reducer
import reducers from "./reducers/index";
//redux action
import {addToCart} from './actions/cartActions';
//

import routes from './routes'

const middleware = applyMiddleware(logger,thunk);
//initial state
const initialState = window.INITIAL_STATE;
const store = createStore(reducers,initialState,middleware);


render(<Provider store={store}>
  {routes}
  </Provider>
  ,document.getElementById('app')
);
