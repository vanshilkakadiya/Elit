import {persistStore, persistReducer} from 'redux-persist';
import {combineReducers, createStore} from 'redux';
// import todoReducer from '../reducer/customerReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import productReducer from '../reducer/productReducer';
import customerReducer from '../reducer/customerReducer';
import productReducer from '../reducer/productReducer';
import invoiceReducer from '../reducer/invoiceReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const allReducer =combineReducers({
  customer:persistReducer(persistConfig, customerReducer),
  products:persistReducer(persistConfig, productReducer),
  invoice:persistReducer(persistConfig, invoiceReducer),
})
console.log(allReducer,"allReducerallReducerallReducerallReducerallReducer");

export const store = createStore(allReducer);
export const persistor = persistStore(store);

// const persistedReducer = persistReducer(persistConfig, todoReducer);
// 
// export const store = createStore(persistedReducer);
// export const persistor = persistStore(store);
