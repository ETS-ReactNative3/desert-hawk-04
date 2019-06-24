// inspired by ./SettingsStepper

import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import {
  withStyles, Button, Chip, Stepper, Step, StepLabel, StepContent, // Typography, Paper, Snackbar, IconButton, Icon,
} from '@material-ui/core';

import GeoSelect from '../GeoSelect/GeoSelect';
// import SelectControl from '../selects/SelectControl';
// import { bizCategoryItems, } from 'my-app/config/AppConfig';

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});

// const HEADER_MESSAGE =
//   <Typography variant="h5" className="opacity-50 font-light" color="inherit" gutterBottom>
//     Set your location
//   </Typography>

// const FINISH_MESSAGE = <div>You finished all steps. You&rsquo;re done!</div>

const STEP_LABELS = [
  'Select country'           ,
  'Select state or region'   ,
  'Select location'          ,
  // 'Select business cagegory' ,
];

const INITIAL_STATE_ACTIVE_STEP = {
  activeStep: 0,
};

const INITIAL_STATE_OPEN = {
  isOpenNation   : false ,
  isOpenRegion   : false ,
  isOpenLocal    : false ,
  isOpenCategory : false ,
  isOpenSnackbar : false ,
};

const INITIAL_STATE_VALUES_GEO = {
  geoNation : '' ,
  geoRegion : '' ,
  geoLocal  : '' ,
};

// const INITIAL_STATE_VALUES_BIZ_CATEGORY = {
//   bizCategory : '' ,
// };

const INITIAL_STATE_VALUES = {
  ...INITIAL_STATE_VALUES_GEO,
  // ...INITIAL_STATE_VALUES_BIZ_CATEGORY,
};

const INITIAL_STATE = {
  ...INITIAL_STATE_ACTIVE_STEP,
  ...INITIAL_STATE_OPEN,
  ...INITIAL_STATE_VALUES,
};

class GeoStepper extends Component {
  
  state = INITIAL_STATE;
  
  // constructor(props) {
  //   super(props);
  //   this.state = INITIAL_STATE;
  // }

  getStepContent = step => {
    
    // const { onChange, } = this.props;

    const {
      isOpenNation, isOpenRegion, isOpenLocal, // isOpenCategory,
      geoNation, geoRegion, geoLocal, // bizCategory,
    } = this.state;
    
    const {
      handleClose,
      handleOpenNation, handleChangeNation,
      handleOpenRegion, handleChangeRegion,
      handleOpenLocal, handleChangeLocal, 
      // handleOpenCategory, handleChangeCategory,
    } = this;
    
    const steps = [
      <GeoSelect
        control='none'
        variant='nation'
        open={isOpenNation}
        value={geoNation}
        onOpen={handleOpenNation}
        onClose={handleClose}
        onChange={handleChangeNation}
      />
      ,
      <GeoSelect
        control='none'
        variant='region'
        open={isOpenRegion}
        value={geoRegion}
        nation={geoNation}
        onOpen={handleOpenRegion}
        onClose={handleClose}
        onChange={handleChangeRegion}
      />
      ,
      <GeoSelect
        control='none'
        variant='local'
        open={isOpenLocal}
        value={geoLocal}
        region={geoRegion}
        nation={geoNation}
        onOpen={handleOpenLocal}
        onClose={handleClose}
        onChange={handleChangeLocal}
      />
      ,
      // <SelectControl
      //   size='small'
      //   control='none'
      //   label='Select category'
      //   open={isOpenCategory}
      //   items={bizCategoryItems}
      //   value={bizCategory}
      //   onOpen={handleOpenCategory}
      //   onClick={handleOpenCategory}
      //   onClose={handleClose}
      //   onChange={handleChangeCategory}
      // />
      // ,
    ];
    return steps[step];
  }

  openHandlers = [
    () => this.handleOpenNation() ,
    () => this.handleOpenRegion() ,
    () => this.handleOpenLocal()  ,
    // () => this.handleOpenCategory() ,
  ]

  getChipValues = () => [
    this.state.geoNation   ,
    this.state.geoRegion   ,
    this.state.geoLocal    ,
    // this.state.bizCategory ,
  ]
  
  // ---------- nation ------------

  handleOpenNation = () => {
    this.setState({
      ...INITIAL_STATE_OPEN,
      activeStep: 0,
      isOpenNation: true,
    }
    // , () => console.log('state\n', this.state)
    );
  };
  
  handleChangeNation = e => {
    // console.log('e\n', e);
    this.setState({
      ...INITIAL_STATE_OPEN,
      // ...INITIAL_STATE_VALUES_BIZ_CATEGORY,
      activeStep: 1,
      geoNation: e.target.value,
      geoRegion: '',
      geoLocal: '',
    }
    , () => {
      // console.log('state\n', this.state);
      this.props.onChange(this.state);
      }
    );
  };

  // ---------- region ------------

  handleOpenRegion = () => {
    this.setState({
      ...INITIAL_STATE_OPEN,
      activeStep: 1,
      isOpenRegion: true,
    }
    // , () => console.log('state\n', this.state)
    );
  };
  
  handleChangeRegion = e => {
    // console.log('e\n', e);
    // this.setState({ [e.target.name]: e.target.value });
    this.setState({ 
      ...INITIAL_STATE_OPEN,
      // ...INITIAL_STATE_VALUES_BIZ_CATEGORY,
      activeStep: 2,
      // geoNation,
      geoRegion: e.target.value,
      geoLocal: '',
    }
    , () => {
      // console.log('state\n', this.state);
      this.props.onChange(this.state);
      }
    );
  };
  
