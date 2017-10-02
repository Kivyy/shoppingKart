'use strict'

export function booksReducers(state = {books: [
  {
    id: 1,
    title: 'this is the first book title',
    description: 'testing to see if store work',
    price: 3.50
  },
  {
    id: 2,
    title: 'this is the second book',
    description: 'not much this is seed data anyway',
    price: 4.50
  }
]} , action) {
  switch(action.type){
    case 'GET_BOOKS':
    return {...state, books: [...state.books] }
    break;

    case "POST_BOOK":
    return {books:[...state.books,...action.payload]}
    break;

    case "DELETE_BOOK":
    const currentBookToDelete = [...state.books]
    const indexToDelete = currentBookToDelete.findIndex((book) => {
      return book.id === action.payload.id
    })

    return {books: [...currentBookToDelete.slice(0,indexToDelete),...currentBookToDelete.slice(indexToDelete + 1)]}
    break;

    case "UPDATE_BOOK":

  }

  return state;
}
