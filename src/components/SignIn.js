import React, { Component } from 'react';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import withRouter from 'react-router-dom/withRouter';

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
        history.push(routes.HOME);
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
        </form>
        <button type='button' onClick={auth.doSignOut}>Sign Out</button>
      </div>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};