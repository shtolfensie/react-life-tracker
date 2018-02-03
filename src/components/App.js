import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import * as routes from '../constants/routes';
import { firebase } from '../firebase';

import HomePage from './Home';
import SignInPage from './SignIn';
import SignUpPage from './SignUp';
import AccountPage from './Account';
import Topics from './Topics';
import IndexPage from './IndexPage';

import withAuthentication from './withAuthentication';

import 'typeface-roboto'

const App = () =>
  <Router>
    <div>
      <Switch>
        <Route 
          exact path={routes.SIGN_IN}
          component={() => <SignInPage />}
        />

        <Route
          exact path={routes.SIGN_UP}
          component={() => <SignUpPage />}
        />

        <Route 
          path={routes.INDEX}
          component={HomePage}
        />

        {/* <Route exact path={routes.INDEX} component={() => <IndexPage />}/> */}

        <Route path='/topics' component={Topics}/>

        <Route 
          component={() => <p>404</p>}
        />
      </Switch>
    </div>
  </Router>

export default withAuthentication(App);
