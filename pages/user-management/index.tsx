import React, { useEffect } from "react";
import { Box, Grid, Switch, useTheme, Avatar, Paper, Fab, Button, CircularProgress, Icon, Alert, AlertTitle, Fade, Menu, MenuItem, Badge, } from "@mui/material";
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
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CommonTextField from "@components/common/commonTextField";
import SelectDropDown from "@components/common/selectDropDown";
import MUIButton from "@components/common/commonButton";
import { useDispatch } from "react-redux";
import { activeInactiveUserManagment, addUserManagement, getByIdUserManagment, getUserManagmentDetails, resetAccountBalance, updateUserManagement } from "@redux/Redux/Actions";
import { tostify } from "@components/common/tostify";
import { Regex } from "@redux/utils/regex";
import ErrorHandler from "@components/common/errorHandler";
import MuiIconWrapper from "@components/common/Layout/muiIconWrapper";
import LayoutHeader from "@components/common/layoutHeader";
import { format } from "date-fns";
import CustomPagination from "@components/common/pagination";
import NoDataFound from "@components/common/noDataFound";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useRouter } from "next/router";
import TextLabel from "@components/common/commonTextLabel";
import PrivateRoute from "@redux/ProtectedRoute/PrivateRoute";
import CountryJson from "../../src/Assets/json/CountryJson.json"
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import usePageLoader from "@redux/hooks/usePageLoader";
const useStyles = makeStyles()((theme) => {
  return {
    thead: {
      "& .MuiTableCell-root": {
        border: "none !important",
        fontSize: "14px !important",
        whiteSpace: "nowrap",
      },
    },
    childHead: {
      "& .MuiTableCell-root": {
        padding: "5px !important",
        fontSize: "10px !important",
        whiteSpace: "nowrap",
      },
    },
    transitionAccordion: {
      transition: 'height 5s ease-in-out', // Adjust the duration (0.5s) as needed
      height: 0,
      overflow: 'hidden',
    },
    transitionAccordionOpen: {
      height: 'auto',
    },
    customDialogTitle: {
      padding: '0px !important',
    },
    btnFab: {
      height: '1px !important',
      minWidth: '10px',
      color: 'white',
    }
  };
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: '#0099CB',
    lineHeight: "24px",
    fontWeight: 500,
    fontSize: "14px",
    background: theme.palette.background.paper,
    border: '0px',
    padding: 10
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
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
    padding: "8px !important",
    border: "none !important",
    fontSize: "12px !important",
    fontWeight: 'bolder'
  },
}));

const StyledTableCellChild = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.bgBlack.main,
    lineHeight: "24px",
    fontWeight: 600,
    fontSize: "12px",
    background: theme.palette.bgGray.main,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRowChild = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  "& .MuiTableCell-root": {
    color: "#333333",
    padding: "5px !important",
    fontSize: "11px !important",
  },
}));

