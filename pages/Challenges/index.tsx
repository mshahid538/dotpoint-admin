import React, { useEffect } from "react";
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
  Select,
  Switch,
  TextField,
  Typography,
  useTheme,
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
import Chip from "@mui/material/Chip";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useDispatch } from "react-redux";
import {
  addChallenge,
  deleteChallenge,
  editChallenge,
  getByIdChallenge,
  getChallenge,
  getServer,
} from "@redux/Redux/Actions";
import { useRouter } from "next/router";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import LayoutHeader from "@components/common/layoutHeader";
import MuiIconWrapper from "@components/common/Layout/muiIconWrapper";
import SelectDropDown from "@components/common/selectDropDown";
import NoDataFound from "@components/common/noDataFound";
import CustomPagination from "@components/common/pagination";
import { tostify } from "@components/common/tostify";
import ErrorHandler from "@components/common/errorHandler";
import CommonTextField from "@components/common/commonTextField";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import TextLabel from "@components/common/commonTextLabel";
import PrivateRoute from "@redux/ProtectedRoute/PrivateRoute";
import usePageLoader from "@redux/hooks/usePageLoader";

const useStyles = makeStyles()((theme) => {
  return {
    thead: {
      "& .MuiTableCell-root": {
        // padding: "10px !important",
        border: "none !important",
        fontSize: "14px !important",
        // width: "auto",
      },
    },
  };
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: "#0099CB",
    // padding: 15,
    lineHeight: "24px",
    fontWeight: 500,
    fontSize: "14px",
    background: theme.palette.background.paper,
    border: "0px",
    whiteSpace: "nowrap",
    padding: 10
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "& .MuiTableCell-root": {
    color: "#333333",
    // padding: "8px !important",
    border: "none !important",
    fontSize: "12px !important",
    fontWeight: "bolder",
  },
}));

const programTradingTypeOption = [
  { name: "Meta 1", value: "0" },
  { name: "Meta 2", value: "1" },
];

const currencyTypeOption = [
  { name: "usd", value: "0" },
  { name: "eur", value: "1" },
  { name: "rmd", value: "2" },
  { name: "hkd", value: "3" },
  { name: "twd", value: "4" },
  { name: "sgd", value: "5" },
];

const getDefaultValue = (options: any[], value: any) => {
  const foundOption = options?.length > 0 && options?.find((e: any) => e.value == value);
  if (foundOption) {
    return foundOption.name;
  }
};

const Challenges = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const theme = useTheme()
  const setFullPageLoader = usePageLoader();

  const [challengeData, setChallengeData] = React.useState<any>({});
  const [serverDetailsOption, setServerDetailsOption] = React.useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState<any>(0);
  const [searchText, setSearchText] = React.useState<any>("");

  const _getChallenge = async () => {
    setFullPageLoader(true)
    const body: any = {
      page: page + 1,
      limit: rowsPerPage,
    };
    if (searchText) {
      body.search = searchText
    }
    try {
      const res = await dispatch(getChallenge(body));
      const error = ErrorHandler(res);
      if (error) {
        setChallengeData(res?.payload?.data);
      }
      setFullPageLoader(false)
    } catch (error) {
      tostify("Something went wrong!", "error");
      setFullPageLoader(false)
    }
  };

  const _getServer = async () => {
    try {
      const res = await dispatch(getServer());
      const error = ErrorHandler(res);
      if (error) {
        setServerDetailsOption(res?.payload?.data);
      }
    } catch (error) {
      tostify("Something went wrong!", "error");
    }
  };


  const _deleteChallenge = async (id: any) => {
    try {
      const res = await dispatch(deleteChallenge(id));
      if (res?.payload?.status === 200) {
        const error = ErrorHandler(res);
        if (error) {
          tostify("Delete challenge successful!", "success");
          _getChallenge();
        }
      }
    } catch (error) {
      tostify("Something went wrong!", "error");
    }
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (value: any) => {
    setRowsPerPage(value);
    setPage(0);
  };

  useEffect(() => {
    if (router.isReady) {
      _getChallenge();
    }
  }, [router, rowsPerPage, page, searchText]);

  useEffect(() => {
    if (router.isReady) {
      _getServer();
    }
  }, [router]);

  const transformData = () => {
    const transformedData = serverDetailsOption?.length > 0 && serverDetailsOption?.map((item: any) => ({
      name: item.serverName,
      value: item.serverName?.toString(),
    }));
    return transformedData;
  };

  const transformedData = transformData();

  return (
    <>
      <PrivateRoute>
        <Layout>
          <PaperContainer bodyPadding="0px" >
            <LayoutHeader type="Challenges" paddingLeft={"15px"} paddingBottom={"10px"} onClick={() => router.push('/Challenges/addChallenge')}
              handleSearch={(val: any) => { setSearchText(val) }} searchBy={['Challenge name']}
            />
            <TableContainer style={{ marginTop: 0 }}>
              {challengeData?.challenge_list_data?.length > 0 ? <Table sx={{ minWidth: { md: "700", sm: '200' } }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Name</StyledTableCell>
                    <StyledTableCell align="center">Description</StyledTableCell>
                    <StyledTableCell align="center">
                      Minimum Trading Days
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Trading Period Days
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Trader Profit
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Company Profit
                    </StyledTableCell>
                    {/* <StyledTableCell align="center">Status</StyledTableCell> */}
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={classes?.thead}>
                  {
                    challengeData?.challenge_list_data?.map((row: any) => (
                      <StyledTableRow key={row?._id}>
                        <StyledTableCell align="left">
                          {row?.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.description}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.minimumTradingDays}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.tradingPeriodDays}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.userPercentage}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.platformPercentage}
                        </StyledTableCell>
                        {/* <StyledTableCell align="center">
                        <Chip
                          label="Enabled"
                          color="success"
                          sx={{
                            borderRadius: "6px",
                            height: "40px",
                            width: "120px",
                            background: "#91D14F",
                          }}
                        />
                      </StyledTableCell> */}
                        <StyledTableCell align="right">
                          <Box display={"flex"} justifyContent={"center"} gap={1}>
                            <MuiIconWrapper
                              icon={
                                <ModeEditIcon
                                  style={{ cursor: "pointer", color: "#91D14F" }}
                                />
                              }
                              sx={{
                                border: `1px solid #91D14F`,
                                backgroundColor: "#91D14F1A",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                router.push({
                                  pathname: "/Challenges/addChallenge",
                                  query: { updateId: row?._id }
                                },
                                )
                                // router.push_getByIdChallenge(row?._id)
                              }
                            />
                            <MuiIconWrapper
                              icon={
                                <DeleteIcon
                                  style={{ cursor: "pointer", color: "#F14336" }}
                                />
                              }
                              sx={{
                                border: `1px solid #F14336`,
                                backgroundColor: "#F143361A",
                                cursor: "pointer",
                              }}
                              onClick={() => _deleteChallenge(row?._id)}
                            />
                          </Box>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table> :
                <NoDataFound
                  icon={<ErrorOutlineIcon style={{ fontSize: '2rem', color: theme.palette.info.main }} />}
                  elevation={2}
                />}
            </TableContainer>
            {challengeData?.challenge_list_data?.length > 0 && (
              <CustomPagination
                count={challengeData?.state?.data_count}
                rowsPerPage={rowsPerPage}
                page={page}
                onRowsPerPageChange={handleChangeRowsPerPage}
                onPageChange={handleChangePage}
              />
            )}
          </PaperContainer>
        </Layout>

      </PrivateRoute>
    </>
  );
};

export default Challenges;
