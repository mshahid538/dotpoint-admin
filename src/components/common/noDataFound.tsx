import React from "react";
import clsx from "clsx";
import { Card, CardContent, Icon, Typography, } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export default function NoDataFound({ title, icon, elevation, color ,variant}: any) {
  return (
    <Card elevation={elevation !== undefined ? elevation : 1} style={{
      flexGrow: 1,
      width: "100%",
      }}>
      <CardContent style={{ padding: 25 }}>
        <div style={{ textAlign: "center", display: icon ? "" : "none" }}>
          {icon}
        </div>
        <div style={{ textAlign: "center", color: color ? color : "inherit", }}>
          <Typography variant={variant || "body1"} >
            {title ? title : "No record found !"}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}