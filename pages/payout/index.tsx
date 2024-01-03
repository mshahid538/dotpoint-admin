import React, { useEffect } from "react";
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
import Chip from "@mui/material/Chip";
import LayoutHeader from "@components/common/layoutHeader";
import { Box, Divider, useTheme } from "@mui/material";
import Assets from "@components/common/image_container";
import PrivateRoute from "@redux/ProtectedRoute/PrivateRoute";
import { useDispatch } from "react-redux";
import ErrorHandler from "@components/common/errorHandler";
import { tostify } from "@components/common/tostify";
import { addPayout, getPayout } from "@redux/Redux/Actions";
import NoDataFound from "@components/common/noDataFound";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CustomPagination from "@components/common/pagination";
import usePageLoader from "@redux/hooks/usePageLoader";
import { useRouter } from "next/router";

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
    color: "#0099CB",
    padding: 10,
    lineHeight: "24px",
    fontWeight: 500,
    fontSize: "14px",
    background: theme.palette.background.paper,
    border: "0px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
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
  "& .mui-1kg957h": {
    // padding: "0"
  },
}));



const Payout = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme()
  const setFullPageLoader = usePageLoader();
  const router = useRouter();

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState<any>(0);
  const [payoutList, setPayoutList] = React.useState<any>([]);
  console.log("payoutList", payoutList);
  const [searchText, setSearchText] = React.useState<any>("");

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (value: any) => {
    setRowsPerPage(value);
    setPage(0);
  };

  const _getPayout = async () => {
    setFullPageLoader(true)
    const body: any = {
      page: page + 1,
      limit: rowsPerPage,
    };
    if (searchText) {
      body.search = searchText
    }
    try {
      const res = await dispatch(getPayout(body));
      const error = ErrorHandler(res);
      if (error) {
        setPayoutList(res?.payload?.data);
      }
      setFullPageLoader(false)
    } catch (error) {
      tostify("Something went wrong!", "error");
      setFullPageLoader(false)
    }
  };

  const _approve = async (id: any) => {
    const body = {
      id: id,
      isApproval: true,
    };

    try {
      const res = await dispatch(addPayout(body));
      const error = ErrorHandler(res);
      if (error) {
        tostify(res?.payload?.message, "success")
        _getPayout();
      }
    } catch (error) {
      tostify("Something went wrong!", "error");
    }
  };

  useEffect(() => {
    if (router.isReady) {
      _getPayout();
    }
  }, [router, rowsPerPage, page, searchText]);
  return (
    <>
      <PrivateRoute>
        <Layout>
          <PaperContainer bodyPadding="0px" border>
            <LayoutHeader type="Payout" paddingLeft={"15px"} paddingBottom={"10px"} handleSearch={(val: any) => { setSearchText(val) }} searchBy={['Name']} />
            <TableContainer style={{ marginTop: 0 }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  {payoutList?.profit_withdrawal_list_data?.length > 0 && <TableRow>
                    <StyledTableCell align="left">Name</StyledTableCell>
                    <StyledTableCell align="left">Type</StyledTableCell>
                    <StyledTableCell align="left">
                      Transaction Details
                    </StyledTableCell>
                    <StyledTableCell align="left">Amount</StyledTableCell>
                    <StyledTableCell align="left">Status</StyledTableCell>
                  </TableRow>}
                </TableHead>
                <TableBody>
                  {/* className={classes.thead} */}
                  {payoutList?.profit_withdrawal_list_data?.length > 0 ? (
                    payoutList?.profit_withdrawal_list_data?.map((row: any) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell align="left">
                          <Box>
                            {row?.userData?.firstName + " " + row?.userData?.lastName}
                          </Box>
                          <Box sx={{ fontWeight: "400", fontSize: "10px" }}>
                            {row?.userData?.email}
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row?.payoutChannel}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {/* <Box>Account Holder: {row?.accountHolder}</Box> */}
                          <Box>Bank Name:{row?.bankName}</Box>
                          <Box>Bank Account:{row?.accountNumber}</Box>
                          {/* <Box>BIC/Swift:{row?.BicSwift}</Box> */}
                          {/* <Box
                            sx={{
                              display: "flex",
                              justifyContent: "left",
                              mt: "10px",
                            }}
                          >
                            <Box>{row?.icon}</Box>
                            <Box
                              sx={{
                                marginLeft: "10px",
                                width: "300px",
                              }}
                            >
                              {row?.bankName}
                            </Box>
                          </Box> */}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          ${row?.withdrawalAmount}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Chip
                            label="Approve Request"
                            color="success"
                            sx={{
                              borderRadius: "6px",
                              height: "40px",
                              width: "170px",
                              background: "#91D14F",
                              cursor: "pointer",
                            }}
                            onClick={() => _approve(row?._id)}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={12}>
                        <NoDataFound title="No details found!" variant="body2" icon={<ErrorOutlineIcon style={{ fontSize: '2rem', color: theme.palette.info.main }} />} elevation={0} />
                      </TableCell>
                    </TableRow>

                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {payoutList?.profit_withdrawal_list_data?.length > 0 && (
              <CustomPagination
                count={payoutList?.state?.data_count}
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

export default Payout;
