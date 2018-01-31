import React from 'react';

import withAuthorization from './withAuthorization';

const HomePage = () =>
  <div>
    <h1>Home Page</h1>
    <h1>Home Page</h1>
    <h1>Home Page</h1>
    <h1>Home Page</h1>
    <h1>Home Page</h1>
    <h1>Home Page</h1>
    <h1>Home Page</h1>
    
  </div>

const authCondtition = (authUser) => !!authUser;

export default withAuthorization(authCondtition)(HomePage);