import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Switch,
  useTheme,
  Typography,
  Avatar,
  FormControlLabel
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PaperContainer from "@components/common/PaperContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "tss-react/mui";
import Layout from "@components/common/Layout/layout";
import { useDispatch } from "react-redux";
import { getByIdUserManagment, getChallengeApproval, getKycVerification, statusChangesRequest, statusChangesVerification, } from "@redux/Redux/Actions";
import { tostify } from "@components/common/tostify";
import ErrorHandler from "@components/common/errorHandler";
import MuiIconWrapper from "@components/common/Layout/muiIconWrapper";
import LayoutHeader from "@components/common/layoutHeader";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { format } from "date-fns";
import CustomPagination from "@components/common/pagination";
import NoDataFound from "@components/common/noDataFound";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useRouter } from "next/router";
import TextLabel from "@components/common/commonTextLabel";
import PrivateRoute from "@redux/ProtectedRoute/PrivateRoute";
import CountryJson from "../../src/Assets/json/CountryJson.json"
import { BASE_URL_UPLOAD } from "@redux/Api/AuthApi";
import usePageLoader from "@redux/hooks/usePageLoader";

const useStyles = makeStyles()((theme) => {
  return {
    thead: {
      "& .MuiTableCell-root": {
        // padding: "10px !important",
        border: "none !important",
        fontSize: "14px !important",
        whiteSpace: "nowrap",
      },
    },
  };
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: '#0099CB',
    padding: 10,
    lineHeight: "24px",
    fontWeight: 500,
    fontSize: "16px",
    background: theme.palette.background.paper,
    border: '0px'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    padding: 10,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  "& .MuiTableCell-root": {
    color: "#333333",
    // padding: "8px !important",
    border: "none !important",
    fontSize: "14px !important",
    fontWeight: 'bolder'
  },
}));

const Android12Switch = styled(Switch)(({ theme }) => ({
  // padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '" "',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
  },
  "& .mui-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
  {
    backgroundColor: "#0099CB !important",
    opacity: 1,
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
    backgroundColor: "#FFFFFF",
  },
}));

