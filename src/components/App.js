import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from './Navigation';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AccountPage from './Account';

import * as routes from '../constants/routes';

import withAuthentication from './withAuthentication';

// MaterialUI imports
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import 'typeface-roboto';

const App = () =>
      <Router>
        <div>
          <Navigation />

          <hr/>
          
          <Typography>
          <Route
            exact path={routes.LANDING}
            component={() => <LandingPage />}
          />
          <Route
            exact path={routes.SIGN_UP}
            component={() => <SignUpPage />}
          />
          <Route
            exact path={routes.SIGN_IN}
            component={() => <SignInPage />}
          />
          <Route
            exact path={routes.PASSWORD_FORGET}
            component={() => <PasswordForgetPage />}
          />
          <Route
            exact path={routes.HOME}
            component={() => <HomePage />}
          />
          <Route
            exact path={routes.ACCOUNT}
            component={() => <AccountPage />}
          />
          </Typography>

          <Button raised color="primary">
            Hello World
          </Button>
          <Typography type="display4" gutterBottom>
            Display 4
        </Typography>
        </div>
      </Router>

export default withAuthentication(App);
