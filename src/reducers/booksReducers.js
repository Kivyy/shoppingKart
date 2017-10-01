'use strict'

export function booksReducers(state = {books: []} , action) {
  switch(action.type){
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
