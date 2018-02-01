import React, { Component } from 'react';
import withRouter from 'react-router-dom/withRouter';

import { auth } from '../firebase';

import * as routes from '../constants/routes';


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
      passwordOne,
    } = this.state;

    const {
      history
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch((error) => {
        this.setState(byPropName('error', error))
      })

    e.preventDefault();
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      username === '' ||
      email === '' ||
      passwordOne === '' ||
      passwordOne !== passwordTwo;

    return (
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
    );
  }
}

export default withRouter(SignUpPage);