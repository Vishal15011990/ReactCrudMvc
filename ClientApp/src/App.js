import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Navigation } from './components/NavigationMenu'
import { AddEmployee } from './components/AddEmployee'
import { FetchEmployee } from './components/FetchEmployee'
import ReactNotification from 'react-notifications-component';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;
  render () {
    return (
        <>
            <BrowserRouter>
                <div className="container">
                    <Navigation />
                    <ReactNotification/>
                    <Switch>
                        <Route path='/' component={FetchEmployee} exact />
                        <Route path='/Add' component={AddEmployee} />
                    </Switch>
                </div>
            </BrowserRouter>
            </>
    );
  }
}
