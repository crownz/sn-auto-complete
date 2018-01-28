import * as React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { configureStore } from '../services/store';
import routes from './routes';
import App from './app';

const store = configureStore(window.__REDUX_STATE__);

const rootApp = () => {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </Provider>
  );
};

hydrate(
  rootApp(),
  document.getElementById('root'),
);
