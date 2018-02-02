import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';

const styles = {

};


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
          Ho hoho
        </div>
      </Drawer>
    );
  }
}

MenuDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuDrawer);