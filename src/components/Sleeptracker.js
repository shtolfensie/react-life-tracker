import React, { Component } from 'react'

import { db, firebase } from '../firebase'

import { withStyles } from 'material-ui/styles'

import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit,
  },
  paper: {
    padding: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
})


const byPropName = (propName, value) => () => ({
  [propName]: value
});

class SleepTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sleeping: false,
      authUser: null,
      error: null,
    };
  }

  componentWillMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  componentDidMount() {
    // read from firebase current status
  }

  handleSleep = () => {
    const {
      authUser
    } = this.state;
    this.setState({ sleeping: true })
    db.doCreateNight(authUser.uid)
      .then(() => {
        db.doChangeStatus(authUser.uid, true);
      })
      .catch(error => {
        this.setState(byPropName('error', error));
      });
  }

  handleWakeUp = () => {
    this.setState({ sleeping: false })
  }

  render() {
    const {
      classes
    } = this.props;

    const {
      sleeping,
      error,
    } = this.state;

    return (
      <div>
        <Grid container justify='center' className={classes.root}>
          <Grid item xs={11}>
          <Paper className={classes.paper}>
            {sleeping ? 'Sleepinig' : 'Awake'}
            <Grid container justify='center'>
              <Grid item xs={3}>
              <Button onClick={this.handleSleep} fullWidth className={classes.button} color='primary' raised>Go to sleep</Button>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={this.handleWakeUp} fullWidth className={classes.button} color='primary' raised>Wake up</Button>
              </Grid>
            </Grid>
          </Paper>
          </Grid>
        </Grid>
        {error && <p>{error.message}</p>}
      </div>
    )
  }
}

export default withStyles(styles)(SleepTracker);