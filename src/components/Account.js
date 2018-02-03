import React from 'react'

import { withRouter } from 'react-router-dom'

const AccountPage = () =>
  <div>Account Page</div>


export const AccountLink = withRouter(({ history, children }) => (
  <div onClick={() => {history.push('/account')}}>
    {children}
  </div>
));



export default AccountPage;
