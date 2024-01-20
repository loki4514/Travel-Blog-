import React from 'react'
import ReactDom from 'react-dom'
import  App from './App'
import {Provider} from 'react-redux'
import store from './store/store'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'

// import {createStore,applyMiddleware,compose} from 'redux'
// import {thunk} from 'redux-thunk'

// compose is used to coombine multiple function 
// const add1 = x => x + 1;
// const multiply2 = x => x * 2;
// const square = x => x * x;

// const composedFunction = compose(square, multiply2, add1);

// const result = composedFunction(3); // Output: square(multiply2(add1(3))) = square(multiply2(4)) = square(8) = 64
// console.log(result);

// applyMiddleware is a tool in Redux that 
// enables you to extend and customize how actions are handled before they impact the state in your application.

// import reducers from './reducers'


// const store = createStore(reducers, compose(applyMiddleware(thunk)))


ReactDom.render(
    <GoogleOAuthProvider clientId='282872334993-nd7f60uaf0hfnukni8q2b3eresn1v0r5.apps.googleusercontent.com'>
    <Provider store = {store}>
        <App />
    </Provider>
    </GoogleOAuthProvider>,
document.getElementById('root'))