import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Delete from 'material-ui-icons/Delete'
import Edit from 'material-ui-icons/Edit'
import Save from 'material-ui-icons/Save'

import { withRouter } from 'react-router-dom'

import { firebase } from '../firebase'

import { doSaveAccountInfoToFirebse } from '../Utils/AccountSave';

const styles = theme => ({
  mainGrid: {
    flexGrow: 1,
    marginTop: theme.spacing.unit,
  },
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
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
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
        {authUser &&
          <Grid container className={classes.mainGrid} alignContent='space-around'>
            <Grid item xs={12}>
              <AccountInfo authUser={authUser} classes={classes}/>
            </Grid>
            <Grid item xs={12}>
              <AccountPassword authUser={authUser} classes={classes}/>
            </Grid>
            <Grid item xs={12}>
              <AccountDelete authUser={authUser} classes={classes}/>
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
      prevState: null,
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

  handleCancel = () => {
    const {
      prevState,
    } = this.state;
    this.setState({
      email: prevState.email,
      name: prevState.name,
    });
    this.setState({ edit: false });
  }

  handleEdit = () => {
    const {
      email,
      name,
    } = this.state;

    this.setState({ 
      prevState: {
        email,
        name,
      }
    });

    this.setState({ edit: true });
  }

  handleSave = () => {
    const {
      email,
      name,
    } = this.state;

    try {
      doSaveAccountInfoToFirebse(email, name);
    }
    catch(error) {
      alert('noooo');
    }

    this.setState({ edit: false });
    
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
                <Grid item xs={12} className={classes.item} justify='flex-end'>
                  { edit
                    ? <div>
                      <Button className={classes.button} disableRipple onClick={this.handleCancel}>
                        Cancel
                      </Button>
                      <Button className={classes.button} disableRipple onClick={this.handleSave}>
                        Save
                        <Save className={classes.rightIcon}/>
                      </Button>
                    </div>
                    : <Button className={classes.button} disableRipple onClick={this.handleEdit}>
                        Edit
                        <Edit className={classes.rightIcon}/>
                      </Button>
                  }
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
      password: '',
    };
  }

  render() {
    const {
      authUser,
      classes
    } = this.props;

    const {
      password
    } = this.state;

    return (
      <div>
        <Grid container className={classes.root} justify='space-around'>
          <Grid item xs={11}>
            <Paper className={classes.paper} >
              <Grid container className={classes.root}>
                <Grid item xs={12} className={classes.valueItem} alignItems='center' justify='space-between'>
                  <Typography type='subheading' gutterBottom>
                    {'Password: '}
                  </Typography>
                  <Button>Change password</Button>
                  <Button>Reset password</Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }

}

class AccountDelete extends Component {
  constructor(props) {
    super(props);
  };

  render() {

    const {
      classes
    } = this.props;
    return (
      <div>
        <Grid container className={classes.root} justify='space-around'>
          <Grid item xs={11}>
            <Paper className={classes.paper}>
              <Grid container className={classes.root}>
                <Grid item xs={12} className={classes.item} alignItems='center' justify='space-between'>
                  <Typography type='subheading'>
                    Delete Account:
                  </Typography>
                  <Button className={classes.button} raised color='secondary'>
                    Delete
                    <Delete className={classes.rightIcon}/>
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
