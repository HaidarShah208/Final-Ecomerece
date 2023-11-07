import { createSlice } from "@reduxjs/toolkit";


const initialState= JSON.parse(localStorage.getItem('cart')) ?? [];

export const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
      addToCart(state,action){    //for add to cart
        state.push(action.payload)
      },
      deleteFromCart(state,action){  //for delete to cart
        return state.filter(item => item.id != action.payload.id)
      }
    }
})


export const {addToCart,deleteFromCart}=cartSlice.actions;
export default cartSlice.reducer;