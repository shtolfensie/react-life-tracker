import React, { Component } from 'react';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import withRouter from 'react-router-dom/withRouter';

import { SignUpLink } from './SignUp';

const SignInPage = ({ history }) =>
  <div>
    <h3>Sign In:</h3>
    <SignInForm history={history}/>
  </div>


const byPropKey = (propName, value) => () => ({
  [propName]: value
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (e) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.INDEX);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    e.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const {
      history
    } = this.props;

    const isInvalid =
      email === '' ||
      password === '' ||
      password.length < 5;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input 
            value={email}
            placeholder='Email'
            type='text'
            onChange={event => this.setState(byPropKey('email', event.target.value))}
          />
          <input 
            value={password}
            placeholder='Password'
            type='password'
            onChange={event => this.setState(byPropKey('password', event.target.value))}
          />
          <button type='submit' disabled={isInvalid}>Submit</button>
          {error && <p>{error.message}</p>}
        </form>
        <button type='button' onClick={auth.doSignOut}>Sign Out</button>
        <SignUpLink history={history}><button>Sign Up</button></SignUpLink>
      </div>
    );
  }
}

const SignInLink = ({ history, children }) =>
  <div onClick={() => history.push(routes.SIGN_IN)}>
    { children ? children : 'Sign In' }
  </div>

export default withRouter(SignInPage);

export {
  SignInForm,
  SignInLink,
};