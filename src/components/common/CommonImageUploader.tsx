import React, { useState, ChangeEvent } from 'react';
import { Box, Grid } from '@mui/material';
import { makeStyles } from "tss-react/mui";
import MUIButton from './commonButton';
import Assets from './image_container';

interface CommonImageUploaderProps {
  onUpload: (files: FileList | null) => void;
}
const useStyles = makeStyles()(() => {
  return {
    attachFiled: {
      marginTop: "8px",
      display: "flex",
      color: "#cdcdcd",
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
      padding: "10px 10px",
      border: "1px dashed #cdcdcd",
      borderRadius: "10px",
    },
  };
});
const CommonImageUploader = ({ originalImg, onChange, isImg }: any) => {
  const { classes } = useStyles();


  return (
    < >
      <Box className={classes.attachFiled}>
        Click here to upload files
        <input
          type="file"
          accept="image/*"
          onChange={onChange}
          style={{
            marginLeft: "16px",
            fontSize: 100,
            position: "absolute",
            left: 0,
            top: 0,
            opacity: 0,
          }}
        />
      </Box>
      <Box sx={{ marginTop: "24px" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box textAlign={'center'} >
              {isImg &&
                <Assets
                  src={originalImg}
                  alt={`Image 1`}
                  absolutePath={true}
                  width={"100%"}
                  height={"auto"}
                />
              }
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ >
  );
};

export default CommonImageUploader;
