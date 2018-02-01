import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './App.css';

import * as routes from '../constants/routes';
import { firebase } from '../firebase';

import HomePage from './Home';
import SignInPage from './SignIn';
import SignUpPage from './SignUp';

import withAuthentication from './withAuthentication';

const App = () =>
  <Router>
    <div>

      <Route 
        exact path={routes.SIGN_IN}
        component={() => <SignInPage />}
      />

      <Route
        exact path={routes.SIGN_UP}
        component={() => <SignUpPage />}
      />

      <Route 
        exact path ={routes.HOME}
        component={() => <HomePage />}
      />

    </div>
  </Router>

export default withAuthentication(App);
