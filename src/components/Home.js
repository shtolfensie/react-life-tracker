import React, { Component } from 'react';
import withAuthorization from './withAuthorization';
import PropTypes from 'prop-types';

import { auth } from '../firebase';

const HomePage = (props, { authUser }) =>
  <div>
    <h3>Home sweet home.</h3>
    <p>{authUser && authUser.email + ' ' +authUser.displayName}</p>
    <button onClick={auth.doSignOut} type='button'>Sign Out</button>
    <button onClick={() => auth.doUpdateProfile({displayName: 'Marka', photoURL: ''})} type='button'>Update</button>
  </div>

HomePage.contextTypes = {
  authUser: PropTypes.object,
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);