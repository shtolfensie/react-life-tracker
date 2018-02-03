import React from 'react'
import { Redirect } from 'react-router-dom';

import withAuthorization from './withAuthorization'

import * as routes from '../constants/routes'

const IndexPage = () =>
  <div>
    <Redirect to={routes.HOME}/>
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(IndexPage);

