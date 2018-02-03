import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'

import { withRouter } from 'react-router-dom'

import { firebase } from '../firebase'
import { auth } from 'firebase';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  valueItem: {
    height: '70px',
    display: 'flex',
  },
  item: {
    display: 'flex',
  }
});

const byPropKey = (propName, value) => () => ({
  [propName]: value
});


class AccountPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      authUser: null,
    };

  }

  componentWillMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }
    
  render() {
    const {
      authUser,
    } = this.state;

    const {
      classes
    } = this.props;

    return (
      <div>
        <div>Account Page</div>
        {authUser &&
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              <AccountInfo authUser={authUser} classes={classes}/>
            </Grid>
            <Grid item xs={12}>
              <AccountPassword authUser={authUser} classes={classes}/>
            </Grid>
          </Grid>
        }
      </div>
    );
  }
};

class AccountInfo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      name: '',
      email: '',
      password: '',
    }
  }

  componentDidMount() {
    const {
      authUser
    } = this.props;

    this.setState({
      name: authUser.displayName,
      email: authUser.email,
    })
  }

  render() {
    const {
      authUser,
      classes
    } = this.props;

    const {
      edit,
      name,
      email
    } = this.state;

    return (
      <div>
        <Grid container className={classes.root} justify='space-around'>
          <Grid item xs={11}>
            <Paper className={classes.paper} >
              <Grid container className={classes.root}>
                <Grid item xs={12}>
                  <Typography type='display1' gutterBottom>
                    Account information:
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.valueItem} alignItems='center' justify='space-between'>
                  <Typography type='subheading' gutterBottom>
                    {'Display name: '}
                    { edit
                          ? <TextField
                              value={name}
                              onChange={event => this.setState(byPropKey('name', event.target.value))}
                              className={classes.textField}
                            />
                          : name }
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.valueItem} alignItems='center'>
                  <Typography type='subheading' gutterBottom>
                    {'Email: '}
                      { edit
                        ? <TextField
                            value={email}
                            onChange={event => this.setState(byPropKey('email', event.target.value))}
                            className={classes.textField}
                          />
                        : email}
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.valueItem} alignItems='center'>
                  <Typography type='subheading' gutterBottom>
                    {'Real name: '}
                      { edit
                        ? <TextField
                            value={email}
                            onChange={event => this.setState(byPropKey('email', event.target.value))}
                            className={classes.textField}
                          />
                        : email}
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.item} justify='flex-end'>
                  <Button onClick={() => this.setState({ edit: !edit })}>
                    Edit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }

}


class AccountPassword extends Component {

  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      name: '',
      email: '',
      password: '',
    }
  }

  componentDidMount() {
    const {
      authUser
    } = this.props;

    this.setState({
      name: authUser.displayName,
      email: authUser.email,
    })
  }

  render() {
    const {
      authUser,
      classes
    } = this.props;

    const {
      edit,
      name,
      email
    } = this.state;

    return (
      <div>
        <Grid container className={classes.root} justify='space-around'>
          <Grid item xs={11}>
            <Paper className={classes.paper} >
              <Grid container className={classes.root}>
                <Grid item xs={12}>
                  <Typography type='display1' gutterBottom>
                    Account information:
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.valueItem} alignItems='center' justify='space-between'>
                  <Typography type='subheading' gutterBottom>
                    {'Display name: '}
                    { edit
                          ? <TextField
                              value={name}
                              onChange={event => this.setState(byPropKey('name', event.target.value))}
                              className={classes.textField}
                            />
                          : name }
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.valueItem} alignItems='center'>
                  <Typography type='subheading' gutterBottom>
                    {'Email: '}
                      { edit
                        ? <TextField
                            value={email}
                            onChange={event => this.setState(byPropKey('email', event.target.value))}
                            className={classes.textField}
                          />
                        : email}
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.valueItem} alignItems='center'>
                  <Typography type='subheading' gutterBottom>
                    {'Real name: '}
                      { edit
                        ? <TextField
                            value={email}
                            onChange={event => this.setState(byPropKey('email', event.target.value))}
                            className={classes.textField}
                          />
                        : email}
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.item} justify='flex-end'>
                  <Button onClick={() => this.setState({ edit: !edit })}>
                    Edit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }

}

export const AccountLink = withRouter(({ history, children }) => (
  <div onClick={() => {history.push('/account')}}>
    {children}
  </div>
));



export default withStyles(styles)(AccountPage);
