import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText} from 'material-ui/List';

import { Link } from 'react-router-dom'

const styles = theme => ({
});


class MenuDrawer extends Component {
  constructor(props){
    super(props);
  };

  render() {

    const {
      toggleDrawer,
      onClose,
      open,
    } = this.props;

    return (
      <Drawer
        open={open}
        onClose={onClose}
      >
        <div
          tabIndex={0}
          role='button'
          onClick={onClose}>
          <DrawerList />
        </div>
      </Drawer>
    );
  }
}

const DrawerList = () =>
  <List>
    <ListItem>
      <Button component={Link} to='/'>Home</Button>
    </ListItem>
    <ListItem>
      <Button component={Link} to='/sleep'>Sleep tracker</Button>
    </ListItem>
  </List>

MenuDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuDrawer);