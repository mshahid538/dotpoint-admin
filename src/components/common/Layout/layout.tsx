import React, { ReactNode, useEffect } from "react";
import { makeStyles } from "tss-react/mui";
import { Container, Grid, Hidden, Box } from "@mui/material";

import Header from "@components/common/Header";
import Footer from "@components/common/Footer";
import MenuPanel from "../menuPanel";
import { setToken } from "@redux/Api/ClientHelper";

interface LayoutProps {
  children: ReactNode;
}
const useStyles = makeStyles()((theme) => {
  return {
    rightLayout: {
      borderRadius: "50px 0 0 50px",
      backgroundColor: "#fefefe",
      // height: "100vh",
      [theme.breakpoints.down('md')]: {
        borderRadius: "0px"
      }
    },
    bodyContain: {
      padding: "24px",
      height: "calc(100vh - 208px)",
      overflowY: "auto",
      backgroundColor: "#F6F6F6",
      [theme.breakpoints.down(1200)]: {
          height: "calc(100vh - 184px)",
      },
      [theme.breakpoints.down(962)]: {
          height: "calc(100vh - 205px)",
      },
      [theme.breakpoints.down(900)]: {
          height: "calc(100vh - 191px)",
      },
      [theme.breakpoints.down(600)]: {
          height: "calc(100vh - 151px)",
          padding: "12px",
      },
      [theme.breakpoints.down(500)]: {
          height: "calc(100vh - 143px)",
      },
      [theme.breakpoints.down(353)]: {
          height: "calc(100vh - 160px)",
      },
  }
  };
});
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { classes } = useStyles();

  useEffect(() => {
    setToken(localStorage.getItem('access_token'))
  }, []);

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} md={3} lg={2}>
          <Hidden mdDown>
            <MenuPanel />
          </Hidden>
        </Grid>
        <Grid item xs={12} md={9} lg={10}>
          <Box className={classes.rightLayout}>
            <Header />
            <Box className={classes.bodyContain}>{children}
            </Box>
              <Footer />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Layout;
