import React, { useEffect } from "react";
import { Box, Button, Divider, TextField, Typography, useTheme } from "@mui/material";
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
import { getCustomerSupport, getServer } from "@redux/Redux/Actions";
import { useRouter } from "next/router";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LayoutHeader from "@components/common/layoutHeader";
import NoDataFound from "@components/common/noDataFound";
import CustomPagination from "@components/common/pagination";
import { tostify } from "@components/common/tostify";
import ErrorHandler from "@components/common/errorHandler";
import PrivateRoute from "@redux/ProtectedRoute/PrivateRoute";
import { BASE_URL_UPLOAD } from "@redux/Api/AuthApi";

const useStyles = makeStyles()((theme) => {
  return {
    thead: {
      "& .MuiTableCell-root": {
        // padding: "10px !important",
        border: "none !important",
        fontSize: "14px !important",
        whiteSpace: "nowrap",
        // width: "auto",
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
    fontSize: "16px",
    background: theme.palette.background.paper,
    border: "0px",
    whiteSpace: "nowrap",
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
    fontSize: "14px !important",
    fontWeight: "bolder",
  },
}));

const CustomerSupport = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const theme = useTheme()
  const [challengeData, setChallengeData] = React.useState<any>({});
  const [serverDetailsOption, setServerDetailsOption] = React.useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState<any>(0);

  const _getChallenge = async () => {
    const body = {
      page: page + 1,
      limit: rowsPerPage,
    };
    try {
      const res = await dispatch(getCustomerSupport(body));
      const error = ErrorHandler(res);
      if (error) {
        setChallengeData(res?.payload?.data);
      }
    } catch (error) {
      tostify("Something went wrong!", "error");
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
  }, [router, rowsPerPage, page]);

  useEffect(() => {
    if (router.isReady) {
      _getServer();
    }
  }, [router]);

  return (
    <>
      <PrivateRoute>
        <Layout>
          <PaperContainer bodyPadding="0px">
            <LayoutHeader
              type="Customer Support"
              paddingLeft={"15px"}
              paddingBottom={"10px"}
            />
            <TableContainer style={{ marginTop: 0 }}>
              {challengeData?.customer_support_list_data?.length > 0 ? (
                <Table
                  sx={{ minWidth: { md: "700", sm: "200" } }}
                  aria-label="customized table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">Name</StyledTableCell>
                      <StyledTableCell align="center">Subject</StyledTableCell>
                      <StyledTableCell align="center">Content</StyledTableCell>
                      <StyledTableCell align="center">Attachment</StyledTableCell>
                      {/* <StyledTableCell align="center">Action</StyledTableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody className={classes?.thead}>
                    {challengeData?.customer_support_list_data?.map(
                      (row: any) => (
                        <StyledTableRow key={row?._id}>
                          <StyledTableCell align="left">
                            <Box>
                              {row?.customerData?.[0]?.firstName +
                                " " +
                                row?.customerData?.[0]?.lastName}
                            </Box>
                            <Box sx={{ fontWeight: "400", fontSize: "10px" }}>
                              {row?.customerData?.[0]?.email || "-"}
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.subject}
                          </StyledTableCell>
                          <StyledTableCell align="center" >
                            <Typography width={"400px"} whiteSpace={"pre-wrap"} style={{ lineBreak: 'anywhere' }} fontSize={"12px"}>
                              {row.content}
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <img
                              width={"100px"}
                              height={"60px"}
                              src={`${BASE_URL_UPLOAD}${row?.attachments?.[0]}`}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              ) : (
                <NoDataFound
                  icon={
                    <ErrorOutlineIcon
                      style={{ fontSize: '2rem', color: theme.palette.info.main }}
                    />
                  }
                  elevation={2}
                />
              )}
            </TableContainer>
            {challengeData?.customer_support_list_data?.length > 0 && (
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

export default CustomerSupport;
