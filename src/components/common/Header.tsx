import React, { useState } from 'react'
// import { useSession } from "next-auth/react"
//mui
import { makeStyles } from "tss-react/mui";
import { Box, Hidden, Drawer, IconButton, Avatar, Grid, } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
// component
import { lightTheme } from '@redux/theme';
import MenuPanel from './menuPanel';
import TextLabel from './commonTextLabel';
import Assets from './image_container';
import { useRouter } from 'next/router';

const useStyles = makeStyles()((theme) => {
  return {
    innerHeader: {
      padding: "30px 24px",
      height: "30px",
      borderBottom: "1px solid #eeeeee",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      [theme.breakpoints.down('md')]: {
        padding: "15px 24px",
      },
      [theme.breakpoints.down('sm')]: {
        padding: "15px 12px",
      },
      [theme.breakpoints.between(600, 900)]: {
        height: "40px",
      },
      [theme.breakpoints.between(320, 600)]: {
        height: "30px",
      },
    },
    headerItems: {
      display: "flex",
      justifyContent: "space-between",
      gap: "24px",
      alignItems: "center",
      [theme.breakpoints.down('md')]: {
        gap: "12px",
      },
    },
    profileHeaderBtn: {
      display: "flex",
      gap: "16px",
      alignItems: "center",
      [theme.breakpoints.down('md')]: {
        gap: "8px",
      },
    },
    profileAvtar: {
      fontWeight: "600",
      fontSize: "20px",
      textTransform: "capitalize",
      color: lightTheme.palette.bgdefultBlue.main,
      backgroundColor: lightTheme.palette.bgDefultLightSky.main,
      [theme.breakpoints.down('md')]: {
        height: "30px",
        width: "30px",
        fontSize: "16px",
      },
    },
    drawer: {
      '& .MuiDrawer-paper': {
        backgroundColor: "#002734"
      }
    }
  };
});

const Header = () => {
  const { classes } = useStyles();
  const router = useRouter();
  console.log(router.pathname, "router");

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  // const { data: session } = useSession();
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };
  let labelText = '';

  if (router.pathname === '/' || router.pathname === '/dashboard') {
    labelText = 'Dashboard';
  } else if (router.pathname.split('/')?.[1] === 'Challenges') {
    labelText = 'Challenges';
  } else if (router.pathname === '/user-management') {
    labelText = 'User';
  } else if (router.pathname === '/payout') {
    labelText = 'Payout';
  } else if (router.pathname === '/user-management') {
    labelText = 'User';
  } else if (router.pathname === '/currency') {
    labelText = 'Currency';
  } else if (router.pathname === '/customer-support') {
    labelText = 'Customer Support';
  } else if (router.pathname.split('/')?.[1] === 'approval-management') {
    labelText = 'Approval ';
  } else if (router.pathname.split('/')?.[1] === 'verification-management') {
    labelText = 'Verification';
  }else if (router.pathname.split('/')?.[1] === 'trading-objectives') {
    labelText = 'Trading Objectives';
  }

  return (
    <>
      <Box sx={{ backgroundColor: "#F6F6F6", borderRadius: { md: "50px 0 0 0", sm: "0px" }, position: "sticky", top: 0, zIndex: 100 }}>
        <Box className={classes.innerHeader} >
          <Hidden mdUp>
            <Box sx={{ display: "flex" }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
              // sx={{ marginTop: "-16px" }}
              >
                <MenuIcon style={{ color: "#000" }} />
              </IconButton>
              <Grid container spacing={2}>
                <Grid xs={12}>
                  <Drawer
                    anchor="left"
                    open={isDrawerOpen}
                    onClose={toggleDrawer}
                    className={classes.drawer}
                  >
                    <Box sx={{ textAlign: "right", padding: "12px 10px 0px", backgroundColor: "#002734" }}>
                      <CloseIcon onClick={toggleDrawer} sx={{ fontSize: "24px", color: lightTheme.palette.bgGray.main }} />
                    </Box>
                    <MenuPanel />
                  </Drawer>
                </Grid>
              </Grid>
            </Box>
          </Hidden>
          <TextLabel variant="h2" fontWeight="600" title={labelText} />
          <>
            <Box className={classes.headerItems}>
              <Assets height="25px" width="25px" src={"/assets/icons/notification.svg"} absolutePath={true} />
              <Box className={classes.profileHeaderBtn}  >
                <Hidden smDown>
                  <TextLabel variant="h6" fontWeight="500" title={"Name"} />
                </Hidden>
                <Avatar className={classes.profileAvtar} />
              </Box>
            </Box>
          </>
        </Box>
      </Box>
    </>
  )
}

export default Header