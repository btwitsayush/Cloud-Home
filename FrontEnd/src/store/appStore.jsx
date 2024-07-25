import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.jsx'

const appStore= configureStore({
    reducer: {
        auth:authReducer
    },
  })


export default appStore;


// suposse appStore as a mall
// ans slices as a sub-shop inside the mall