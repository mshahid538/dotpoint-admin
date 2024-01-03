import React, { useEffect } from "react";
import { Box, Button, Paper, Tooltip, Typography, useTheme } from "@mui/material";
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
import { getTradingObjectives } from "@redux/Redux/Actions";
import { useRouter } from "next/router";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import NoDataFound from "@components/common/noDataFound";
import CustomPagination from "@components/common/pagination";
import { tostify } from "@components/common/tostify";
import ErrorHandler from "@components/common/errorHandler";
import PrivateRoute from "@redux/ProtectedRoute/PrivateRoute";
import LayoutHeader from "@components/common/layoutHeader";
import usePageLoader from "@redux/hooks/usePageLoader";

const useStyles = makeStyles()((theme) => {
  return {
    thead: {
      "& .MuiTableCell-root": {
        // padding: "10px !important",
        // border: "none !important",
        fontSize: "14px !important",
        // width: "auto",
      },
    },
  };
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: "#0099CB",
    padding: '0px 10px !important',
    lineHeight: "24px",
    fontWeight: 500,
    fontSize: "14px",
    borderRight: "1px solid lightGray",
    whiteSpace: "nowrap",
  },
  ':last-child': {
    borderRight: 0,
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
  "& .MuiTableCell-root": {
    color: "#333333",
    padding: "9px !important",
    borderRight: "1px solid lightGray",
    fontSize: "12px !important",
    fontWeight: "bolder",
    // background: theme.palette.background.paper,

  },
}));

const StyledTableCellSubheader = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: "#0099CB",
    padding: '10px !important',
    lineHeight: "24px",
    fontWeight: 500,
    fontSize: "14px",
    whiteSpace: "nowrap",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRowSubheader = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "& .MuiTableCell-root": {
    color: "#333333",
    padding: "0px !important",
    fontSize: "12px !important",
    fontWeight: "bolder",
    width: '90px'
  },
}));
const StyledTableRowHeadSubheader = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {
    border: "0px solid lightGray",
  },
  "& .MuiTableCell-root": {
    padding: "5px !important",
    fontSize: "12px !important",
    width: '90px'
  },
}));


