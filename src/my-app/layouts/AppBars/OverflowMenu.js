// inspired by https://material-ui.com/demos/menus/#simple-menu

import React, { Component, } from 'react';
import {
  // Button,
  Menu, MenuItem, IconButton, Icon, Tooltip, Zoom,
} from '@material-ui/core';

import { Link, } from 'react-router-dom';
import { getComponentsNavConfig, } from 'my-app/config/AppConfig.js';

const getItems = () => {
  const out = getComponentsNavConfig().filter(r => r.overhead); // filters in only objects with overhead property
  // console.log('out\n', out,);
  return out;
}

// class SimpleMenu extends Component {
class OverflowMenu extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const items = getItems();

    return (
      <div>
        {
        // <Button
        //   aria-owns={anchorEl ? 'simple-menu' : undefined}
        //   aria-haspopup="true"
        //   onClick={this.handleClick}
        // >
        //   Open Menu
        // </Button>
        }
        <Tooltip TransitionComponent={Zoom} title="Links">
          <IconButton
            // className={classes.rightButton}
            color="inherit"
            aria-label="Overflow"

            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <Icon>more_vert</Icon>
          </IconButton>
        </Tooltip>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {
          // <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          // <MenuItem onClick={this.handleClose}>My account</MenuItem>
          // <MenuItem onClick={this.handleClose}>Logout</MenuItem>
          items.map( ({ title, path, }, index) => (
            <Link to={path} className="no-underline text-black">
              <MenuItem key={title} onClick={this.handleClose}>{title}</MenuItem>
            </Link>     
          ))
          }
        </Menu>
      </div>
    );
  }
}

// export default SimpleMenu;
export default OverflowMenu;