'user strict'
import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import reducers from "./reducers/index"
import {addToCart} from './actions/cartActions'
import {postBooks,deleteBooks,updateBooks} from './actions/booksActions'

const middleware = applyMiddleware(logger);
const store = createStore(reducers,middleware);

store.dispatch(postBooks([{
  id: 1,
  title: 'working redux skeleton'
}]))
