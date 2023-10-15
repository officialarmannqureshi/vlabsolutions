import './index.css';
import './styles/auth.css';
import './styles/login.css';
import './styles/admin.css';
import './styles/user.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

import App from './App.js';
import {AuthProvider} from './context/auth';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AuthProvider><BrowserRouter>

            <App />

            </BrowserRouter>
  </AuthProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
