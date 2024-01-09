import {persistStore, persistReducer} from 'redux-persist';
import {combineReducers, createStore} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
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


