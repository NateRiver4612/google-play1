import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import {store,persistor} from './redux/store'
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import {PersistGate} from 'redux-persist/integration/react';
import ScrollToTop from './component/scrollToTop/ScrollToTop.component'
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
        <PersistGate persistor={persistor}>
          <ScrollToTop/>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals()
