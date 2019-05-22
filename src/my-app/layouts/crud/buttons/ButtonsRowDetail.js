// inspired by https://material-ui.com/demos/buttons/#icon-buttons

import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { Icon, IconButton, Tooltip, Zoom, } from '@material-ui/core';

const ButtonsRowDetail = ({ limit, selectedIndex, deletable, updatable, onToggle, onDelete, onUpdate, onNavBack, onNavNext, }) => {
  
  const config = [
    {
      conditional : true                    ,
      title       : 'Previous'              ,
      handleClick : onNavBack               ,
      disabled    : ( selectedIndex === 0 ) ,
      icon        : 'arrow_back_ios'        ,
    },
    {
      conditional : deletable   ,
      title       : 'Delete...' ,
      handleClick : onDelete    ,
      disabled    : false       ,
      icon        : 'delete'    ,
    },
    {
      conditional : deletable ,
      title       : 'Clear'   ,
      handleClick : onToggle  ,
      disabled    : false     ,
      icon        : 'clear'   ,
    },
    {
      conditional : updatable ,
      title       : 'Edit'    ,
      handleClick : onUpdate  ,
      disabled    : false     ,
      icon        : 'edit'    ,
    },
    {
      conditional : true                      ,
      title       : 'Next'                    ,
      handleClick : onNavNext                 ,
      disabled    : ( selectedIndex > limit ) ,
      icon        : 'arrow_forward_ios'       ,
    },
  ];

  return (
    <div className="flex mx-8">
      {
        config.map( item => item.conditional && (
          <Tooltip TransitionComponent={Zoom} title={item.title}>
            <span className="flex-1 text-center mt-8">
              <IconButton onClick={item.handleClick} disabled={item.disabled}>
                <Icon>{item.icon}</Icon>
              </IconButton>
            </span>
          </Tooltip>
        ))
      }
    </div>
  )
}

ButtonsRowDetail.propTypes = {
  updatable: PropTypes.bool,
  deletable: PropTypes.bool,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  // limit, selectedIndex, deletable, updatable, onToggle, onNavBack, onNavNext,
};

ButtonsRowDetail.defaultProps = {
  deletable: false,
  updatable: false,
};
 
export default ButtonsRowDetail;