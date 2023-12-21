import * as React from 'react';
import {Text} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/Redux/store/store';
import StackNav from './src/Navigation/StackNav/StackNav';
import { LogBox } from 'react-native';

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <StackNav />
      </PersistGate>
    </Provider>
  );
};

export default App;
