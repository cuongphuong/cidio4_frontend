var redux = require('redux');
var reducer = require('./Reducers/Combine.js');

var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f // để extension redux trên chrome chạy được
));

module.exports = store;
