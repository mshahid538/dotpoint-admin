import React from "react";
import { Divider, Box } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import Paper, { PaperProps } from "@mui/material/Paper";
import CommonComponentProps from "@customTypes/commonComponentProps";
import TextLabel from "./commonTextLabel";
type PaperContainerProps = CommonComponentProps & PaperProps;
const useStyles = makeStyles()((theme) => {
  return {
    titleForm: {
      fontSize: "16px",
      fontWeight: "600",
      padding: "12px 16px",
    },
  };
});
export default function PaperContainer({
  children,
  sx,
  padding,
  margin,
  title,
  subdes,
  bodyPadding,
  textAlign,
  height,
  ...other
}: any) {
  const { classes } = useStyles();
  const hasTitle = title;
  return (
    <Paper
      elevation={0}
      sx={{
        ...sx,
        backgroundColor: "#fff",
        border: {
          md: "1px solid #DEE2E6",
        },
        height: height || "auto",
        borderRadius: "15px",
        // margin: margin || "24px 0"
      }}
      {...other}
    >
      {hasTitle && (
        <Box className={classes.titleForm}>
          <TextLabel fontWeight="600" variant={"subtitle2"} title={title} />
          <TextLabel variant={"subtitle2"} title={subdes} />
        </Box>
      )}
      {hasTitle && <Divider />}
      <Box sx={{ textAlign: textAlign || "left", padding: bodyPadding || "20px" }}>{children}</Box>
    </Paper>
  );
}
