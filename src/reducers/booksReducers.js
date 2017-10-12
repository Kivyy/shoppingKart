'use strict'

export function booksReducers(state = {books: [
  {
    _id: 1,
    title: 'this is the first book title',
    description: 'testing to see if store work',
    price: 3.50
  },
  {
    _id: 2,
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
      return book._id === parseInt(action.payload);
    })

    return {books: [...currentBookToDelete.slice(0,indexToDelete),...currentBookToDelete.slice(indexToDelete + 1)]}
    break;

    case "UPDATE_BOOK":
    const currentBookToUpdate = [...state.books]
    const indexToUpdate = currentBookToUpdate.findIndex((book) => {
      return book._id === action.payload._id
    })

    const newBookToUpdate = {
      ...currentBookToUpdate[indexToUpdate],
      title: action.payload.title
    }

    return {books: [...currentBookToUpdate.slice(0,indexToUpdate), newBookToUpdate,...currentBookToUpdate.slice(indexToUpdate + 1)]}
    break;
  }

  return state;
}
