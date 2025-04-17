//Name: Abhinav Ramesh
//UCID: ar2542
//Course Name: Advanced internet Applications
//Section Number: 452
//Assignment Name: Phase 4 Read Node.js Data using React.js Assignment
//Email Address: ar2542@njit.edu

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
