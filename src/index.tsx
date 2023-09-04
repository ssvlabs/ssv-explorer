import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import App from '~app/App';
import { rootStore } from '~root/stores';
import * as serviceWorker from '~root/serviceWorker';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider stores={rootStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
