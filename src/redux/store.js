
// import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import favReducer from './favoriteSlice';

// Data Persist Config
// const persistConfig = {
//   key: 'shoppingCart',
//   storage,
// }

// const persistedFavReducer = persistReducer(persistConfig, favReducer);


// Part2: Combine Reducers and Create a Store
export const store = configureStore({
   reducer: {
    favorite: favReducer,
   },
   devTools: process.env.NODE_ENV !== 'favorite',
//    middleware: [thunk]
 });

//  export store to global
export default store;

