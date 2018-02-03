import React, { Component } from 'react';
import {
  Route
} from 'react-router-dom';
import withAuthorization from './withAuthorization';
import PropTypes from 'prop-types';

import { auth } from '../firebase';

import * as routes from '../constants/routes'

import AppBar from './AppBar';

import AccountPage from './Account';
import FourOFourPage from './FourOFour';

const HomePage = ({ match }, { authUser }) =>
  <div>
    <AppBar />

    <Route exact path={match.url} render={() => (
      <div>
        <h3>Home sweet home.</h3>
        <p>{authUser && authUser.email}</p>
        <p>{authUser.displayName && authUser.displayName}</p>
        <button onClick={auth.doSignOut} type='button'>Sign Out</button>
        <button onClick={() => auth.doUpdateProfile({displayName: 'Mark', photoURL: ''})} type='button'>Update</button>
      </div>
    )}/>
    <Route path={`${routes.INDEX}:section`} component={Section}/>

  </div>

class Section extends Component {

  components = {
    '404': FourOFourPage,
    account: AccountPage,
    appbar: AppBar,
  }

  getComponentName = () => {
    const {
      match
    } = this.props;

    if (this.components[match.params.section]){
      return this.components[match.params.section];
    }
    else {
      return this.components['404'];
    }
  }

  render() {
    const CompName = this.getComponentName();
    return <CompName />
  }
}

HomePage.contextTypes = {
  authUser: PropTypes.object,
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);