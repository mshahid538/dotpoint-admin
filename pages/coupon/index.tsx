import React, { useEffect, useState } from "react";
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
import { Box, Divider, Input, InputLabel, Switch, useTheme } from "@mui/material";
import Assets from "@components/common/image_container";
import PrivateRoute from "@redux/ProtectedRoute/PrivateRoute";
import { useDispatch } from "react-redux";
import ErrorHandler from "@components/common/errorHandler";
import { tostify } from "@components/common/tostify";
import { addCoupon, getCoupon, updateCoupon } from "@redux/Redux/Actions";
import NoDataFound from "@components/common/noDataFound";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CustomPagination from "@components/common/pagination";
import usePageLoader from "@redux/hooks/usePageLoader";
import AddCoupon from "./AddCoupon";
import { useRouter } from "next/router";
import { formatDateAndTime } from "@redux/utils/formatDate";
import { Save } from "@mui/icons-material";

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

const coupon = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    const setFullPageLoader = usePageLoader();
    const router = useRouter();

    const [updateCouponsList, setUpdateCouponsList] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState<any>(0);
    const [couponList, setcouponList] = React.useState<any>([]);
    const [searchText, setSearchText] = React.useState<any>("");
    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (value: any) => {
        setRowsPerPage(value);
        setPage(0);
    };

    const _getcoupon = async () => {
        setFullPageLoader(true);
        const body: any = {
            page: page + 1,
            limit: rowsPerPage,
        };
        if (searchText) {
            body.search = searchText;
        }
        try {
            const res = await dispatch(getCoupon(body));
            const error = ErrorHandler(res);
            if (error) {
                setcouponList(res?.payload?.data);
            }
            setFullPageLoader(false);
        } catch (error) {
            tostify("Something went wrong!", "error");
            setFullPageLoader(false);
        }
    };

    useEffect(() => {
        if (router.isReady) {
            _getcoupon();
        }
    }, [router, rowsPerPage, page, searchText, updateCouponsList]);
    return (
        <>
            <PrivateRoute>
                <Layout>
                    <PaperContainer bodyPadding="0px" border>
                        <LayoutHeader
                            type="coupon"
                            paddingLeft={"15px"}
                            paddingBottom={"10px"}
                            handleSearch={(val: any) => {
                                setSearchText(val);
                            }}
                            searchBy={["code"]}
                        />
                        <TableContainer style={{ marginTop: 0 }}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    {couponList?.length > 0 && (
                                        <TableRow>
                                            <StyledTableCell align="left">Coupon Code</StyledTableCell>
                                            <StyledTableCell align="left">Discount percentage</StyledTableCell>
                                            <StyledTableCell align="left">Expire At</StyledTableCell>
                                            <StyledTableCell align="left">Status</StyledTableCell>
                                        </TableRow>
                                    )}
                                </TableHead>
                                <TableBody>
                                    {/* className={classes.thead} */}
                                    {couponList?.length > 0 ? (
                                        couponList?.map((row: any) => <TableRowComp data={row} />)
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={12}>
                                                <NoDataFound
                                                    title="No details found!"
                                                    variant="body2"
                                                    icon={
                                                        <ErrorOutlineIcon
                                                            style={{ fontSize: "2rem", color: theme.palette.info.main }}
                                                        />
                                                    }
                                                    elevation={0}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {couponList?.length > 0 && (
                            <CustomPagination
                                count={couponList?.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                onPageChange={handleChangePage}
                            />
                        )}
                        <AddCoupon setUpdateCouponsList={setUpdateCouponsList} />
                    </PaperContainer>
                </Layout>
            </PrivateRoute>
        </>
    );
};

const TableRowComp = ({ data }: any) => {
    const [checked, setChecked] = useState(data.isActive);
    const [name, setName] = useState(data.code);
    const [expAt, setExpAt] = useState();
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingExp, setIsEditingExp] = useState(false);
    const dispatch = useDispatch();

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

    const _update = async (id: any, isActive: boolean) => {
        const body = {
            couponId: id,
            isActive: `${isActive}`,
        };
        setChecked(!checked);
        try {
            const res = await dispatch(updateCoupon(body));
            const error = ErrorHandler(res);
            if (error) {
                tostify(res?.payload?.message, "success");
            }
        } catch (error) {
            setChecked(!checked);
            tostify("Something went wrong!", "error");
        }
    };

    return (
        <StyledTableRow key={data.code}>
            <StyledTableCell onDoubleClick={() => setIsEditingName(!isEditingName)} align="left">
                {isEditingName ? (
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                ) : (
                    <Box>{data?.code}</Box>
                )}
            </StyledTableCell>
            <StyledTableCell align="left">{data?.amount} % off</StyledTableCell>
            <StyledTableCell align="left">{formatDateAndTime(data?.expAt)}</StyledTableCell>
            <StyledTableCell align="left">
                <Switch
                    color="primary"
                    sx={{
                        borderRadius: "6px",
                        height: "40px",
                        cursor: "pointer",
                    }}
                    checked={checked}
                    onClick={() => {
                        _update(data._id, !checked);
                    }}
                />
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default coupon;
