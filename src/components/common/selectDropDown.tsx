import React, { Children } from "react";
import {
  InputLabel,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme: any) => {
  return {
    select: {
      "&:before": {
        borderColor: "white",
      },
      "&:after": {
        borderColor: "white",
      },
      "&:not(.Mui-disabled):hover::before": {
        borderColor: "white",
      },
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
          border: "1px solid #EEEEEE",
        },
      },
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          border: "1px solid #EEEEEE",
        },
      },
    },
    icon: {
      fill: '#eee',
    },
    root: {
      // color: 'white',
    },
  };
});

const SelectDropDown = ({
  text,
  height,
  width,
  values,
  cValues,
  menu,
  valid,
  onChange,
  name,
  value,
  label,
  defaultValue,
  defaultChecked,
  disabled,
  fontWeight,
  labelSize,
  multiple,
  children,
  rejection,
  className,
  size,
  backgroundColor,
  selectBackgroundColor,
  color,
  lableColor,
  isDelete,
  onClick,
  i,
}: any) => {
  const { classes, cx } = useStyles();
  return (
    <>
      {text && (
        <Box
          mt={1.5}
          mb={1}
          display="flex"
          fontSize="12px"
          flexDirection={"row"}
          justifyContent={"space-between"}
        // gap={0.5}
        >
          <Box display="flex">
            <InputLabel
              sx={{
                fontWeight: fontWeight || 500,
                fontSize: labelSize || "12px",
                marginRight: "2px",
                color: lableColor || "#333333",
              }}
            >
              {text}
            </InputLabel>
            {valid && (
              <Typography
                color="#EF627A"
                component={"caption"}
                variant={"body2"}
              >
                *
              </Typography>
            )}
          </Box>
      
        </Box>
      )}
      <FormControl sx={{ width: width || "100%", height: height }}>
        <Select
          size={size || "small"}
          className={cx(classes.select, className)}
          value={value || ""}
          onChange={onChange}
          name={name}
          defaultValue={defaultValue || ""}
          defaultChecked={defaultChecked}
          disabled={disabled}
          displayEmpty
          sx={{ backgroundColor: selectBackgroundColor, borderRadius: "14px",height:'45px' }}
          renderValue={(selected) => {
            if (selected === "") {
              return (
                <span
                  style={{
                    color: color || "",
                    fontFamily: "Poppins",
                    fontSize: "14px",
                  }}
                >
                  Select Option
                </span>
              );
            }
            return (
              <span style={{ color: color || "#36373B", fontSize: "14px" }}>
                {selected}
              </span>
            );
            // return selected;
          }}
          // inputProps={{ 'aria-label': 'Without label' }}
          style={{
            // backgroundColor: backgroundColor || "#36373B",
            // color: color || 'white',
            width: width || "100%",
          }}
          inputProps={{
            classes: {
              icon: classes.icon,
              root: classes.root,
            },
          }}
        >
          {values &&
            values?.map((val: any, index: number) => {
              return (
                <MenuItem value={val.value} key={index.toString()}>
                  {val.name}
                </MenuItem>
              );
            })}
          {cValues &&
            cValues?.map((val: any, index: number) => {
              return (
                <MenuItem value={val.name} key={index.toString()}>
                  {val.name}
                </MenuItem>
              );
            })}
          {menu &&
            menu?.map((val: any, index: number) => {
              return (
                <MenuItem value={val?.clientId} key={index.toString()}>
                  {val?.clientName}
                </MenuItem>
              );
            })}
          {rejection &&
            rejection?.map((val: any, index: number) => {
              return (
                <MenuItem value={val} key={index.toString()}>
                  {val?.description}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectDropDown;

