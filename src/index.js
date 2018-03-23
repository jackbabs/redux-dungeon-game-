import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './app'
import store from './config/store'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('.container'));

// a thunk is a function that wraps an expression to delay its evaluation 

function incrementAsync(){
  return dispatch => {
    setTimeout(() => {
      dispatch(increment())
    }, 1000)
  }
}

export default store