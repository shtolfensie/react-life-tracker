import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';

const styles = {
    list: {
        width: 250,
    },
    listFull: {
        width: 'auto',
    },
};

class TemporaryDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    };

    toggleDrawer = (isOpen) => {
        this.setState({
            open: isOpen
        });
    };

    render() {
        const { classes, open, handleDrawer } = this.props;

        const sideList = (
            <div className={classes.list}>
                <List>
                    Something
                </List>
                <Divider />
                <List>
                    Other Thing
                </List>
            </div>
        );

        return (
            <div>
            {/* <Button onClick={() => handleDrawer(true)}>Open Drawer</Button> */}

            <Drawer open={open} onClose={() => handleDrawer(false)}>
                <div
                    tabIndex={0}
                    role='button'
                    onClick={() => handleDrawer(false)}
                    onKeyDown={() => handleDrawer(false)}
                >
                    {sideList}
                </div>
                <div
                    tabIndex={1}
                    role='button'
                    onClick={() => handleDrawer(false)}
                    onKeyDown={() => handleDrawer(false)}
                >
                    {sideList}
                    {sideList}
                    Hi there
                </div>
            </Drawer>
            </div>
        );
    }
}

TemporaryDrawer.pkkropTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);