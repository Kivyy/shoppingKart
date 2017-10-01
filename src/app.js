'user strict'
 import {createStore} from 'redux'

const reducer = (state = 0 , action) => {
  switch(action.type){
    case "INCREMENT":
    return state + action.payload;
    break;
  }

  return state
}
const store = createStore(reducer);

store.subscribe(() => {
  console.log('current state is:' + store.getState())
})