const ApprovalManagement = () => {
  //Hooks
  const { classes } = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter()
  const setFullPageLoader = usePageLoader();

  //States
  const [userManagementDetails, setUserManagementDetails] = React.useState<any>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchText, setSearchText] = React.useState<any>("");

  //Handler

  const handleChangePage = (newPage: number) => { setPage(newPage); };
  const handleChangeRowsPerPage = (value: any) => { setRowsPerPage(value); setPage(0); };

  const _statusChangesRequest = async (item: any, status: any) => {
    try {
      const result = await dispatch(statusChangesVerification({
        "id": item?._id,
        "status": status
      }));

      const error = ErrorHandler(result)
      if (error) {
        tostify(result?.payload?.message, "success")
        _getKycVerificationList()
      }
    } catch (error) {
      tostify("Something went wrong!", "error")
    }
  }

  const _getKycVerificationList = async () => {
    try {
      setFullPageLoader(true)
      let body: any = {
        "page": page + 1,
        "limit": rowsPerPage
      }
      if (searchText) {
        body.search = searchText
      }
      const result = await dispatch(getKycVerification(body));
      const error = ErrorHandler(result)
      if (error) {
        setUserManagementDetails(result?.payload?.data)
      }
      setFullPageLoader(false)
    } catch (error) {
      setFullPageLoader(false)
      tostify("Something went wrong!", "error");
    }
  }


  React.useEffect(() => {
    if (router.isReady) {
      _getKycVerificationList()
    }
  }, [router, rowsPerPage, page, searchText])
  return (
    <>
      <PrivateRoute>
        <Layout>
          <PaperContainer bodyPadding="0px" >
            <LayoutHeader type="Verification Management" paddingLeft={"15px"} paddingBottom={"10px"} handleSearch={(val: any) => { setSearchText(val) }} searchBy={['Name', "Email Id"]} />
            <TableContainer style={{ marginBottom: 25 }} >
              {userManagementDetails?.kyc_verification_data?.length > 0 ?
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead >
                    <TableRow>
                      <StyledTableCell align="left">Name</StyledTableCell>
                      <StyledTableCell align="center">Added On</StyledTableCell>
                      <StyledTableCell align="center">Verification Details</StyledTableCell>
                      <StyledTableCell align="center">Status</StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className={classes.thead}>
                    {userManagementDetails?.kyc_verification_data?.map((row: any, i: number) => {
                      console.log(row, "row?.status")
                      return (
                        <StyledTableRow key={i}>
                          <StyledTableCell align="left">
                            <Box display="flex" gap={1}>
                              <Avatar alt={row?.userData?.firstName ? row?.userData?.firstName.toUpperCase() : ""} src={row?.userData?.image ? BASE_URL_UPLOAD + row?.userData?.image : "/"} style={{ height: '35px', width: '35px' }} />
                              <Box>
                                <Box width={"140px"}>
                                  <TextLabel fontSize={"14px"} fontWeight={"500"} title={row?.userData?.firstName ? row?.userData?.firstName + " " + row?.userData?.lastName : "-"} />
                                </Box>
                                <TextLabel fontSize={"11px"} title={row?.userData?.email || "-"} />
                              </Box>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell align="center">{row?.createdAt ? format(new Date(row?.createdAt), "yyyy-MM-dd hh:mm") : "-"}</StyledTableCell>
                          <StyledTableCell align="center" style={{ display: 'flex', justifyContent: 'center' }}>
                            <Box flexDirection={'column'} width={'200px'} >
                              <Box display={'flex'} gap={1} justifyContent={'space-between'}>
                                <TextLabel fontWeight='bold' fontSize={"11px"} title={"Order No:"} />
                                <TextLabel fontSize={"12px"} title={row?.orderNo} />
                              </Box>
                              <Box display={'flex'} gap={2} justifyContent={'space-between'}>
                                <TextLabel fontWeight='bold' fontSize={"11px"} title={"Verification No :"} />
                                <TextLabel fontSize={"12px"} title={row?.verificationNo || "-"} />
                              </Box>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row?.status !== 0 ? (row?.status === 1 ? "Approve" : row?.status === 2 ? "Rejected" : row?.status === 3 ? "Pending" : "") : "Pending"}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row?.status === 0 || row?.status === 3 && <Box display={'flex'} justifyContent={'center'} gap={1}>
                              <MuiIconWrapper icon={<DoneIcon style={{ color: "#91D14F" }} />} sx={{ cursor: "pointer", border: `1px solid #91D14F`, backgroundColor: "#91D14F1A" }}
                                onClick={() => _statusChangesRequest(row, 1)} />
                              <MuiIconWrapper icon={<CloseIcon style={{ color: "#F14336" }} />} sx={{ cursor: "pointer", border: `1px solid #F14336`, backgroundColor: "#f7e5e4" }}
                                onClick={() => _statusChangesRequest(row, 2)} />
                              <MuiIconWrapper icon={<RemoveRedEyeOutlinedIcon style={{ color: "#0099CB" }} />} sx={{ cursor: "pointer", border: `1px solid #0099CB`, backgroundColor: "#0099CB1A" }}
                                onClick={() =>
                                  router.push({
                                    pathname: "/verification-management/view-verification-deatils",
                                    query: { verificationId: row?._id }
                                  },
                                  )
                                  // router.push_getByIdChallenge(row?._id)
                                } />
                            </Box>}

                          </StyledTableCell>
                        </StyledTableRow>
                      )
                    })}
                  </TableBody>
                </Table> :
                <NoDataFound
                  icon={<ErrorOutlineIcon color="primary" style={{ fontSize: '2rem', color: theme.palette.info.main }} />}
                  elevation={2}
                />}
            </TableContainer>
            {userManagementDetails?.kyc_verification_data?.length > 0 &&
              <CustomPagination data={userManagementDetails?.kyc_verification_data} count={userManagementDetails?.state?.data_count} page={page} rowsPerPage={rowsPerPage} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />}
          </PaperContainer>
        </Layout>
      </PrivateRoute>

    </>
  );
};


export default ApprovalManagement;
