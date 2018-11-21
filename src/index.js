import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import rootReducer from './reducers/index';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// create redux store
const store = createStore(rootReducer);

// use a special React Redux component called <Provider> to magically make the store available 
// to all container components in the application without passing it explicitly
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
serviceWorker.register();
