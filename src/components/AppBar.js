import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';
import FormGroup from 'material-ui/Form/FormGroup';

import MenuDrawer from './MenuDrawer';



const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      drawerOpen: false,
    }
  };

  toggleDrawer = () => {
    const prevState = this.state;

    this.setState({
      drawerOpen: !prevState.drawerOpen,
    });
  };

  onDrawerClose = () => {
    this.setState({
      drawerOpen: false,
    });
  }

  handleMenu = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
 
  render() {

    const {
      classes
    } = this.props;

    const {
      anchorEl,
      drawerOpen,
    } = this.state;

    let open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <MenuDrawer open={drawerOpen} toggleDrawer={this.toggleDrawer} onClose={this.onDrawerClose}/>
        <AppBar position='static'>
          <Toolbar>
            <IconButton onClick={this.toggleDrawer} className={classes.menuButton} color='inherit'>
              <MenuIcon />
            </IconButton>
            <Typography type='title' color='inherit' className={classes.flex}>Title</Typography>
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup='true'
                onClick={this.handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>Account Settings</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MenuAppBar);