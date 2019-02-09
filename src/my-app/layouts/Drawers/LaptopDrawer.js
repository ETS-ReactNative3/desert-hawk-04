// Laptop (1280+)
// inspired by https://material-ui.com/demos/drawers/#permanent-drawer

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Routes from 'my-app/layouts/Routes.js';
import {
  // Typography,
  CssBaseline, Drawer,
} from '@material-ui/core';

import MyFab from 'my-app/layouts/MyFab';
import OverflowMenu from '../appBars/OverflowMenu';
import LaptopAppBar from '../appBars/LaptopAppBar';
import BrandAppBar from '../appBars/BrandAppBar';
import DrawerContent from './DrawerContent';
// import DrawerContent1 from './DrawerContent1'; // specs/dimensions reference for sizing, spacing, etc

import { drawerWidth } from 'my-app/config/AppConfig';
// const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#303030', // 262933 per styles/index.css
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

const PermanentDrawerLeft = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      {
      // <AppBar position="fixed" className={classes.appBar}>
      //   <Toolbar>
      //     <Typography variant="h6" color="inherit" noWrap>
      //       Permanent drawer
      //     </Typography>
      //   </Toolbar>
      // </AppBar>
      }
      <MyFab />
      <OverflowMenu />
      <LaptopAppBar />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        {
        // <div className={classes.toolbar} />
        // <Divider />
        }
        <BrandAppBar />
        <DrawerContent userHeader />
        {
        // <DrawerContent1 />
        }
      </Drawer>
      <main className={classes.content}>
        <Routes />
      {
      //   {
      //   <div className={classes.toolbar} />
      //   }
        
      //   <Typography paragraph>
      //     Laptop (1280+)
      //     |
      //     https://material-ui.com/demos/drawers/#permanent-drawer
      //   </Typography>
        
      //   <Typography paragraph>
      //     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      //     ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
      //     facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
      //     gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
      //     donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
      //     adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
      //     Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
      //     imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
      //     arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
      //     donec massa sapien faucibus et molestie ac.
      //   </Typography>
      //   <Typography paragraph>
      //     Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
      //     facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
      //     tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
      //     consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
      //     vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
      //     hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
      //     tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
      //     nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
      //     accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
      //   </Typography>
      }
      </main>
    </div>
  );
}

PermanentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermanentDrawerLeft);