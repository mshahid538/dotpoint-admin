import {
  InputLabel,
  OutlinedInput,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import React from "react";
import { makeStyles } from "tss-react/mui";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import emojiRegex from "emoji-regex";
import TextLabel from "./commonTextLabel";

const useStyles = makeStyles()((theme) => {
  return {
    main: {
      // background: "#36373B",
      // minWidth: "50px",
      // border: 'none !important',
      "& .MuiInputBase-input": {
        height: "30px",
      },
      "& .MuiInputBase-fullWidth": {
        fontSize: "14px",
        fontFamily: "Poppins",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#EEEEEE ",
        borderRadius: "10px",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#EEEEEE",
          borderRadius: "10px",
        },
        "&:hover fieldset": {
          borderColor: "#EEEEEE",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#EEEEEE",
        },
      },
      "&:hover": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#EEEEEE", // Set the border color for hover
        },
      },
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#EEEEEE", // Set the border color for focus
        },
      },
    },
    error: {
      // border: "1px solid green",
    },
    noBorder: {
      // border: "none",
    },
    inputDark: {
      // color: '#FFFFFF',
      // transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out",
      // "&:hover": {
      //     borderColor: "rgba(0, 156, 251, 0.8)",
      //     boxShadow: "0 0 5px rgba(0, 156, 251, 0.8)", // Replace with your desired box shadow
      //     "-webkit-box-shadow": "0 0 5px rgba(0, 156, 251, 0.8)", // Replace with your desired box shadow
      // },
      // borderRadius: 5,
      // background: "#36373B",
    },
    inputLight: {
      color: "#FFFFFF",
    },
    label: {
      // color: '#FFFFFF',
    },
  };
});

const CommonTextField = ({
  text,
  type,
  placeholder,
  height,
  width,
  valid,
  multiline,
  rows,
  name,
  value,
  onChange,
  onInput,
  inputProps,
  defaultValue,
  fontWeight,
  labelSize,
  labelColor,
  showPasswordToggle,
  maxValue,
  error,
  className,
  format,
  bgcolor,
  onKeyDown,
  onPaste,
  onBlur,
  disabled,
  onKeyDownCapture,
  shrink,
  onDrag,
  size,
  icon,
  color,
  backgroundColor,
  variant,
  inputLight,
  inputBackgroundColor
}: any) => {
  const { classes } = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const regex = emojiRegex();
  return (
    <>
      {text && (
        <Box
          mt={1.5}
          mb={1}
          display="flex"
          fontSize="12px"
          flexDirection={"row"}
        >
          <InputLabel
            sx={{
              marginRight: "2px",
              fontWeight: fontWeight || "500",
              fontSize: "12px",
              color: labelColor || "#333333",
              backgroundColor: backgroundColor,
            }}
          >
            {text}
          </InputLabel>
          {valid && (
            <TextLabel color="#EF627A" variant="body2" title={"*"} />
          )}
        </Box>
      )}
      <TextField
        fullWidth
        size={size || "small"}
        type={
          type == "password"
            ? showPassword && showPasswordToggle
              ? "text"
              : type
            : type
        }
        name={name}
        value={value}
        placeholder={placeholder}
        sx={{ height: height, width: width, backgroundColor: inputBackgroundColor, borderRadius: '14px' }}
        multiline={multiline}
        rows={rows}
        className={`${classes?.main} ${className}`}
        onInput={onInput}
        onPaste={onPaste}
        inputProps={inputProps}
        onKeyDown={onKeyDown}
        variant={variant}
        defaultValue={defaultValue}
        onDrag={onDrag}
        onBlur={onBlur}
        disabled={disabled ? disabled : false}
        onChange={(e) => {
          const value = e.target.value;
          const strippedValue = value.replace(regex, "");
          const modifiedEvent = {
            ...e,
            target: {
              ...e.target,
              name: name,
              value: strippedValue,
            },
          };
          onChange(modifiedEvent);
        }}
        InputLabelProps={{
          className: classes.label,
        }}
        InputProps={{
          ...(showPasswordToggle && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <Visibility sx={{ color: "#cdcdcd" }} />
                  ) : (
                    <VisibilityOff sx={{ color: "#cdcdcd" }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }),
          ...(icon && {
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="start"
                >
                  {icon}
                </IconButton>
              </InputAdornment>
            ),
          }),
          classes: {
            notchedOutline: classes.noBorder,
          },
          className: inputLight ? classes.inputLight : classes.inputDark,
        }}
      />
    </>
  );
};

export default CommonTextField;