  // ---------- local ------------

  handleOpenLocal = () => {
    this.setState({ 
      ...INITIAL_STATE_OPEN,
      activeStep: 2,
      isOpenLocal: true,
    });
  };

  handleChangeLocal = e => {
    // console.log('e\n', e);
    // this.setState({ [e.target.name]: e.target.value });
    this.setState({ 
      ...INITIAL_STATE_OPEN,
      // ...INITIAL_STATE_VALUES_BIZ_CATEGORY,
      activeStep: 3,
      // geoNation,
      // geoRegion,
      geoLocal: e.target.value,
    }
    , () => {
    // console.log('state\n', this.state);
    this.props.onChange(this.state);
    }
    );
  };

  // ---------- category ------------

  // handleOpenCategory = () => {
  //   this.setState({
  //     ...INITIAL_STATE_OPEN,
  //     activeStep: 3,
  //     isOpenCategory: true,
  //   }
  //   // , () => console.log('state\n', this.state)
  //   );
  // };

  // handleChangeCategory = e => {
  //   // console.log('e\n', e);
  //   // this.setState({ [e.target.name]: e.target.value });
  //   this.setState({
  //     ...INITIAL_STATE_OPEN, 
  //     activeStep: 4,
  //     bizCategory: e.target.value,
  //   }
  //   // , () => {
  //   // console.log('state\n', this.state);
  //   // }
  //   );
  // };

  // ---------- stepper ------------

  handleReset             = ()    => this.setState(   INITIAL_STATE                                )
  handleClose             = ()    => this.setState(   INITIAL_STATE_OPEN                           )
  handleBack              = ()    => this.setState( { activeStep   : this.state.activeStep - 1 , } )
//handleSave              = ()    => this.setState( { isOpenSnackbar : true                      , } )
  handleCloseSnackbar     = ()    => this.setState( { isOpenSnackbar : false                     , } )
  handleClickSelectButton = ()    => this.openHandlers[this.state.activeStep]()
  handleClickChip         = index => this.openHandlers[index]()

  render() {
    const { activeStep, } = this.state; // isOpenSnackbar, 
    const {
      getChipValues, getStepContent,
      handleClickSelectButton, handleBack, handleClickChip, // handleCloseSnackbar, // handleReset, state,
    } = this;
    const { classes, } = this.props; // onChange, onSave,

    // const getFinalStep = () =>
    //   <Paper square elevation={0} className={classes.resetContainer}>
    //     {FINISH_MESSAGE}
    //     <Button onClick={handleReset} className={[classes.button, "mr-32"].join(" ")}>Reset</Button>
    //     <Button onClick={handleBack} className={classes.button}>Back</Button>
    //     <Button onClick={() => onSave(state)} className={classes.button} variant="contained" color="primary">
    //       Save
    //     </Button>
    //   </Paper>

    const getStepper = () =>
      <Stepper
        activeStep={activeStep}
        // orientation="horizontal"
        orientation="vertical"
      >
        {
          STEP_LABELS.map( ( label, index, ) =>
            <Step key={label}>
              <StepLabel>
                {/* <span className="opacity-50 ml-8 text-base">{this.getGeoValue()[index]}</span> */}
                {`Step ${index + 1}: ${label}`}
                {
                  getChipValues()[index]
                  ?
                  <Chip
                    className={[classes.chip, 'ml-8', 'capitalize',].join(' ')}
                    label={getChipValues()[index]} onClick={() => handleClickChip(index)}
                  />
                  :
                  null
                }
              </StepLabel>
              <StepContent>
                <div>{getStepContent(index)}</div>
                <div className={classes.actionsContainer}>
                  <Button className={classes.button} disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                  <Button
                    className={classes.button} onClick={handleClickSelectButton} variant="contained" color="primary"
                  >
                    Select
                  </Button>
                </div>
              </StepContent>
            </Step>
          )
        }
      </Stepper>

    // const getSnackbar = () =>
    //   <Snackbar
    //     anchorOrigin={{
    //       vertical: 'bottom',
    //       horizontal: 'left',
    //     }}
    //     open={isOpenSnackbar}
    //     autoHideDuration={3000}
    //     onClose={handleCloseSnackbar}
    //     ContentProps={{
    //       'aria-describedby': 'message-id',
    //     }}
    //     message={<span id="message-id">Saved</span>}
    //     action={[
    //       <Button className="uppercase" key="undo" color="secondary" size="small" onClick={handleCloseSnackbar}>
    //         Undo
    //       </Button>,
    //       <IconButton
    //         key="close" aria-label="Close" color="inherit"
    //         className={classes.close} onClick={handleCloseSnackbar}
    //       >
    //         <Icon>close</Icon>
    //       </IconButton>,
    //     ]}
    //   />

    const getMainContent = () => getStepper()
      // <Paper className={classes.root} elevation={1}>
      //   {getStepper()} {(activeStep === STEP_LABELS.length) && getFinalStep()}
      // </Paper>

    const getGeoStepper = () => getMainContent()
      // <div className={classes.root}> {HEADER_MESSAGE} {getMainContent()} {getSnackbar()} </div>

    return getGeoStepper();
  }
}

GeoStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  // onSave: PropTypes.func.isRequired,
};

export default withStyles(styles)(GeoStepper);