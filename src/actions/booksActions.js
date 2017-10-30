'use strict'
import axios from 'axios';

export function getBooks(){
  return {
    type: 'GET_BOOKS'
  }
}

export function postBooks(book){

//change return method to return a function+dispatch , will be using redux-thunk middleware in main client file
  return function(dispatch){
    axios.post('/books', book)
      .then((response) => {
        dispatch({type:"POST_BOOK", payload: response.data})
      })
      .catch((err) => {
        dispatch({type:"POST_BOOK_REJECTED" , payload:"there was an error. "})
      })
  }
}

export function deleteBooks(_id){
  return {
    type: 'DELETE_BOOK',
    payload: _id
  }
}

export function updateBooks(book) {
  return {
    type: 'UPDATE_BOOK',
    payload: book
  }
}