const Android12Switch = styled(Switch)(({ theme }) => ({
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

const UserManagement = () => {
  //Hooks
  const { classes } = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter()
  const setFullPageLoader = usePageLoader();

  //States
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [error, setError] = React.useState<any>({});
  console.log("error", error);

  const [data, setData] = React.useState<any>({});
  const [userManagementDetails, setUserManagementDetails] = React.useState<any>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isEdit, setIsEdit] = React.useState(false);
  const [expandedRow, setExpandedRow] = React.useState<number | null>(null);
  const [userAccountDetails, setUserAccountDetails] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [idx, setIdx] = React.useState<any>();
  const [isResetModelOpen, setIsResetModelOpen] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState("");
  const [isActiveStatus, setIsActiveStatus] = React.useState<any>("");
  const [isFilterOpen, setIsFilterOpen] = React.useState<boolean>(false);
  console.log(isActiveStatus, "isActiveStatus")
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((p: any) => ({ ...p, [name]: value }));
  };

  const roles = [{ name: "Admin", value: "0" }, { name: "User", value: "1" }]
  const tradingProgram = [{ name: "Admin", value: "0" }, { name: "Trading", value: "1" }, { name: "Director", value: "2" },]
  const countryData = CountryJson.countries

  //Handler

  const [anchorEl, setAnchorEl] = React.useState(null);
  let openStatus = Boolean(anchorEl);
  const handleStatusPopup = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseStatusPopup = () => {
    setAnchorEl(null);
  };

  const handleChangePage = (newPage: number) => { setPage(newPage); setExpandedRow(null) };
  const handleChangeRowsPerPage = (value: any) => { setRowsPerPage(value); setPage(0); setExpandedRow(null) };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setError({})
    setData({})
    setIsEdit(false);
  };


  const handleExpandRow = (rowIndex: number, item: any) => {
    setExpandedRow((prev) => (prev === rowIndex ? null : rowIndex));
    setUserAccountDetails(item?.tradingAccounts)
  };


  const validate = () => {
    let errors: any = {};
    let formIsValid = true;

    // if (!data?.role) {
    //   formIsValid = false;
    //   errors["role"] = "Please select role.";
    // }
    // if (!data?.tradingProgram) {
    //   formIsValid = false;
    //   errors["tradingProgram"] = "Please select tradingProgram.";
    // }

    if (!data?.email) {
      formIsValid = false;
      errors["email"] = "Please enter email.";
    } else if (!data?.email?.match(Regex.emailRegex)) {
      formIsValid = false;
      errors["invalidEmail"] = "* Invalid email Address";
    }
    if (!data?.firstName) {
      formIsValid = false;
      errors["firstName"] = "Please enter firstName.";
    }
    if (!data?.lastName) {
      formIsValid = false;
      errors["lastName"] = "Please enter lastName.";
    }
    if (!isEdit) {
      if (!data?.password) {
        formIsValid = false;
        errors["password"] = "Please enter password.";
      }
      if (!data?.confirmPassword) {
        formIsValid = false;
        errors["confirmPassword"] = "Please enter confirmPassword.";
      } else if (data?.password !== data?.confirmPassword) {
        formIsValid = false;
        errors["passwordsMatch"] = "Password do not match !";
      }
    }

    if (!data?.phoneNumber) {
      formIsValid = false;
      errors["phoneNumber"] = "Please enter phoneNumber.";
    }
    if (!data?.phoneNumber) {
      formIsValid = false;
      errors["phoneNumber"] = "* Enter mobile number";
    } else if (!data?.phoneNumber?.match(Regex.mobileNumberRegex)) {
      formIsValid = false;
      errors["invalidMNumber"] = "* Invalid mobile number";
    }
    // if (!data?.countryCode) {
    //   formIsValid = false;
    //   errors["countryCode"] = "Please enter country.";
    // }
    // if (!data?.state) {
    //   formIsValid = false;
    //   errors["state"] = "Please enter state.";
    // }
    // if (!data?.city) {
    //   formIsValid = false;
    //   errors["city"] = "Please enter city.";
    // }
    // if (!data?.street) {
    //   formIsValid = false;
    //   errors["street"] = "Please enter address.";
    // }
    // if (!data?.postalCode) {
    //   formIsValid = false;
    //   errors["postalCode"] = "Please enter.";
    // }

    setError(errors);
    return formIsValid;
  };
  console.log(error, "errors")
  const _addUser = async () => {
    if (validate()) {
      try {
        let body: any = {
          "title": "Mrs",
          "role": 1,
          // "tradingProgram": data?.tradingProgram,
          "email": data?.email,
          "firstName": data?.firstName,
          "lastName": data?.lastName,
          "password": data?.password,
          "phoneNumber": data?.phoneNumber,
          "country": data?.countryData,
          "countryCode": data?.countryCode,
          // "countryCode": "91",
          "state": data?.state || "",
          "city": data?.city || "",
          "street": data?.street || "",
          "postalCode": data?.postalCode || ""
        }

        if (isEdit) {
          body.id = data?.id;
        }

        const res = isEdit
          ? await dispatch(updateUserManagement(body))
          : await dispatch(addUserManagement(body));

        const error = ErrorHandler(res)
        if (error) {
          tostify(`User ${isEdit ? "updated" : "added"} successfully`, "success")
          setData({})
          handleClose();
          _getUserDetails()
        }
      } catch (error) {
        tostify("Something went wrong!", "error")
      }
    }
  }

  const _activeInactiveUserManagment = async (isActive: boolean, id: any) => {
    try {
      const result = await dispatch(activeInactiveUserManagment({
        "id": id,
        "isBlock": isActive ? false : true
      }));
      const error = ErrorHandler(result)
      if (error) {
        tostify(result?.payload?.message, "success")
        _getUserDetails()
      }
    } catch (error) {
      tostify("Something went wrong!", "error")
    }
  }

  const _getUserDetails = async () => {
    try {
      setFullPageLoader(true)
      let body: any = {
        "page": page + 1,
        "limit": rowsPerPage
      }
      if (searchText) {
        body.search = searchText
      }
      if (isActiveStatus !== "") {
        body.isBlock = isActiveStatus
      } else {
        delete body.isBlock
      }
      const result = await dispatch(getUserManagmentDetails(body));
      const error = ErrorHandler(result)
      if (error) {
        setUserManagementDetails(result?.payload?.data)
      }
      setFullPageLoader(false)
    } catch (error) {
      setFullPageLoader(false)
      tostify("Something went wrong!", "error")
    }
  }
  const _resetAccountBalance = async (userId: any, challengeUserId: any, index: any) => {
    console.log(userId, challengeUserId, "item")
    try {
      setLoading(true)
      setIdx(index)
      let body = {
        "userId": userId,
        "challengeId": challengeUserId
      }
      const result = await dispatch(resetAccountBalance(body));
      const error = ErrorHandler(result)
      if (error) {
        setIsResetModelOpen(true)
        // tostify(result?.payload?.message, "success")
        _getUserDetails()
      }
      setLoading(false)
      setIdx("")
    } catch (error) {
      tostify("Something went wrong!", "error")
      setLoading(false)
      setIdx("")
    }
  }

  const _getByIdUserManagment = async (id: any) => {
    try {
      const result = await dispatch(getByIdUserManagment(id));
      const error = ErrorHandler(result);
      if (error) {
        setIsEdit(true);
        handleOpen();
        setData({
          "id": result?.payload?.data?._id,
          "title": "Mrs",
          "role": result?.payload?.data?.role,
          "tradingProgram": result?.payload?.data?.tradingProgram,
          "email": result?.payload?.data?.email,
          "firstName": result?.payload?.data?.firstName,
          "countryData": result?.payload?.data?.country,
          "lastName": result?.payload?.data?.lastName,
          "password": result?.payload?.data?.password,
          "phoneNumber": result?.payload?.data?.phoneNumber,
          "countryCode": String(result?.payload?.data?.countryCode),
          "state": result?.payload?.data?.state,
          "city": result?.payload?.data?.city,
          "street": result?.payload?.data?.street,
          "postalCode": result?.payload?.data?.postalCode,
        });
      }
    } catch (error) {
      tostify("Something went wrong!", "error");
    }
  };
  console.log(userAccountDetails, "userAccountDetails")
  React.useEffect(() => {
    if (router.isReady) {
      _getUserDetails()
    }
  }, [rowsPerPage, page, searchText, isActiveStatus])
  console.log(isActiveStatus, "isActiveStatus")
  return (
    <>
      <PrivateRoute>
        <Layout>
          <PaperContainer bodyPadding="0px" >
            <LayoutHeader type="User" paddingLeft={"15px"} paddingBottom={"10px"} onClick={() => handleOpen()} handleSearch={(val: any) => setSearchText(val)} searchBy={["Name", "Email Id", "Phone number"]} />
            <TableContainer style={{ marginBottom: 25 }} >
              {userManagementDetails?.user_data?.length > 0 ?
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead >
                    <TableRow>
                      <StyledTableCell align="left">Name</StyledTableCell>
                      <StyledTableCell align="center">Added On</StyledTableCell>
                      <StyledTableCell align="center">Mobile Number</StyledTableCell>
                      <StyledTableCell align="center">Country</StyledTableCell>
                      <StyledTableCell align="center">Accounts</StyledTableCell>
                      <StyledTableCell align="center">
                        <Box display={'flex'} gap={1} alignItems={'center'} justifyContent={'center'}>
                          Status
                          <Button
                            size="small"
                            onClick={handleStatusPopup}
                            style={{ color: theme.palette.bgLightBlue2.main, maxWidth: '50px' }}
                            startIcon={
                              <Badge
                                color="primary"
                                variant="dot"
                                invisible={isActiveStatus === "" ? true : false}
                              >
                                <FilterAltOutlinedIcon style={{ cursor: 'pointer', fontSize: '18px' }} />
                              </Badge>
                            }
                            classes={{ root: classes.btnFab }}

                          />
                          <div>
                            <Menu
                              id="fade-menu"
                              MenuListProps={{ 'aria-labelledby': 'fade-button', }}
                              anchorEl={anchorEl}
                              open={openStatus}
                              onClose={handleCloseStatusPopup}
                              TransitionComponent={Fade}
                            >
                              {isActiveStatus !== "" && <MenuItem style={{ fontSize: '13px', color: theme.palette.bgLightBlue2.main }} onClick={() => { setIsActiveStatus(""); handleCloseStatusPopup() }}>All</MenuItem>}
                              <MenuItem style={{ fontSize: '13px' }} onClick={() => { setIsActiveStatus(false); handleCloseStatusPopup(); }}>Active</MenuItem>
                              <MenuItem style={{ fontSize: '13px' }} onClick={() => { setIsActiveStatus(true); handleCloseStatusPopup(); }}>In Active</MenuItem>
                            </Menu>
                          </div>
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className={classes.thead}>
                    {userManagementDetails?.user_data?.map((row: any, i: number) => {
                      console.log(row, "rowrow")
                      return (
                        <React.Fragment key={i}>
                          <StyledTableRow>
                            <StyledTableCell align="left">
                              <Box display="flex" gap={1}>
                                <Avatar alt={row?.firstName ? row?.firstName.toUpperCase() : ""} src={row?.employeePhoto ? row?.employeePhoto : "/"} style={{ height: '35px', width: '35px' }} />
                                <Box>
                                  <Box width={"140px"}>
                                    <TextLabel fontSize={"14px"} fontWeight={"500"} title={row?.firstName ? row?.firstName + " " + row?.lastName : "-"} />
                                  </Box>
                                  <TextLabel fontSize={"11px"} title={row?.email || "-"} />
                                </Box>
                              </Box>
                            </StyledTableCell>
                            <StyledTableCell align="center">{row?.createdAt ? format(new Date(row?.createdAt), "yyyy-MM-dd hh:mm") : "-"}</StyledTableCell>
                            <StyledTableCell align="center">{row.phoneNumber === null ? "-" : row?.countryCode + "-" + row?.phoneNumber}</StyledTableCell>
                            <StyledTableCell align="center">{row?.country}</StyledTableCell>
                            <StyledTableCell align="center" onClick={() => handleExpandRow(i, row)} style={{ cursor: 'pointer' }}>
                              <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={1}>
                                {row?.tradingAccounts?.length} {expandedRow === i ? (<KeyboardDoubleArrowDownIcon fontSize="small" color="primary" />) : (<KeyboardDoubleArrowRightIcon fontSize="small" color="primary" />)}
                              </Box>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Android12Switch onChange={(e) => _activeInactiveUserManagment(e?.target.checked, row?._id)} checked={row?.isBlock ? false : true} />
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Box display={'flex'} justifyContent={'center'} gap={1}>
                                <MuiIconWrapper icon={<ModeEditIcon fontSize="small" style={{ color: "#91D14F" }} />} sx={{ cursor: "pointer", border: `1px solid #91D14F`, backgroundColor: "#91D14F1A" }}
                                  onClick={() => _getByIdUserManagment(row?._id)} />
                              </Box>
                            </StyledTableCell>
                          </StyledTableRow>
                          {expandedRow === i && (
                            <StyledTableRowChild>
                              <StyledTableCellChild colSpan={12}>
                                <TableContainer style={{ marginBottom: 1 }} component={Paper} elevation={1}>
                                  <Table>
                                    <TableHead className={classes.childHead}>
                                      <TableRow>
                                        <StyledTableCellChild>Login</StyledTableCellChild>
                                        <StyledTableCellChild>Challenge Name</StyledTableCellChild>
                                        <StyledTableCellChild>Broker</StyledTableCellChild>
                                        <StyledTableCellChild>Current Balance</StyledTableCellChild>
                                        <StyledTableCellChild>Status


                                        </StyledTableCellChild>
                                        <StyledTableCellChild align="right">Reset Account</StyledTableCellChild>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody className={classes.thead}>
                                      {userAccountDetails?.length > 0 ? userAccountDetails?.map((acc: any, index: number) => {
                                        return (<StyledTableRowChild key={index}>
                                          <StyledTableCellChild>{acc?.login || "-"}</StyledTableCellChild>
                                          <StyledTableCellChild>{acc?.challengeUserData?.challengeName || "-"}</StyledTableCellChild>
                                          <StyledTableCellChild>Purple Trading</StyledTableCellChild>
                                          <StyledTableCellChild>{(acc?.currencyCode + " " + acc?.currentAccountBalance) || "-"}</StyledTableCellChild>
                                          <StyledTableCellChild>
                                            <TextLabel color={(acc?.challengeUserData?.status === 0 || acc?.challengeUserData?.status === 1 || acc?.challengeUserData?.status === 2) ? "orange" : "error"}
                                              variant="body2"
                                              title={acc?.challengeUserData?.status === 0 || acc?.challengeUserData?.status === 1 || acc?.challengeUserData?.status === 2 ? "On Going"
                                                : acc?.challengeUserData?.status === 3
                                                  ? "Closed"
                                                  : acc?.challengeUserData?.status === 4
                                                    ? "Failed"
                                                    : "-"
                                              }
                                            />
                                          </StyledTableCellChild>
                                          <StyledTableCellChild align="right">
                                            <Button
                                              variant="contained"
                                              style={{ borderRadius: 20, padding: "2px 10px", fontSize: '12px', background: theme.palette.bgdefultBlue.main }}
                                              color="primary"
                                              // startIcon={<RestartAltIcon />}
                                              endIcon={index === idx && loading && (<CircularProgress size="1rem" color="inherit" />)}
                                              onClick={async (e) => {
                                                e.stopPropagation();
                                                await _resetAccountBalance(row?._id, acc?.challengeUserId, index);
                                              }}
                                            >
                                              {index === idx && loading ? "Please Wait..." : "Reset"}
                                            </Button>

                                          </StyledTableCellChild>
                                        </StyledTableRowChild>)
                                      }) :
                                        <TableRow>
                                          <TableCell colSpan={12}>
                                            <NoDataFound title="No account details found!" variant="body2" icon={<ErrorOutlineIcon style={{ fontSize: '2rem', color: theme.palette.info.main }} />} elevation={0} />
                                          </TableCell>
                                        </TableRow>
                                      }
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </StyledTableCellChild>
                            </StyledTableRowChild>
                          )}
                        </React.Fragment>
                      )
                    })}
                  </TableBody>
                </Table> :
                <NoDataFound
                  icon={<ErrorOutlineIcon color="primary" style={{ fontSize: '3rem' }} />}
                  elevation={2}
                />}
            </TableContainer>
            {userManagementDetails?.state?.data_count > 0 &&
              <CustomPagination data={userManagementDetails?.user_data} count={userManagementDetails?.state?.data_count} page={page} rowsPerPage={rowsPerPage} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />}
          </PaperContainer>
        </Layout>
      </PrivateRoute >

      {isResetModelOpen && <Dialog
        fullWidth
        onClose={() => setIsResetModelOpen(false)}
        open={isResetModelOpen}
        sx={{ borderRadius: "20px" }}
      >
        <DialogTitle
          fontWeight={700}
          fontSize={16}
          className={classes.customDialogTitle}
        >
          <Alert severity="success" style={{ fontSize: '15px' }}>
            <AlertTitle style={{ fontSize: '18px' }}>Success</AlertTitle>
            Account is reset successfully. Account balace will be update after some time.
          </Alert>
        </DialogTitle >
      </Dialog >
      }

      {
        open && <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
          tradingProgram={tradingProgram}
          roles={roles}
          setData={setData}
          data={data}
          handleChange={handleChange}
          error={error}
          setError={setError}
          addUser={_addUser}
          isEdit={isEdit}
          countryData={countryData}
        />
      }

    </>
  );
};


