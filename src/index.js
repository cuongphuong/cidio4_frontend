import App from './Components/App/App';
import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';

//import template
import './styles/template/icons-style/materialdesignicons.css';
import './assets/styles/app.css';
import './styles/app.css';

var { Provider } = require('react-redux');
var store = require('./store');

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
