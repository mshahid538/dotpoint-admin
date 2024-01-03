import React from 'react'
import { Box, Typography, Divider } from '@mui/material'
import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles()((theme) => {
  return {
    footerMain: {
      padding: '24px',
      [theme.breakpoints.down('lg')]: {
        padding: '12px 24px',
      },
      [theme.breakpoints.down(500)]: {
        padding: '8px 12px',
      }
    },
    miniFooterItems: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "20px",
      [theme.breakpoints.down('md')]: {
        gap: '6px',
      }
    },
    footerContain: {
      fontSize: "14px",
      textAlign: "center"
    },
    footerLinkText: {
      fontSize: "14px",
      fontWeight: "600",
      [theme.breakpoints.down("sm")]: {
        fontSize: "12px",
      }
    }
  };
});
const Footer = () => {
  const { classes } = useStyles();
  return (
    <>
      <Box className={classes.footerMain}>
        <Box className={classes.miniFooterItems} sx={{ flexDirection: { xl: "row", lg: "row", md: "row", sm: "column", xs: "column" }, textAlign: "center" }}>
          <Typography className={classes.footerLinkText}> 2023 © Copyright - Dot Point Made with <span style={{ color: "red" }}> ❤️ </span> for trading.</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            <Typography className={classes.footerLinkText} onClick={() => {window.open("https://www.dotpointcapital.com/privacy-policy")}} sx={{cursor:"pointer"}}> Privacy policy </Typography>
            <Divider orientation="vertical" variant="middle" flexItem style={{ borderColor: "black", margin: "5px" }} />
            <Typography className={classes.footerLinkText} onClick={() => {window.open("https://www.dotpointcapital.com/terms-conditions")}} sx={{cursor:"pointer"}}> Terms and Condition</Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}
export default Footer;
// import React from 'react'
// import { Box, Typography, Divider } from '@mui/material'
// import { makeStyles } from "tss-react/mui";
// const useStyles = makeStyles()((theme) => {
//   return {
//     footerMain: {
//       paddingTop: '24px',
//        [theme.breakpoints.down(500)]: {
//         paddingTop: '12px ',
//       }
//     },
//     miniFooterItems: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       gap: "20px",
//       [theme.breakpoints.down(500)]: {
//         gap: '12px',
//       }
//     },
//     footerContain: {
//       fontSize: "14px",
//       textAlign: "center"
//     },
//     footerLinkText: {
//       fontSize: "14px",
//       fontWeight: "600",
//       [theme.breakpoints.down("sm")]: {
//         fontSize: "12px",
//       }
//     }
//   };
// });
// const Footer = () => {
//   const { classes } = useStyles();
//   return (
//     <>
//       <Box className={classes.footerMain}>
//         <Box className={classes.miniFooterItems} sx={{ flexDirection: { xl: "row", lg: "row", md: "row", sm: "column", xs: "column" }, textAlign: "center" }}>
//           <Typography className={classes.footerLinkText}> 2023 © Copyright - Dot Point Made with <span style={{ color: "red" }}> ❤️ </span> for trading.</Typography>
//           <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
//             <Typography className={classes.footerLinkText}> Privacy policy </Typography>
//             <Divider orientation="vertical" variant="middle" flexItem style={{ borderColor: "black", margin: "5px" }} />
//             <Typography className={classes.footerLinkText}> Terms and Condition</Typography>
//           </Box>
//         </Box>
//       </Box>
//     </>
//   )
// }
// export default Footer; 