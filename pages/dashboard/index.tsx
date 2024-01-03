import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import Layout from "@components/common/Layout/layout";
import { lightTheme } from "@redux/theme";
import Assets from "@components/common/image_container";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import ChartComponent from "@components/chart";
import PaperContainer from "@components/common/PaperContainer";
import TextLabel from "@components/common/commonTextLabel";
import PrivateRoute from "@redux/ProtectedRoute/PrivateRoute";
import { useDispatch } from "react-redux";
import ErrorHandler from "@components/common/errorHandler";
import { tostify } from "@components/common/tostify";
import { getDashboard } from "@redux/Redux/Actions";
import { useRouter } from "next/router";
const useStyles = makeStyles()((theme) => {
  return {
    maritBox: {
      padding: "12px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
  };
});
const Dashboard = (rowsPerPage: any) => {
  const router = useRouter()
  const dispatch = useDispatch();
  const [dashboardData, setDashboardData] = useState<any>([]);

  const _getDashboard = async () => {
    try {
      const res = await dispatch(getDashboard());
      const error = ErrorHandler(res);
      if (error) {
        setDashboardData(res?.payload?.data);
      }else{

      }
    } catch (error) {
      tostify("Something went wrong!", "error");
    }
  };

  useEffect(() => {
    _getDashboard();
  }, []);

  return (
    <>
      <PrivateRoute>
        <Layout>
          <TextLabel
            fontSize={"20px"}
            fontWeight={"600"}
            title={"Welcome Name!"}
          />
          <Grid container spacing={4} marginTop={2}>
            <Grid item xs={12} lg={3} md={4} sm={6}>
              <CommonDashboard
                label={"Logins"}
                router={router}
                totalAmount={dashboardData?.user || 0}
                icon={
                  <Assets
                    src={"/assets/icons/dashboardicon1.svg"}
                    absolutePath={true}
                    width={"100%"}
                    height={"100%"}
                  />
                }
                iconBgColor={lightTheme.palette.bgWhite.main}
                bgColor="#458BF2"
                link="/user-management"
              />
            </Grid>
            <Grid item xs={12} lg={3} md={4} sm={6}>
              <CommonDashboard
                label={"Passed First Stage"}
                totalAmount={dashboardData?.passed_first_challenge || 0}
                icon={
                  <Assets
                    src={"/assets/icons/dashboardicon3.svg"}
                    absolutePath={true}
                    width={"100%"}
                    height={"100%"}
                  />
                }
                iconBgColor={lightTheme.palette.bgWhite.main}
                bgColor="#9D8DFC"
                link="/Challenges"
              />
            </Grid>
            <Grid item xs={12} lg={3} md={4} sm={6}>
              <CommonDashboard
                label={"Passed Second Stage"}
                totalAmount={dashboardData?.passed_secound_challenge || 0}
                icon={
                  <Assets
                    src={"/assets/icons/dashboardicon3.svg"}
                    absolutePath={true}
                    width={"100%"}
                    height={"100%"}
                  />
                }
                iconBgColor={lightTheme.palette.bgWhite.main}
                bgColor="#91D14F"
                link="/Challenges"
              />
            </Grid>
            <Grid item xs={12} lg={3} md={4} sm={6}>
              <CommonDashboard
                label={"New Challenges"}
                totalAmount={dashboardData?.new_challenge || 0}
                icon={
                  <Assets
                    src={"/assets/icons/dashboardicon4.svg"}
                    absolutePath={true}
                    width={"100%"}
                    height={"100%"}
                  />
                }
                iconBgColor={lightTheme.palette.bgWhite.main}
                bgColor="#FFBC3B"
                link="/Challenges"
              />
            </Grid>
            <Grid item xs={12} lg={3} md={4} sm={6}>
              <CommonDashboard
                label={"Funded Traders"}
                totalAmount={dashboardData?.funded_tadders || 0}
                icon={
                  <Assets
                    src={"/assets/icons/dashboardicon4.svg"}
                    absolutePath={true}
                    width={"100%"}
                    height={"100%"}
                  />
                }
                iconBgColor={lightTheme.palette.bgWhite.main}
                bgColor="#0099CB"
                link="/Challenges"
              />
            </Grid>
            <Grid item xs={12} lg={3} md={4} sm={6}>
              <CommonDashboard
                label={"Paid To Funded Traders"}
                totalAmount={dashboardData?.paid_to_funded_tadders || 0}
                icon={
                  <Assets
                    src={"/assets/icons/dashboardicon4.svg"}
                    absolutePath={true}
                    width={"100%"}
                    height={"100%"}
                  />
                }
                iconBgColor={lightTheme.palette.bgWhite.main}
                bgColor="#F48888"
                link="/Challenges"
              />
            </Grid>
            {/* <Grid item xs={12} lg={3} md={4} sm={6}>
              <CommonDashboard
                label={"Paid To Funded Traders"}
                totalAmount={"300"}
                icon={
                  <Assets
                    src={"/assets/icons/dashboardicon4.svg"}
                    absolutePath={true}
                    width={"100%"}
                    height={"100%"}
                  />
                }
                iconBgColor={lightTheme.palette.bgWhite.main}
                bgColor="#E588F4"
              />
            </Grid> */}
          </Grid>
          {/* <PaperContainer style={{ marginTop: "30px" }} title="Economics">
            <Grid container spacing={1} p={1}>
              <Grid item xs={12} marginTop={2}>
                <ChartComponent data={dashboardData?.economics}/>
              </Grid>
            </Grid>
          </PaperContainer> */}
        </Layout>
      </PrivateRoute>
    </>
  );
};

export default Dashboard;
export const CommonDashboard = ({
  totalAmount,
  label,
  icon,
  borderColor,
  iconBgColor,
  iconColor,
  bgColor,
  link,
  router,
  handleClick,
}: any) => {
  const { classes } = useStyles();

  return (
    <>
      <Box
        height={"100%"}
        style={{
          borderLeft: `5px solid ${borderColor}`,
          borderRadius: "16px",
          borderTop: "none !important",
          borderRight: "none !important",
          borderBottom: "none !important",
          background: bgColor,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box onClick={handleClick} className={classes.maritBox}>
          <Box display={"flex"} alignItems={"center"} gap={"px"}>
            <Box display={"flex"} flexDirection={"column"}>
              <TextLabel
                fontSize={"32px"}
                fontWeight={"700"}
                color={"#FFF"}
                title={totalAmount}
              />
              <TextLabel fontSize={"14px"} color={"#F4F6FA"} title={label} />
            </Box>
          </Box>
          <Box
            style={{
              fontSize: "6px",
              fontWeight: 800,
              color: iconColor,
              borderRadius: "50%",
              backgroundColor: iconBgColor,
              padding: 12,
              width: "30px",
              height: "30px",
              textAlign: "center",
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        </Box>
        {/* <Divider sx={{ borderColor:"rgba(255, 255, 255, 0.25)" }} /> */}
        <Box
          style={{
            padding: "12px 24px",
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #ffffff40",
            cursor:"pointer"
          }}
          onClick={() => router?.push(link)}
        >
          <TextLabel
            fontSize={"12px"}
            fontWeight={"500"}
            color={"#FFF"}
            title={"View All"}
          />
          <Assets
            src={"/assets/icons/dashboardviewicon.svg"}
            absolutePath={true}
          />
        </Box>
      </Box>
    </>
  );
};
