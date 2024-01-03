import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import TextLabel from "./commonTextLabel";

interface InformationProps {
  title?: string;
  description1?: string;
  description2?: string;
  isButton?: boolean;
  buttonText?: string;
}

const InformationBox = ({
  title,
  description1,
  description2,
  isButton,
  buttonText,
}: InformationProps) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={9} xs={12}>
          <Card
            sx={{
              marginBottom: "12px",
              boxShadow:
                "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0), 0px 1px 8px 0px rgba(0,0,0,0.12)",
            }}
          >
            <CardContent>
            <TextLabel fontWeight={"700"} fontSize={"16px"} title={title} />
            </CardContent>
            <Divider />
            <CardContent>
            <TextLabel  fontSize={"14px"} marginBottom={2} title={description1} />
            <TextLabel  fontSize={"14px"} title={description2} />
              {isButton && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ fontWeight: 700 }}
                >
                  {buttonText}
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default InformationBox;
