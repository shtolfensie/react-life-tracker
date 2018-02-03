import React from 'react'
import { auth } from '../firebase'

const SignOut = ({ children }) =>
  <div onClick={auth.doSignOut}>{children ? children : 'Sign Out'}</div>

export default SignOut;