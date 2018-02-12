import React, { Component } from 'react';
import withRouter from 'react-router-dom/withRouter';

import { auth, db } from '../firebase';

import * as routes from '../constants/routes';

import { SignInLink } from './SignIn';


const SignUpPage = ({ history }) =>
  <div>
    <h3>Sign Up</h3>
    <SignUpForm history={history}/>
  </div>

const byPropName = (propName, value) => () => ({
  [propName]: value
});

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (e) => {
    const {
      email,
      username,
      passwordOne,
    } = this.state;

    const {
      history
    } = this.props;
    
    e.preventDefault();

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {

        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.INDEX);
          })
          .catch(error => {
            this.setState(byPropName('error', error));
          });

      })
      .catch(error => {
        this.setState(byPropName('error', error));
      });

  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const {
      history,
    } = this.props;

    const isInvalid =
      username === '' ||
      email === '' ||
      passwordOne === '' ||
      passwordOne !== passwordTwo;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            value={username}
            onChange={(e) => this.setState(byPropName('username', e.target.value))}
            placeholder='Username'
            type='text'
          />
          <input
            value={email}
            onChange={(e) => this.setState(byPropName('email', e.target.value))}
            placeholder='Email'
            type='text'
          />
          <input
            value={passwordOne}
            onChange={(e) => this.setState(byPropName('passwordOne', e.target.value))}
            placeholder='Password'
            type='password'
          />
          <input
            value={passwordTwo}
            onChange={(e) => this.setState(byPropName('passwordTwo', e.target.value))}
            placeholder='Password Confirmation'
            type='password'
          />
          <button type='submit' disabled={isInvalid}>Sign Up</button>

          {error && <p>{error.message}</p>}
        </form>
        <SignInLink history={history}><button>Sign In</button></SignInLink>
      </div>
    );
  }
}

const SignUpLink = ({ history, children }) =>
  <div onClick={() => history.push(routes.SIGN_UP)}>
    { children ? children : 'Sign In' }
  </div>

export default withRouter(SignUpPage);

export {
  SignUpLink,
};