function SimpleDialog(props: any) {
  const {
    onClose,
    open,
    setProgramCurrencyAdd,
    setProgramCurrencyDelete,
    _addChallenge,
    tradingProgram,
    roles,
    setData,
    data,
    handleChange,
    error,
    setError,
    addUser,
    isEdit,
    countryData
  } = props;

  const getDefaultValue = (options: any[], value: any) => {
    console.log(options, value, "options", data)
    const foundOption = options.find((e: any) => e.value == value);
    if (foundOption) {
      return foundOption.name;
    }
  }
  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={open}
      sx={{ borderRadius: "26px" }}
    >
      <DialogTitle
        fontWeight={700}
        fontSize={16}
        sx={{ borderBottom: "1px solid #cdcdcd" }}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={1}
      >
        {isEdit ? "Edit" : "Add New"} User Account
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          width={30}
          height={30}
          borderRadius={2}
          sx={{ backgroundColor: "#F14336", cursor: "pointer" }}
          onClick={() => onClose()}
        >
          <CloseOutlinedIcon sx={{ color: "#fff", fontSize: "18px" }} />
        </Box>
      </DialogTitle>

      <Box p={"16px 16px"}>
        <Grid container spacing={2}>
          {/* <Grid item xs={12}>
            <SelectDropDown
              text="Role"
              values={roles || []}
              name="role"
              value={getDefaultValue(roles, data?.role)}
              onChange={(e: any) => {
                setData({ ...data, role: e.target.value });
              }}
              valid
            />
            <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!data?.role ? error?.role : ""} />
          </Grid> */}
          {/* <Grid item xs={12}>
            <SelectDropDown
              text="Trading Program"
              values={tradingProgram || []}
              name="tradingProgram"
              value={getDefaultValue(tradingProgram, data?.tradingProgram)}
              onChange={(e: any) => {
                setData({ ...data, tradingProgram: e.target.value });
              }}
              valid
            />
            <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!data?.tradingProgram ? error?.tradingProgram : ""} />
          </Grid> */}
          {/* <Grid item xs={12}>
              <CommonTextField
                text="Meta Trader Version"
                placeholder="0 Days"
                name="metaTraderVersion"
                valid
                value={data.metaTraderVersion}
                onChange={handleChange}
                width="100%"
                disabled
              />
          </Grid> */}
          <Grid item xs={6}>
            <CommonTextField
              text="First Name"
              placeholder="Enter first name"
              name="firstName"
              valid
              value={data.firstName}
              onChange={handleChange}
              width="100%"
            />
            <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!data?.firstName ? error?.firstName : ""} />
          </Grid>
          <Grid item xs={6}>
            <CommonTextField
              text="Last Name"
              placeholder="Enter last name"
              name="lastName"
              valid
              value={data.lastName}
              onChange={handleChange}
              width="100%"
            />
            <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!data?.lastName ? error?.lastName : ""} />
          </Grid>
          <Grid item xs={12}>
            <CommonTextField
              text="Email"
              placeholder="Enter email"
              name="email"
              valid
              value={data?.email}
              onChange={handleChange}
              width="100%"
              onBlur={async (e: any) => {
                if (data?.email && !data?.email?.match(Regex.emailRegex)) {
                  setError({ ...error, invalidEmail: "* Invalid email address" })
                }
              }}
            />
            <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!data?.email ? error?.email : ""} />
            <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={data?.email?.match(Regex.emailRegex) ? "" : error.invalidEmail} />
          </Grid>
          {!isEdit && <>
            <Grid item xs={6}>
              <CommonTextField
                type='password'
                text="Password"
                placeholder="Enter password"
                name="password"
                valid
                value={data.password}
                onChange={handleChange}
                width="100%"
              />
              <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!data?.password ? error?.password : ""} />
            </Grid>
            <Grid item xs={6}>
              <CommonTextField
                type='password'
                text="Confirm Password"
                placeholder="Enter confirm password."
                name="confirmPassword"
                valid
                value={data.confirmPassword}
                onChange={handleChange}
                width="100%"
              />
              <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!data?.confirmPassword ? error?.confirmPassword : ""} />
              <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={data?.password === data?.confirmPassword ? "" : error?.passwordsMatch} />
            </Grid>
          </>}
          <Grid item xs={12}>
            <CommonTextField
              type="number"
              text="Phone"
              placeholder="Enter phone number"
              name="phoneNumber"
              valid
              value={data?.phoneNumber}
              onChange={(e: any) => {
                if (+e?.target?.value < 9999999999) {
                  handleChange(e)
                } else {
                  return;
                }
              }}
              width="100%"
              inputProps={{ maxlength: 10 }}
              onBlur={async (e: any) => {
                if (data?.phoneNumber && !data?.phoneNumber?.match(Regex.mobileNumberRegex)) {
                  setError({ ...error, invalidMNumber: "* Enter valid Mobile Number" });
                } else if (!data?.phoneNumber) {
                  setError({ ...error, phoneNumber: "* Enter phone number" });
                }
              }}
            />
            <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!data?.phoneNumber ? error?.phoneNumber : ""} />
            <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={data?.phoneNumber?.match(Regex.mobileNumberRegex) ? "" : error?.invalidMNumber} />


          </Grid>
          <Grid item xs={12}>
            <CommonTextField
              text="Address"
              placeholder="Enter address"
              name="street"
              value={data.street}
              onChange={handleChange}
              width="100%"
            />
            <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!data?.street ? error?.street : ""} />
          </Grid>
          <Grid item xs={6}>
            <CommonTextField
              text="City"
              placeholder="Enter city"
              name="city"
              value={data.city}
              onChange={handleChange}
              width="100%"
            />
            <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!data?.city ? error?.city : ""} />
          </Grid>
          <Grid item xs={6}>
            <CommonTextField
              text="State"
              placeholder="Enter state"
              name="state"
              value={data.state}
              onChange={handleChange}
              width="100%"
            />
            <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!data?.state ? error?.state : ""} />
          </Grid>
          <Grid item xs={6}>
            <CommonTextField
              text="Postal Code"
              placeholder="Enter postal/zip code"
              name="postalCode"
              value={data.postalCode}
              onChange={handleChange}
              width="100%"
            />
            <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!data?.postalCode ? error?.postalCode : ""} />
          </Grid>
          <Grid item xs={6}>
            <SelectDropDown
              text="Country"
              cValues={countryData || []}
              name="countryData"
              value={data?.countryData}
              onChange={(e: any) => {
                setData({ ...data, countryData: e.target.value });
              }}
            />
            <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!data?.countryCode ? error?.countryCode : ""} />
          </Grid>
          <Grid item xs={12} display={"flex"} justifyContent={"center"}>
            <MUIButton
              fullWidth={true}
              height="42px"
              width="320px"
              text={`${isEdit ? "Update" : "Add New"} User Account`}
              type="submit"
              marginTop={4}
              marginBottom={4}
              onClick={addUser}
            />
          </Grid>
        </Grid>
      </Box>
    </Dialog >
  );
}

export default UserManagement;
