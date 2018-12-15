import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import axios from 'axios/index';
import { Avatar, AppBar, Button, Card, CardContent, Icon, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Toolbar, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { FuseAnimateGroup } from '@fuse';

import PropTypes from 'prop-types';

import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

// this page was copied from ./AboutTab

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
});

const optionsMenu1 = [
  'Show some love to Material-UI',
  'Show all notification content',
  'Hide sensitive notification content',
  'Hide all notification content',
];

const optionsMenu2 = [
  'Select one',
  'Home',
  'Mortgage',
  'Insurance',
  'Financial',
];

class DetailsTab extends Component {

  // state = {
  //   general: null,
  //   work: null,
  //   contact: null,
  //   groups: null,
  //   friends: null
  // };

  // componentDidMount() {
  //   axios.get('/api/profile/about').then(res => {
  //     this.setState(res.data);
  //   });
  // }

  state = {
    anchorElMenu1: null,
    anchorElMenu2: null,
    selectedIndexMenu1: 1,
    selectedIndexMenu2: 1,
  };

  handleClickListItemMenu1 = event => {
    this.setState({ anchorElMenu1: event.currentTarget });
  };
  
  handleMenuItemClickMenu1 = (event, index) => {
    this.setState({ selectedIndexMenu1: index, anchorElMenu1: null });
  };

  handleCloseMenu1 = () => {
    this.setState({ anchorElMenu1: null });
  };

  handleClickListItemMenu2 = event => {
    this.setState({ anchorElMenu1: event.currentTarget });
  };
  
  handleMenuItemClickMenu2 = (event, index) => {
    this.setState({ selectedIndexMenu2: index, anchorElMenu2: null });
  };

  handleCloseMenu2 = () => {
    this.setState({ anchorElMenu2: null });
  };

  render() {
    const { classes } = this.props;
    // const { general, work, contact, } = this.state;
    const { anchorElMenu1, anchorElMenu2, } = this.state;

    return (
      <React.Fragment>
        {/* <div className={classNames(classes.root, "md:flex max-w-2xl")}>

          <div className="flex flex-col flex-1 md:pr-32">
            <FuseAnimateGroup
              enter={{
                animation: "transition.slideUpBigIn"
              }}
            >
              
              <Card className="w-full mb-16">
                <AppBar position="static" elevation={0}>
                  <Toolbar className="pl-16 pr-8">
                    <Typography variant="subtitle1" color="inherit" className="flex-1">
                      Contact
                      </Typography>
                  </Toolbar>
                </AppBar>

                <CardContent>
                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">Name</Typography>
                    <Typography>Maria Le</Typography>
                  </div>

                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">Email</Typography>
                    <Typography>maria.le.4@gmail.com</Typography>
                  </div>

                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">Cell</Typography>
                    <Typography>add &plus;</Typography>
                  </div>
                </CardContent>
              </Card>
            </FuseAnimateGroup>
          </div>
          
          <div className="flex flex-col flex-1 md:pr-32">
            <FuseAnimateGroup
              enter={{
                animation: "transition.slideLeftBigIn"
              }}
            >
              <Card className="w-full">
                <AppBar position="static" elevation={0}>
                  <Toolbar className="pl-16 pr-8">
                    <Typography variant="subtitle1" color="inherit" className="flex-1">
                      Contact
                    </Typography>
                  </Toolbar>
                </AppBar>

                <CardContent className="px-0">
                  <List component="nav">
                    <ListItem
                      button
                      aria-haspopup="true"
                      aria-controls="lock-menu"
                      aria-label="When device is locked"
                      onClick={this.handleClickListItem}
                    >
                      <ListItemText
                        primary="When device is locked"
                        secondary={options[this.state.selectedIndex]}
                      />
                    </ListItem>
                  </List>
                  <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                  >
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        disabled={index === 0}
                        selected={index === this.state.selectedIndex}
                        onClick={event => this.handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </CardContent>
              </Card>
            </FuseAnimateGroup>
          </div>
          
        </div> */}

        <div className={classNames(classes.root, "md:flex max-w-2xl")}>

          <div className="flex flex-col flex-1 md:pr-32">
            <FuseAnimateGroup
              enter={{
                animation: "transition.slideLeftBigIn"
              }}
            >
              <Card className="w-full mb-16">
                <AppBar position="static" elevation={0}>
                  <Toolbar className="pl-16 pr-8">
                    <Typography variant="subtitle1" color="inherit" className="flex-1">
                      Contact
                    </Typography>
                  </Toolbar>
                </AppBar>

                <CardContent className="px-0 mb-24">
                  <List component="nav" className="px-0 mb-4">
                    <ListItem
                      button
                      aria-haspopup="true"
                      aria-controls="lock-menu"
                      aria-label="When device is locked"
                      onClick={this.handleClickListItemMenu1}
                    >
                      <ListItemText
                        primary="When device is locked"
                        secondary={optionsMenu1[this.state.selectedIndexMenu1]}
                      />
                    </ListItem>
                  </List>
                  <Menu
                    id="lock-menu"
                    anchorEl={anchorElMenu1}
                    open={Boolean(anchorElMenu1)}
                    onClose={this.handleClose}
                  >
                    {optionsMenu1.map((option, index) => (
                      <MenuItem
                        key={option}
                        disabled={index === 0}
                        selected={index === this.state.selectedIndexMenu1}
                        onClick={event => this.handleMenuItemClickMenu1(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </CardContent>
              </Card>
            </FuseAnimateGroup>
          </div>

          <div className="flex flex-col flex-1 md:pr-32">
            <FuseAnimateGroup
              enter={{
                animation: "transition.slideLeftBigIn"
              }}
            >
              <Card className="w-full mb-16">
                <AppBar position="static" elevation={0}>
                  <Toolbar className="pl-16 pr-8">
                    <Typography variant="subtitle1" color="inherit" className="flex-1">
                      Business
                    </Typography>
                  </Toolbar>
                </AppBar>

                <CardContent className="px-0 mb-24">
                  <List component="nav" className="px-0 mb-4">
                    <ListItem
                      button
                      aria-haspopup="true"
                      aria-controls="lock-menu"
                      aria-label="Type"
                      onClick={this.handleClickListItemMenu2}
                    >
                      <ListItemText
                        primary="Type"
                        secondary={optionsMenu2[this.state.selectedIndexMenu2]}
                      />
                    </ListItem>
                  </List>
                  <Menu
                    id="lock-menu"
                    anchorEl={anchorElMenu2}
                    open={Boolean(anchorElMenu2)}
                    onClose={this.handleCloseMenu2}
                  >
                    {optionsMenu2.map((option, index) => (
                      <MenuItem
                        key={option}
                        disabled={index === 0}
                        selected={index === this.state.selectedIndexMenu2}
                        onClick={event => this.handleMenuItemClickMenu2(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </CardContent>
              </Card>
            </FuseAnimateGroup>
          </div>

        </div>
      </React.Fragment>
    );
  }
}

DetailsTab.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(DetailsTab);
