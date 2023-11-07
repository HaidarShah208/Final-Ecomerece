import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
// import { devToolsEnhancer } from "@reduxjs/toolkit/dist/devtoolsExtension";


export const store=configureStore({
    reducer:{
     cart:cartSlice,
    },
    devTools:true
})