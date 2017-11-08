'use strict'
import axios from 'axios';

export function getBooks(){
  return function(dispatch){
    axios.get('/api/books')
      .then((response) => {
        console.log(response.data);
        dispatch({type: 'GET_BOOKS' , payload: response.data})
      })
      .catch((err) => {
        dispatch({type: 'GET_BOOKS_REJECTED', payload: 'there was an error getting all the books'})
      })
  }
}

export function postBooks(book){
//change return method to return a function+dispatch , will be using redux-thunk middleware in main client file
  return function(dispatch){
    axios.post('/api/books', book)
      .then((response) => {
        dispatch({type:"POST_BOOK", payload: response.data})
      })
      .catch((err) => {
        dispatch({type:"POST_BOOK_REJECTED" , payload:"there was an error. "})
      })
  }
}

export function deleteBooks(id){
  console.log(id);
  return function(dispatch){
    axios.delete(`/api/books/${id}`)
      .then((response) => {
        dispatch({type: 'DELETE_BOOK', payload: id})
      })
      .catch((err) => {
        dispatch({type: 'DELETE_BOOK_REJECTED', payload: 'there was an error deleting the book.'})
      })
  }
}

export function updateBooks(book) {
  return {
    type: 'UPDATE_BOOK',
    payload: book
  }
}

export function resetButton() {
  return {
    type: 'RESET_BUTTON',
  }
}
