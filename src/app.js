'user strict'
import {createStore} from 'redux'
import reducers from "./reducers/index"
import {addToCart} from './actions/cartActions'
import {postBooks,deleteBooks,updateBooks} from './actions/booksActions'

const store = createStore(reducers);

store.subscribe(() => {
  console.log('current state is:', store.getState())
})

store.dispatch(postBooks([{
  id: 1,
  title: 'very nice book',
  description: 'cool'
}]))

store.dispatch(addToCart([{
  id: 1
}]))


store.dispatch(deleteBooks({id:1}))
