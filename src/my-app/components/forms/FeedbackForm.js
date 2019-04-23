import React, { useState, } from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import classNames from 'classnames';

import { Typography, Button, TextField, Paper, } from '@material-ui/core';

// const styles = theme => ({});

const ALERT_MESSAGE = 'Your note has exceeded the maximum allowable size. Consider shortening it or splitting it into two parts.';

const FeedbackForm = props => {
  // const { classes, } = props;
  // const { container, margin, textField, } = classes;
  const { heading, label, rowsCount, minLength, maxLength, initialContent, initialCanSubmit, } = props;
    
  const [ content   , setContent   , ] = useState(initialContent);
  const [ canSubmit , setCanSubmit , ] = useState(initialCanSubmit);

  const handleSubmit = () => {
    console.log('content\n', content);
    alert(`Your note was submitted. Thank you!\n\n${content}`);
    setContent(initialContent);
    setCanSubmit(initialCanSubmit);
  };

  const handleEnableButton = () => {
    const { length, } = content;
    const ready = length > minLength;
    setCanSubmit(ready);
  }

  const handleChange = ({ target, }) => {
    // console.log('target\n', target,);
    const { value, } = target;
    // console.log('value\n', value,);
    const { length, } = content;
    const ready = length < maxLength;
    if(!ready) {
      alert(ALERT_MESSAGE);
      return;
    }
    setContent(value);
    handleEnableButton();
  }

  return (
    <Paper className="max-w-sm m-32 p-32">
      <Typography className="h1 mb-24">{heading}</Typography>
      {/* <form className={container} noValidate autoComplete="off"> */}
        <TextField
          // className={classNames(margin, textField,)} // className={textField}
          variant="outlined"
          id="feedback-form"
          label={label}
          fullWidth
          multiline
          rows={rowsCount}
          value={content}
          onChange={handleChange}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mx-auto mt-16"
          aria-label="Submit"
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      {/* </form> */}
    </Paper>
  );
}

FeedbackForm.defaultProps = {
  heading: 'Send us a note',
  label: 'What’s on your mind?',
  rowsCount: 5,
  minLength: 4,
  maxLength: 10, // 500000, // 1Mb/document, firestore limit
  initialContent: '',
  initialCanSubmit: false,
};

FeedbackForm.propTypes = {
  // classes: PropTypes.object.isRequired,
  heading: PropTypes.string,
  label: PropTypes.string,
  rowsCount: PropTypes.number,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  initialContent: PropTypes.string,
  initialCanSubmit: PropTypes.bool,
};

// export default withStyles(styles)(FeedbackForm);
export default FeedbackForm;