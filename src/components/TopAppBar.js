import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';

import TemporaryDrawer from './MenuDrawer';
import SignOutButton from './SignOut';
import { SignInLink } from './SignIn';

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

class TopAppBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            drawerOpen: false,
            mounted: true,
        };
    };

    // componentDidMount() {
    //     this.setState({ mounted: true });
    // }

    // componentWillReceiveProps() {
    //     let isAuth = this.props.authUser !== null;
    //     this.setState({ mounted: isAuth });
    //     // alert(2);
    // }

    handleDrawer = (isOpen) => {
        this.setState({ drawerOpen: isOpen });
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose =  () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes, authUser } = this.props;
        const { anchorEl, drawerOpen, mounted } = this.state;
        const open = Boolean(anchorEl);
        const auth = Boolean(authUser);

        return (
            <div className={classes.root}>
                <TemporaryDrawer  open={drawerOpen} handleDrawer={this.handleDrawer}/>
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton className={classes.IconButton} color='inherit' aria-label='Menu'>
                            <MenuIcon onClick={() => this.handleDrawer(true)}/>
                        </IconButton>
                        <Typography type='title' color='inherit' className={classes.flex}>
                            Life Tracker
                        </Typography>
                        {mounted
                            ? (
                                <div>
                                    {authUser
                            ? (
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbat' : null}
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
                                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                    <MenuItem onClick={this.handleClose}><SignOutButton /></MenuItem>
                                </Menu>
                            </div>
                            )

                            : (
                                <div>
                                    <Button color='inherit'><SignInLink /></Button>
                                    
                                </div>
                            )
                        }
                                </div>
                            )
                            : (
                                <div></div>
                            )
                        }
                        
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

TopAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopAppBar);