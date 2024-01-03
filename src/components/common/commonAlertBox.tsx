import React from 'react';
import { Alert } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { lightTheme } from '@redux/theme';

const useStyles = makeStyles()((theme) => {
  return {
    commanBox: {
      padding: '30px',
      fontSize: '16px',
      fontWeight: '600',
      textAlign: 'center',
    },
    bgError: {
      backgroundColor: 'red',
      border: '3px solid darkred',
    },
    bgWarning: {
      backgroundColor: lightTheme.palette.lightWarning.main,
      border: '3px solid',
      borderColor: lightTheme.palette.warning.main,
    },
    bgInfo: {
      backgroundColor: lightTheme.palette.bgLightBlue.main,
      border: '3px solid',
      borderColor: lightTheme.palette.info.main,
    },
    bgSuccess: {
      backgroundColor: 'green',
      border: '3px solid',
    },
    bgDefault: {
      backgroundColor: lightTheme.palette.bgLightGray.main,
      border: '3px solid',
      borderColor: lightTheme.palette.bgDefultLight.main,
    },
  };
});

const MUIAlert = ({ severity, description, icon, onHandle, btnTitle }:any) => {
  const { classes } = useStyles();

  let alertClassName = '';

  switch (severity) {
    case 'error':
      alertClassName = classes.bgError;
      break;
    case 'warning':
      alertClassName = classes.bgWarning;
      break;
    case 'info':
      alertClassName = classes.bgInfo;
      break;
    case 'success':
      alertClassName = classes.bgSuccess;
      break;
      case 'defult':
      alertClassName = classes.bgDefault;
      break;
    default:
      alertClassName = classes.bgDefault;
      break;
  }

  return (
    <Alert className={`${alertClassName} ${classes.commanBox}`} severity={severity} icon={icon}>
      {description}
      {btnTitle && (
        <button onClick={onHandle} className="your-button-styles">
          {btnTitle}
        </button>
      )}
    </Alert>
  );
};

export default MUIAlert;
