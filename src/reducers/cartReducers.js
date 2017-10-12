'use strict'

export function cartReducers(state = {cart: []}, action){
  switch(action.type){
    case('ADD_TO_CART'):
    return {cart: [...state,...action.payload,] , totalAmount: totals(action.payload).amount , totalQty: totals(action.payload).qty}
    break

    case('UPDATE_CART'):
    const currentCartToUpdate = [...state.cart]

    const indexToUpdate = currentCartToUpdate.findIndex((cart)=>{
      return cart._id === action._id;
    })

    const newCartToUpdate = {
      ...currentCartToUpdate[indexToUpdate], quantity: currentCartToUpdate[indexToUpdate].quantity + action.unit
    }

    let cartUpdate =  [...currentCartToUpdate.slice(0,indexToUpdate), newCartToUpdate, ...currentCartToUpdate.slice(indexToUpdate + 1 )]
    return {...state,cart: cartUpdate, totalAmount: totals(cartUpdate).amount,totalQty: totals(cartUpdate).qty}
    break

    case('DELETE_CART_ITEM'):
    return {cart: [...state,...action.payload],totalAmount: totals(action.payload).amount,totalQty: totals(action.payload).qty}
    break


  }

  return state
}

export function totals(payloadArr){
  const totalAmount = payloadArr.map((cartArr) => {
    return cartArr.price * cartArr.quantity;
  }).reduce((a,b) => {
    return a + b;
  },0)

  const totalQty = payloadArr.map((qty) => {
    return qty.quantity;
  }).reduce((a,b) => {
    return a + b
  },0)

  return {amount: totalAmount.toFixed(2), qty: totalQty}
}