const TradingObjectives = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const theme = useTheme()
  const setFullPageLoader = usePageLoader();

  const [tradingObjectiveConfig, setTradingObjectiveConfig] = React.useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState<any>(0);
  const [searchText, setSearchText] = React.useState<any>("");

  const _getTradingObjectives = async () => {
    setFullPageLoader(true)
    const body: any = {
      page: page + 1,
      limit: rowsPerPage,
    };
    if (searchText) {
      body.search = searchText
    }
    try {
      const res = await dispatch(getTradingObjectives(body));
      const error = ErrorHandler(res);
      if (error) {
        setTradingObjectiveConfig(res?.payload?.data);
      }
      setFullPageLoader(false)
    } catch (error) {
      tostify("Something went wrong!", "error");
      setFullPageLoader(false)
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
      _getTradingObjectives();
    }
  }, [router, rowsPerPage, page, searchText]);



  return (
    <>
      <PrivateRoute>
        <Layout>
          <PaperContainer bodyPadding="0px" border>
            <LayoutHeader type="Trading Objectives" paddingLeft={"15px"} paddingBottom={"10px"} handleSearch={(val: any) => { setSearchText(val) }} searchBy={['User name', "Account number"]} />
            <TableContainer>
              <Table sx={{ minWidth: { md: "700", sm: '200' } }} aria-label="customized table">
                {tradingObjectiveConfig?.challenge_user_data?.length > 0 && <TableHead>
                  <TableRow>
                    <StyledTableCell align="left" colSpan={1}>User</StyledTableCell>
                    <StyledTableCell align="center" colSpan={1}>Account</StyledTableCell>
                    <StyledTableCell align="center" colSpan={1}>Plan</StyledTableCell>
                    <StyledTableCell align="center" colSpan={1}>Phase</StyledTableCell>
                    <StyledTableCell align="center" colSpan={3}>Max Daily Loss
                      <StyledTableRowHeadSubheader>
                        <StyledTableCellSubheader align="center">Result</StyledTableCellSubheader>
                        <StyledTableCellSubheader align="center">Target</StyledTableCellSubheader>
                        <StyledTableCellSubheader align="center">Percentage</StyledTableCellSubheader>
                      </StyledTableRowHeadSubheader>
                    </StyledTableCell>
                    <StyledTableCell align="center" colSpan={3}>Max Loss
                      <StyledTableRowHeadSubheader>
                        <StyledTableCellSubheader align="center">Result</StyledTableCellSubheader>
                        <StyledTableCellSubheader align="center">Target</StyledTableCellSubheader>
                        <StyledTableCellSubheader align="center">Percentage</StyledTableCellSubheader>
                      </StyledTableRowHeadSubheader>
                    </StyledTableCell>
                    <StyledTableCell align="center" colSpan={3}>Profit
                      <StyledTableRowHeadSubheader>
                        <StyledTableCellSubheader align="center">Result</StyledTableCellSubheader>
                        <StyledTableCellSubheader align="center">Target</StyledTableCellSubheader>
                        <StyledTableCellSubheader align="center">Percentage</StyledTableCellSubheader>
                      </StyledTableRowHeadSubheader>
                    </StyledTableCell>
                    <StyledTableCell align="center" colSpan={3}>Trading Days
                      <StyledTableRowHeadSubheader>
                        <StyledTableCellSubheader align="center">Result</StyledTableCellSubheader>
                        <StyledTableCellSubheader align="center">Min/Max</StyledTableCellSubheader>
                      </StyledTableRowHeadSubheader>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>}
                <TableBody className={classes?.thead}>
                  {tradingObjectiveConfig?.challenge_user_data?.length > 0 ? tradingObjectiveConfig?.challenge_user_data?.map((row: any) => {
                    console.log(row, "rowrowrow")
                    return (
                      <StyledTableRow key={row?._id}>
                        <StyledTableCell align="left">
                          {row?.userData?.firstName ? row?.userData?.firstName + " " + row?.userData?.lastName : "-"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.login || "-"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.challengeData?.name || "-"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {(row?.tradingAccountData?.step1Completed === true && row?.tradingAccountData?.step1Status === 1) ? 2 : 1}
                        </StyledTableCell>
                        <TableCell align="center" colSpan={3}>
                          <StyledTableRowSubheader>
                            <StyledTableCell align="center" style={{ color: row?.maxDailyLossObjective?.value < 0 ? theme.palette.error.main : 'inherit' }}>{row?.maxDailyLossObjective?.value?.toFixed(2)}</StyledTableCell>
                            <StyledTableCell align="center">{row?.maximumDayLoss}</StyledTableCell>
                            <StyledTableCell align="center" style={{ color: row?.maxDailyLossObjective?.percentage < 0 ? theme.palette.error.main : 'inherit' }}>{row?.maxDailyLossObjective?.percentage?.toFixed(2) + "%"}</StyledTableCell>
                          </StyledTableRowSubheader>
                        </TableCell>
                        <StyledTableCell align="center" colSpan={3}>
                          <StyledTableRowSubheader>
                            <StyledTableCell align="center" style={{ color: row?.maxLossObjective?.value < 0 ? theme.palette.error.main : 'inherit' }}>{row?.maxLossObjective?.value?.toFixed(2)}</StyledTableCell>
                            <StyledTableCell align="center">{row?.maximumLoss}</StyledTableCell>
                            <StyledTableCell align="center" style={{ color: row?.maxLossObjective?.percentage < 0 ? theme.palette.error.main : 'inherit' }}>{row?.maxLossObjective?.percentage?.toFixed(2) + "%"}</StyledTableCell>
                          </StyledTableRowSubheader>
                        </StyledTableCell>
                        <StyledTableCell align="center" colSpan={3}>
                          <StyledTableRowSubheader>
                            <StyledTableCell align="center" style={{ color: row?.profitObjective?.value < 0 ? theme.palette.error.main : 'inherit' }}>{row?.profitObjective?.value?.toFixed(2)}</StyledTableCell>
                            <StyledTableCell align="center">{row?.profitTarget}</StyledTableCell>
                            <StyledTableCell align="center" style={{ color: row?.profitObjective?.percentage < 0 ? theme.palette.error.main : 'inherit' }}>{row?.profitObjective?.percentage?.toFixed(2) + "%"}</StyledTableCell>
                          </StyledTableRowSubheader>
                        </StyledTableCell>
                        <StyledTableCell align="center" colSpan={3}>
                          <StyledTableRowSubheader>
                            <StyledTableCell align="center">{row?.minimumDayObjective?.completedDays}</StyledTableCell>
                            <StyledTableCell align="center">{row?.minimumTradingDays + "/" + row?.tradingPeriodDays}</StyledTableCell>
                          </StyledTableRowSubheader>
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                  }) : <TableRow>
                    <TableCell colSpan={12}>
                      <NoDataFound title="No details found!" variant="body2" icon={<ErrorOutlineIcon style={{ fontSize: '2rem', color: theme.palette.info.main }} />} elevation={0} />
                    </TableCell>
                  </TableRow>}
                </TableBody>
              </Table>

            </TableContainer>
            {tradingObjectiveConfig?.challenge_user_data?.length > 0 && (
              <CustomPagination
                count={tradingObjectiveConfig?.state?.data_count}
                rowsPerPage={rowsPerPage}
                page={page}
                onRowsPerPageChange={handleChangeRowsPerPage}
                onPageChange={handleChangePage}
              />
            )}

          </PaperContainer>
        </Layout>

      </PrivateRoute >
    </>
  );
};

export default TradingObjectives;
