import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import  App  from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import { AddEmployee } from './components/AddEmployee'
import { FetchEmployee } from './components/FetchEmployee'
import { EditEmployee } from './components/EditEmployee'
import { Login } from './components/Login'
import { Navigation } from './components/NavigationMenu';
import { LoginRoute } from './components/LoginRoute';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');


console.log(document.cookie)





ReactDOM.render(

    <div>
        {/*  <App />*/}
        
        <App />
        </div>
   
,
  rootElement);

registerServiceWorker();

