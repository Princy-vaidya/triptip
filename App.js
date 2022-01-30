import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './App/Utils/Navigation'
import {Provider} from 'react-redux';
import reduxStore from './App/Redux/reduxConfig'
const store = reduxStore()

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
    </Provider>
  );
};  

export default App;
