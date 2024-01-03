import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Grid,
    Switch,
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
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useDispatch } from "react-redux";
import {
    addCurrency,
    deleteCurrency,
    updateCurrency,
    getServer,
    uploadImg,
    listCurrency,
} from "@redux/Redux/Actions";
import { useRouter } from "next/router";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LayoutHeader from "@components/common/layoutHeader";
import MuiIconWrapper from "@components/common/Layout/muiIconWrapper";
import NoDataFound from "@components/common/noDataFound";
import CustomPagination from "@components/common/pagination";
import { tostify } from "@components/common/tostify";
import ErrorHandler from "@components/common/errorHandler";
import CommonTextField from "@components/common/commonTextField";
import TextLabel from "@components/common/commonTextLabel";
import PrivateRoute from "@redux/ProtectedRoute/PrivateRoute";
import CommonImageUploader from "@components/common/CommonImageUploader";
import { toast } from "react-toastify";
import Assets from "@components/common/image_container";
import { BASE_URL_UPLOAD } from "@redux/Api/AuthApi";

const useStyles = makeStyles()((theme) => {
    return {
        thead: {
            "& .MuiTableCell-root": {
                padding: "10px !important",
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
        padding: 10,
        lineHeight: "24px",
        fontWeight: 500,
        fontSize: "14px",
        background: theme.palette.background.paper,
        border: "0px",
        whiteSpace: "nowrap",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
        padding: 10
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
        padding: "8px !important",
        border: "none !important",
        fontSize: "14px !important",
        fontWeight: "bolder",
    },
}));



const Currency = () => {
    const router = useRouter();
    const theme = useTheme();
    const dispatch = useDispatch();
    const { classes } = useStyles();

    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedImages, setSelectedImages] = useState<any>();
    const [originalImg, setOriginalImg] = useState<any>();

    const [data, setData] = useState<any>({
        name: "",
        code: "",
        image: "",
    });

    const [currencyData, setCurrencyData] = useState<any>({});
    const [error, setError] = useState<any>({});
    const [serverDetailsOption, setServerDetailsOption] = useState<any>([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState<any>(0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setData({
            name: "",
            code: "",
            image: ""
        });
        setOriginalImg("")
        setError({});
        setIsEdit(false);
    };

    const handleImageUpload = async (val: any) => {
        const formData = new FormData();
        formData.append("image", val)
        try {
            let res = await dispatch(uploadImg(formData));
            if (res?.payload?.status === 200) {
                setOriginalImg(res?.payload?.data?.image)
            } else {
                toast.error('Incorrect email or password', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (error) {
            toast.error('An error occurred during login', {
                position: toast.POSITION.TOP_RIGHT,
            });
            setOriginalImg("")
        }
    };
    const handleChange = (e: any, isProgramCurrency: any, i: any) => {
        const { name, value } = e.target;

        if (isProgramCurrency === true) {
            const modifyData: any = { ...data };
            if (modifyData.programCurrency && modifyData.programCurrency[i]) {
                modifyData.programCurrency[i][name] = value;
            }
            setData(modifyData);
        } else if (isProgramCurrency === false) {
            setData((prevData: any) => ({
                ...prevData,
                [name]: value,
            }));
        } else if (isProgramCurrency === "batch") {
            const modifyData: any = { ...data };
            if (modifyData.breachRules) {
                modifyData.breachRules[i] = value;
            }
            setData(modifyData);
        } else {
            const modifyData: any = { ...data };
            if (modifyData.levelUpRules) {
                modifyData.levelUpRules[i] = value;
            }
            setData(modifyData);
        }
    };

    const Validation = () => {
        let errors: any = {};
        let formIsValid = true;
        if (!data?.name) {
            formIsValid = false;
            errors["name"] = "Please enter Currency Name.";
        }
        if (!data?.code) {
            formIsValid = false;
            errors["code"] = "Please enter Currency Code.";
        }
        console.log('data?.image-----', data, !data?.image)
        if (!originalImg) {
            formIsValid = false
            errors['image'] = 'Please upload all images.'
        }
        setError(errors);
        return formIsValid;
    };

    const _getCurrency = async () => {
        const body = {
            page: page + 1,
            limit: rowsPerPage,
        };
        try {
            const res = await dispatch(listCurrency(body));
            const error = ErrorHandler(res);
            if (error) {
                setCurrencyData(res?.payload?.data);
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


    const _addCurrency = async () => {
        if (Validation()) {
            const body: any = {
                name: data?.name,
                image: originalImg,
                code: data?.code,
                id: data?.id
            };
            if (isEdit) {
                body.id = data?.id;
            }
            try {
                const res = isEdit
                    ? await dispatch(updateCurrency(body))
                    : await dispatch(addCurrency(body));
                const error = ErrorHandler(res);
                if (error) {
                    tostify(
                        `${isEdit ? "Edit" : "Add"} challenge successful!`,
                        "success"
                    );
                    handleClose();
                    _getCurrency();
                }
            } catch (error) {
                tostify("Something went wrong!", "error");
            }
        }
    };

    const setProgramCurrencyAdd = () => {
        setData({
            ...data,
            programCurrency: [...data.programCurrency, {}],
        });
    };

    const setBatchRulesAdd = () => {
        setData({
            ...data,
            breachRules: [...data.breachRules, ""],
        });
    };

    const setLevelRulesAdd = () => {
        setData({
            ...data,
            levelUpRules: [...data.levelUpRules, ""],
        });
    };

    const setProgramCurrencyDelete = (i: any) => {
        const modifyData = { ...data };
        if (modifyData.programCurrency && modifyData.programCurrency.length > i) {
            modifyData.programCurrency.splice(i, 1);
            setData(modifyData);
        }
    };

    const setBatchRulesDelete = (i: any) => {
        const modifyData = { ...data };
        if (modifyData.breachRules && modifyData.breachRules.length > i) {
            modifyData.breachRules.splice(i, 1);
            setData(modifyData);
        }
    };

    const setLevelRulesDelete = (i: any) => {
        const modifyData = { ...data };
        if (modifyData.levelUpRules && modifyData.levelUpRules.length > i) {
            modifyData.levelUpRules.splice(i, 1);
            setData(modifyData);
        }
    };
    const editCurrency = async (id: any, name: string, image: string, code: string) => {
        try {
            let body = {
                id: id,
                name: name,
                image: image,
                code: code,
            }
            const res = await dispatch(updateCurrency(body));
            if (res?.payload?.status === 200) {
                const error = ErrorHandler(res);
                if (error) {
                    setIsEdit(true);
                    setData({
                        id: res?.payload?.data?._id,
                        name: res?.payload?.data?.name,
                        code: res?.payload?.data?.code,
                        image: `${BASE_URL_UPLOAD}${res?.payload?.data?.image}`,
                    });
                    setOriginalImg(res?.payload?.data?.image)
                    handleOpen();
                }
            }
        } catch (error) {
            tostify("Something went wrong!", "error");
        }
    }

    const _deleteCurrency = async (id: any) => {
        try {
            const res = await dispatch(deleteCurrency(id));
            if (res?.payload?.status === 200) {
                const error = ErrorHandler(res);
                if (error) {
                    tostify("Delete currency successful!", "success");
                    setIsEdit(false);
                    handleClose();
                    _getCurrency();
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
            _getCurrency();
        }
    }, [router, rowsPerPage, page]);

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
                        <LayoutHeader type="Currency" onClick={() => handleOpen()} />
                        <TableContainer style={{ marginTop: 0 }}>
                            {currencyData?.currency_list_data?.length > 0 ? <Table sx={{ minWidth: { md: "700", sm: '200' } }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="left">Id</StyledTableCell>
                                        <StyledTableCell align="center">Name</StyledTableCell>
                                        <StyledTableCell align="center">Code</StyledTableCell>
                                        <StyledTableCell align="center">Images</StyledTableCell>
                                        <StyledTableCell align="center">Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className={classes?.thead}>
                                    {currencyData?.currency_list_data?.map((row: any, i: any) => (
                                        <StyledTableRow key={row?._id}>
                                            <StyledTableCell align="left">{(page + 1 - 1) * rowsPerPage + i + 1}</StyledTableCell>
                                            <StyledTableCell align="center">{row?.name}</StyledTableCell>
                                            <StyledTableCell align="center">{row?.code}</StyledTableCell>
                                            <StyledTableCell align="center"><Assets src={`${BASE_URL_UPLOAD}${row?.image}`} absolutePath={true} width={"60px"} height={"40px"} /></StyledTableCell>
                                            <StyledTableCell align="right">
                                                <Box display={"flex"} justifyContent={"center"} gap={1}>
                                                    <MuiIconWrapper icon={<ModeEditIcon style={{ cursor: "pointer", color: "#91D14F" }} />} sx={{ border: `1px solid #91D14F`, backgroundColor: "#91D14F1A", cursor: "pointer", }}
                                                        onClick={() => editCurrency(row._id, row.name, row.image, row.code)}
                                                    />
                                                    <MuiIconWrapper
                                                        icon={<DeleteIcon style={{ cursor: "pointer", color: "#F14336" }} />}
                                                        sx={{ border: `1px solid #F14336`, backgroundColor: "#F143361A", cursor: "pointer", }}
                                                        onClick={() => _deleteCurrency(row?._id)}
                                                    />
                                                </Box>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table> :
                                <TableRow>
                                    <TableCell colSpan={12}>
                                        <NoDataFound title="No details found!" variant="body2" icon={<ErrorOutlineIcon style={{ fontSize: '2rem', color: theme.palette.info.main }} />} elevation={0} />
                                    </TableCell>
                                </TableRow>
                            }
                        </TableContainer>
                        {currencyData?.currency_list_data?.length > 0 && (
                            <CustomPagination
                                count={currencyData?.state?.data_count}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                onPageChange={handleChangePage}
                            />
                        )}
                    </PaperContainer>
                </Layout>
                {open && (
                    <SimpleDialog
                        open={open}
                        onClose={handleClose}
                        data={data}
                        handleChange={handleChange}
                        setProgramCurrencyAdd={setProgramCurrencyAdd}
                        setProgramCurrencyDelete={setProgramCurrencyDelete}
                        _addCurrency={_addCurrency}
                        isEdit={isEdit}
                        error={error}
                        setBatchRulesAdd={setBatchRulesAdd}
                        setLevelRulesAdd={setLevelRulesAdd}
                        setBatchRulesDelete={setBatchRulesDelete}
                        setLevelRulesDelete={setLevelRulesDelete}
                        serverDetailsOption={transformedData}
                        handleImageUpload={handleImageUpload}
                        selectedImages={selectedImages}
                        setSelectedImages={setSelectedImages}
                        // setCurrencyImage={setCurrencyImage}
                        originalImg={originalImg}
                    />
                )}

            </PrivateRoute>
        </>
    );
};

function SimpleDialog(props: any) {
    const { classes } = useStyles();
    const {
        onClose,
        open,
        handleChange,
        setProgramCurrencyAdd,
        setProgramCurrencyDelete,
        _addCurrency,
        data,
        isEdit,
        error,
        setBatchRulesAdd,
        setLevelRulesAdd,
        setBatchRulesDelete,
        setLevelRulesDelete,
        serverDetailsOption,
        handleImageUpload,
        uploadedImages,
        setSelectedImages,
        selectedImages,
        setCurrencyImage,
        originalImg
    } = props;

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
                {isEdit ? "Edit" : "Add"} New Currency
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
                    <Grid item xs={12}>
                        <Box>
                            <CommonTextField
                                text={"Name"}
                                name={"name"}
                                placeholder={"Enter Name"}
                                value={data?.name}
                                onChange={(e: any) => handleChange(e, false)}
                                valid
                            />
                            <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} fontWeight={"400"} title={!data?.name ? error?.name : ""} />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box>
                            <CommonTextField
                                text={"Code"}
                                name={"code"}
                                placeholder={"Code"}
                                value={data?.code}
                                onChange={(e: any) => handleChange(e, false)}
                                valid
                            />
                            <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!data?.code ? error?.code : ""} />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextLabel fontSize={"0.75rem"} title={"Upload image"} />
                        <CommonImageUploader onChange={(e: any) => { handleImageUpload(e?.target?.files[0]) }} originalImg={`${BASE_URL_UPLOAD}${originalImg}`} isImg={originalImg} />
                        <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!originalImg ? error?.image : ""} />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        display={"flex"}
                        justifyContent={"center"}
                        marginTop={2}
                    >
                        <Button
                            variant="contained"
                            style={{
                                textTransform: "capitalize",
                                backgroundColor: "#0099CB",
                            }}
                            onClick={_addCurrency}
                        >
                            {isEdit ? "Update" : "Create"} Currency
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    );
}

export default Currency;
