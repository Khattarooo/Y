import React from 'react';
import store from './src/Redux/store';
import Navigation from './src/Navigation/Navigation';
import {Provider} from 'react-redux';
import {ToastProvider} from 'react-native-toast-notifications';

const App = () => {
  return (
    <Provider store={store}>
      <ToastProvider
        placement="top"
        duration={1000}
        successColor="green"
        dangerColor="red">
        <Navigation />
      </ToastProvider>
    </Provider>
  );
};

export default App;
