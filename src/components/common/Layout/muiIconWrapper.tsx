import React from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

const MuiIconWrapper = ({ icon, sx, onClick }: any) => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      width={30}
      height={30}
      borderRadius={2}
      sx={sx}
      onClick={onClick}
    >
      {icon}
    </Box>
  );
};

export default MuiIconWrapper;
