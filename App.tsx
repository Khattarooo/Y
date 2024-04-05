import React from 'react';
import store from './src/Redux/store';
import Navigation from './src/Navigation/Navigation';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
