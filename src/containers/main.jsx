import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Navigation from './navigation';
import Home from './home';
import Rss from './rss';

import GlobalAlert from '../components/globalAlert';


export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
          <BrowserRouter>
              <div className="main-container">
                  <Navigation />
                  <Switch>
                      <Route exact path='/' component={Home}/>
                      <Route exact path='/news/:year/:month/:day/:alias' component={Rss}/>
                      <Redirect to='/' />
                  </Switch>
                  <GlobalAlert />
              </div>
          </BrowserRouter>
      );
  }
}
