import React from 'react';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from 'components/App';
import configureStore from 'store/configureStore';

import 'styles/main.scss';

import 'react-notifications/lib/notifications.css';
import "./web.config";

render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
);
