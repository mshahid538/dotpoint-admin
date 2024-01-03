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
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Chip from "@mui/material/Chip";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CommonTextField from "@components/common/commonTextField";
import SelectDropDown from "@components/common/selectDropDown";
import MUIButton from "@components/common/commonButton";
import { useDispatch } from "react-redux";
import { activeInactiveUserManagment, addUserManagement, getByIdUserManagment, getChallengeApproval, getUserManagmentDetails, statusChangesRequest, updateUserManagement } from "@redux/Redux/Actions";
import { tostify } from "@components/common/tostify";
import { Regex } from "@redux/utils/regex";
import ErrorHandler from "@components/common/errorHandler";
import MuiIconWrapper from "@components/common/Layout/muiIconWrapper";
import LayoutHeader from "@components/common/layoutHeader";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { format } from "date-fns";
import CustomPagination from "@components/common/pagination";
import NoDataFound from "@components/common/noDataFound";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useRouter } from "next/router";
import TextLabel from "@components/common/commonTextLabel";
import PrivateRoute from "@redux/ProtectedRoute/PrivateRoute";
import axios from "axios";
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
    // padding: 15,
    lineHeight: "24px",
    fontWeight: 500,
    fontSize: "16px",
    background: theme.palette.background.paper,
    border: '0px',
    padding: 10
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
      const result = await dispatch(statusChangesRequest({
        "id": item?._id,
        "status": status
      }));
      const error = ErrorHandler(result)
      if (error) {
        tostify(result?.payload?.message, "success")
        _getChallengeApprovalList()
      }
    } catch (error) {
      tostify("Something went wrong!", "error")
    }
  }

  const _getChallengeApprovalList = async () => {
    try {
      setFullPageLoader(true)
      let body: any = {
        "page": page + 1,
        "limit": rowsPerPage
      }
      if (searchText) {
        body.search = searchText
      }
      const result = await dispatch(getChallengeApproval(body));
      const error = ErrorHandler(result)
      if (error) {
        setUserManagementDetails(result?.payload?.data)
      }
      setFullPageLoader(false)
    } catch (error) {
      tostify("Something went wrong!", "error")
      setFullPageLoader(false)
    }
  }


  React.useEffect(() => {
    if (router.isReady) {
      _getChallengeApprovalList()
    }
  }, [rowsPerPage, page, searchText])
  return (
    <>
      <PrivateRoute>
        <Layout>
          <PaperContainer bodyPadding="0px" >
            <LayoutHeader type="Approval Management" paddingLeft={"15px"} paddingBottom={"10px"} handleSearch={(val: any) => { setSearchText(val) }} searchBy={['Name', "Email Id"]} />
            <TableContainer style={{ marginBottom: 25 }} >
              {userManagementDetails?.challenge_approval?.length > 0 ?
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead >
                    <TableRow>
                      <StyledTableCell align="left">Name</StyledTableCell>
                      <StyledTableCell align="center">Added On</StyledTableCell>
                      <StyledTableCell align="center">Challenge Details</StyledTableCell>
                      <StyledTableCell align="center">Status</StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className={classes.thead}>
                    {userManagementDetails?.challenge_approval?.map((row: any, i: number) => {
                      console.log(row, "row?.userData?.[0]")
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
                                <TextLabel fontWeight='bold' fontSize={"11px"} title={"Login :"} />
                                <TextLabel fontSize={"12px"} title={row?.login} />
                              </Box>
                              <Box display={'flex'} gap={2} justifyContent={'space-between'}>
                                <TextLabel fontWeight='bold' fontSize={"11px"} title={"Account Balance :"} />
                                <TextLabel fontSize={"12px"} title={row?.challengeUser?.[0]?.accountBalance || "-"} />
                              </Box>
                              <Box display={'flex'} gap={2} justifyContent={'space-between'}>
                                <TextLabel fontWeight='bold' fontSize={"11px"} title={"Current Profit :"} />
                                <TextLabel fontSize={"12px"} title={row?.challengeUser?.[0]?.profit || "-"} />
                              </Box>
                              <Box display={'flex'} gap={2} justifyContent={'space-between'}>
                                <TextLabel fontWeight='bold' fontSize={"11px"} title={"Profit Target :"} />
                                <TextLabel fontSize={"12px"} title={row?.challengeUser?.[0]?.profitTarget || "-"} />
                              </Box>
                              <Box display={'flex'} gap={2} justifyContent={'space-between'}>
                                <TextLabel fontWeight='bold' fontSize={"11px"} title={"Maximum Loss :"} />
                                <TextLabel fontSize={"12px"} title={row?.challengeUser?.[0]?.maximumLoss || "-"} />
                              </Box>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row?.status !== 0 ? (row?.status === 1 ? "Approve" : row?.status === 2 ? "Rejected" : "") : row?.isStep2 ? "Request for step 2" : row?.isStep1 ? "Request for step 1" : ""}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row?.status === 0 && <Box display={'flex'} justifyContent={'center'} gap={1}>
                              <MuiIconWrapper icon={<DoneIcon style={{ color: "#91D14F" }} />} sx={{ cursor: "pointer", border: `1px solid #91D14F`, backgroundColor: "#91D14F1A" }}
                                onClick={() => _statusChangesRequest(row, 1)} />
                              <MuiIconWrapper icon={<CloseIcon style={{ color: "#F14336" }} />} sx={{ cursor: "pointer", border: `1px solid #F14336`, backgroundColor: "#f7e5e4" }}
                                onClick={() => _statusChangesRequest(row, 2)} />
                              {/* <MuiIconWrapper icon={<DeleteIcon style={{ cursor: "pointer", color: "#F14336" }} />} sx={{ border: `1px solid #F14336`, backgroundColor: "#F143361A" }} /> */}
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
            {userManagementDetails?.state?.challenge_approval > 0 &&
              <CustomPagination data={userManagementDetails?.challenge_approval} count={userManagementDetails?.state?.data_count} page={page} rowsPerPage={rowsPerPage} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />}
          </PaperContainer>
        </Layout>
      </PrivateRoute>

    </>
  );
};


export default ApprovalManagement;
