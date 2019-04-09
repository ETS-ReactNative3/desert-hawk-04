// inspired by src/main/MainNavbarContent.js

import React from 'react';
import { withStyles, AppBar, Typography, Avatar, Hidden } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { FuseNavigation, FuseLayouts } from '@fuse';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    '& .user': {
      '& .username, & .email': {
        transition: theme.transitions.create('opacity', {
          duration: theme.transitions.duration.shortest,
          easing: theme.transitions.easing.easeInOut
        })
      }
    }
  },
  avatar: {
    width: 72,
    height: 72,
    position: 'absolute',
    top: 92,
    padding: 8,
    background: theme.palette.background.default,
    boxSizing: 'content-box',
    left: '50%',
    transform: 'translateX(-50%)',
    '& > img': {
      borderRadius: '50%'
    }
  }
});


// function MainNavbar({ classes, navigation, layoutStyle, user }) {
// function DrawerContent({ classes, navigation, layoutStyle, user, userHeader }) {
const DrawerContent = ({ classes, navigation, layoutStyle, profile, userHeader, }) => { // user,

  // username, email, photo
  // function UserHeader() {
  const UserHeader = () => {
    return (
      <AppBar
        position="static"
        color="primary"
        elevation={0}
        className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0"
      >
      
      {
        // username
        // originally: text-16
        // <Typography className="username text-18 whitespace-no-wrap" color="inherit">{user.data.displayName}</Typography>
      }
        <Typography className="username text-18 whitespace-no-wrap" color="inherit">{profile.displayName}</Typography>
      
      {
        // email
        // originally: text-13
        // <Typography className="email text-14 mt-8 opacity-50 whitespace-no-wrap" color="inherit">{user.data.email}</Typography>
      }
        <Typography className="email text-14 mt-8 opacity-50 whitespace-no-wrap" color="inherit">{profile.email}</Typography>
      
      {
        // photo
      }
        <Avatar
          className={classNames(classes.avatar, "avatar")}
          alt="user photo"
          src={
            // ( user && user.data && user.data.photoURL && (user.data.photoURL.length > 5) )
            // ? user.data.photoURL
            ( profile && profile.photoURL && (profile.photoURL.length > 5) )
            ? profile.photoURL
            : "assets/images/avatars/profile.jpg"
          }
        />
      </AppBar>
    );
  }

  const navigationLayout = FuseLayouts[layoutStyle].type;
  return (
    <div className={classes.root}>
      {
        ( navigationLayout === 'vertical' )
        ?
        (
          <React.Fragment>
            { 
              userHeader && (
                <React.Fragment>
                  <UserHeader />
                  <div className="h-32" />
                </React.Fragment>
              )
            }
            <FuseNavigation navigation={navigation} layout={navigationLayout} />
          </React.Fragment>
        )
        :
        (
          <React.Fragment>
            <Hidden lgUp>
              { userHeader && (<UserHeader />) }
            </Hidden>
            <FuseNavigation navigation={navigation} layout={navigationLayout} />
          </React.Fragment>
        )
      }
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps({ fuse, firebase, }) { // auth,
  return {
    navigation: fuse.navigation,
    layoutStyle: fuse.settings.current.layout.style,
    // user: auth.user,
    profile: firebase.profile,
  }
}

// export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(MainNavbar)));
export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(DrawerContent)));