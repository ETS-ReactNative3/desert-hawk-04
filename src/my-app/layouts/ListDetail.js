// import React from 'react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';

// @material-ui/core
// import Icon from "@material-ui/core/Icon";
import {
  AppBar, Toolbar, Typography,
  // Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@material-ui/core';

// import UserMultiForm from 'my-app/components/forms/UserMultiForm';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

// 4 Ways to Style React Components: https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822
// const ListDetailStyle = {
//   display: 'grid', // https://css-tricks.com/snippets/css/complete-guide-grid/ | http://grid.malven.co/
//   gridTemplateColumns: '1fr 1fr',
// };

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const INITIAL_STATE = {
  detail: null,
};

// function ListDetail(props) {
class ListDetail extends Component {

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleClick = model => {
    console.log('model\n', model);
    this.setState({detail: model});
  }

  render() {
    const { classes, title, items, condensed } = this.props;
    const { detail, } = this.state;
    const { handleClick, } = this;

    return (

      // <div style={ListDetailStyle}>
      //   <div className="border-solid">{list}</div>
      //   <div className="border-solid">{detail}</div>
      // </div>
  
      // <div className="flex mb-4">
      //   <div className="md:w-1/2">{list}</div>
      //   <div className="md:w-1/2 md:hidden">{detail}</div>
      // </div>
    
      <div className={`${classes.root} sm:p-4 md:p-8`}>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <div className={classes.root}>
                <List
                  component="nav"
                  subheader={
                    <ListSubheader className="text-left">Items</ListSubheader>
                  }
                >
                  {
                    items.map(item => (
                      <ListItem button key={item.timestamp} onClick={() => handleClick(item)}>
                        <Avatar>
                          <BeachAccessIcon />
                        </Avatar>
                        <ListItemText primary="Vacation" secondary={item.name} />
                      </ListItem>
                    ))
                  }
                </List>
              </div>
            </Paper>
            {/* {list} */}
          </Grid>
          <Hidden xsDown>
            <Grid item xs={6}>
              {
                ( classes && detail )
                ?
                <Paper className={classes.paper}>
                  <List
                    component="nav"
                    subheader={
                      <ListSubheader className="text-left">Detail</ListSubheader>
                    }
                  >
                    {
                      Object.keys(detail).map((keyName, keyIndex,) =>
                        // keyName // success
                        // `${keyName}: ${detail[keyName]}` // success
                        // // success
                        // <Typography className="text-left">
                        //   {keyName}: {detail[keyName]}
                        // </Typography>
                        // attempt
                        <ListItem
                          key={keyName.timestamp}
                          // button
                          // onClick={() => handleClick(item)}
                        >
                          {/* <Avatar>
                            <BeachAccessIcon />
                          </Avatar> */}
                          <ListItemText
                            primary={keyName}
                            secondary={ condensed ? null : detail[keyName] }
                          />
                          {
                            condensed
                            ?
                            <ListItemSecondaryAction className="pr-16">
                              {detail[keyName]}
                            </ListItemSecondaryAction>
                            :
                            null
                          }
                        </ListItem>
                      )
                    }
                  </List>
                </Paper>
                :
                <img src="https://via.placeholder.com/800x900.png/e91e63/fff?text=Detail+goes+here"/>
              }
            </Grid>
          </Hidden>
        </Grid>
      </div>
  
    );
  }
}

ListDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  condensed: PropTypes.bool,
  items: PropTypes.array,
};

// export default ListDetail;
// export default withStyles(styles)(ListDetail);
export default compose(
  withStyles(styles),
  withWidth(),
)(ListDetail);