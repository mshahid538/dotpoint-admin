import React, { useEffect } from "react";
import { Box, Button, Divider, Grid, useTheme, } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { useDispatch } from "react-redux";
import { addChallenge, deleteChallenge, editChallenge, getByIdChallenge, getChallenge, getCurrencylist, getServer } from "@redux/Redux/Actions";
import { useRouter } from "next/router";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import SelectDropDown from "@components/common/selectDropDown";
import { tostify } from "@components/common/tostify";
import ErrorHandler from "@components/common/errorHandler";
import CommonTextField from "@components/common/commonTextField";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import TextLabel from "@components/common/commonTextLabel";
import PrivateRoute from "@redux/ProtectedRoute/PrivateRoute";
import PaperContainer from "@components/common/PaperContainer";
import Layout from "@components/common/Layout/layout";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";


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

const programTradingTypeOption = [
    { name: "Meta 4", value: "0" },
    { name: "Meta 5", value: "1" },
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

const AddChallenge = () => {
    //Hooks
    const router = useRouter();
    const dispatch = useDispatch();
    const { updateId }: any = router.query

    //States
    const [serverDetailIdOption, setserverDetailIdOption] = React.useState<any>([]);
    const [currencyList, setCurrencyList] = React.useState<any>([]);
    const [error, setError] = React.useState<any>({});
    const [data, setData] = React.useState<any>({
        name: "",
        description: "",
        programCurrency: [{
            buyChallengeCurrency: [
                { currency: "USD", amount: "" },
                { currency: "EUR", amount: "" },
                { currency: "JPY", amount: "" },
                { currency: "AUD", amount: "" },
                { currency: "CNY", amount: "" },
                { currency: "HKD", amount: "" },
                { currency: "TWD", amount: "" },
                { currency: "SGD", amount: "" },
                { currency: "NZD", amount: "" },
                { currency: "KRW", amount: "" },
                { currency: "MYR", amount: "" },
                { currency: "THB", amount: "" },
                { currency: "IDR", amount: "" },
                { currency: "VND", amount: "" },
                { currency: "INR", amount: "" },
            ],
        }],
        companyProfit: "",
        traderProfit: "",
        programTradingType: "",
        tradingPeriod: "",
        minimumDays: "",
        breachRules: [],
        levelUpRules: [],
        serverDetailId: ""
    });
    console.log("error", error);

    const handleClose = () => {
        setData({
            name: "",
            description: "",
            programCurrency: [{
                buyChallengeCurrency: [{}],
            }],
            companyProfit: "",
            traderProfit: "",
            programTradingType: "",
            tradingPeriod: "",
            minimumDays: "",
            breachRules: [],
            levelUpRules: [],
            serverDetailId: ""
        });
        setError({});
    };

    const handleChange = (e: any, isProgramCurrency: any, i?: any, buyIndex?: any) => {
        const { name, value } = e.target;

        // if (isProgramCurrency === true && name === "accountBalance") {
        //     const modifyData: any = { ...data };
        //     if (modifyData.programCurrency && modifyData.programCurrency[i]) {
        //         modifyData.programCurrency[i]['maximumDayLoss'] = value * 5 / 100
        //         modifyData.programCurrency[i]['maximumLoss'] = value * 10 / 100
        //         modifyData.programCurrency[i]['profitTarget'] = value * 10 / 100
        //     }
        //     setData(modifyData);
        // } else 
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
        } else if (isProgramCurrency === "Payment Currency") {
            const updateBuyChallengeCurrency: any = { ...data }
            if (updateBuyChallengeCurrency?.programCurrency?.[buyIndex]?.buyChallengeCurrency && updateBuyChallengeCurrency?.programCurrency?.[buyIndex]?.buyChallengeCurrency[i]) {

                updateBuyChallengeCurrency.programCurrency[buyIndex].buyChallengeCurrency[i]["currency"] = name;
                updateBuyChallengeCurrency.programCurrency[buyIndex].buyChallengeCurrency[i]["amount"] = +value;
            }
            setData(updateBuyChallengeCurrency);
        } else {
            const modifyData: any = { ...data };
            if (modifyData.levelUpRules) {
                modifyData.levelUpRules[i] = value;
            }
            setData(modifyData);
        }
    };
    const validate = () => {
        let errors: any = {};
        let formIsValid = true;
        if (!data?.name) {
            formIsValid = false;
            errors["name"] = "*Please enter Program Name.";
        }
        if (!data?.description) {
            formIsValid = false;
            errors["description"] = "*Please enter Description.";
        }
        if (!data?.companyProfit) {
            formIsValid = false;
            errors["companyProfit"] = "*Please enter Company Profit.";
        }
        if (!data?.traderProfit) {
            formIsValid = false;
            errors["traderProfit"] = "*Please enter Trader Profit.";
        }
        // if (!data?.programTradingType) {
        //     formIsValid = false;
        //     errors["programTradingType"] = "*Please select Program Trading Type.";
        // }
        if (!data?.minimumDays) {
            formIsValid = false;
            errors["minimumDays"] = "*Please enter Minimum Trading Days.";
        }
        if (!data?.tradingPeriod) {
            formIsValid = false;
            errors["tradingPeriod"] = "*Please enter Trading Period.";
        }
        data?.programCurrency?.map((e: any) => {
            if (!e?.currencyListId) {
                formIsValid = false;
                errors["currencyType"] = "*Please select Program Currency.";
            }
            // if (!e?.lowestAllowedEquity) {
            //     formIsValid = false;
            //     errors["lowestAllowedEquity"] = "*Please enter Lowest Allowed Equity.";
            // }
            if (!e?.accountBalance) {
                formIsValid = false;
                errors["accountBalance"] = "*Please enter Initial Balance.";
            }
            if (!e?.maximumDayLoss) {
                formIsValid = false;
                errors["maximumDayLoss"] = "*Please enter maximum Daily Loss.";
            }
            if (!e?.maximumLoss) {
                formIsValid = false;
                errors["maximumLoss"] = "*Please enter maximum Loss.";
            }
            if (!e?.profitTarget) {
                formIsValid = false;
                errors["profitTarget"] = "*Please enter Profit Target.";
            }

            e?.buyChallengeCurrency?.map((e: any) => {
                if (!e?.amount) {
                    formIsValid = false;
                    errors["buyChallenge"] = "*Please enter all Payment Currency.";
                }
            })
        });

        // if (!data?.serverDetailId) {
        //     formIsValid = false;
        //     errors["serverDetailId"] = "*Please enter Server Details.";
        // }
        setError(errors);
        return formIsValid;
    };

    const _getServer = async () => {
        try {
            const res = await dispatch(getServer());
            const error = ErrorHandler(res);
            if (error) {
                let config = res?.payload?.data.length > 0 ? res?.payload?.data?.map((e: any) => {
                    return {
                        name: e?.serverName,
                        value: e?._id,
                    };
                }) : [];
                setserverDetailIdOption(config);
            }
        } catch (error) {
            tostify("Something went wrong!", "error");
        }
    };

    const _getCurrencylist = async () => {
        try {
            const res = await dispatch(getCurrencylist({
                "page": 1,
                "limit": 50
            }));
            const error = ErrorHandler(res);
            if (error) {
                let config = res?.payload?.data?.currency_list_data.length > 0 ? res?.payload?.data?.currency_list_data?.map((e: any) => {
                    return {
                        name: e?.code,
                        value: e?._id,
                    };
                }) : [];
                setCurrencyList(config);
            }
        } catch (error) {
            tostify("Something went wrong!", "error");
        }
    };

    const _addChallenge = async () => {
        if (validate()) {
            const body: any = {
                name: data?.name,
                description: data?.description,
                tradingCurrency: data?.programCurrency,
                // platformOption: [Number(data?.programTradingType)],
                userPercentage: Number(data?.traderProfit),
                tradingPeriodDays: Number(data?.tradingPeriod),
                platformPercentage: Number(data?.companyProfit),
                minimumTradingDays: Number(data?.minimumDays),
                breachRules: data?.breachRules?.filter((e: any) => e !== ""),
                levelUpRules: data?.levelUpRules?.filter((e: any) => e !== ""),
                // serverDetailId: data?.serverDetailId,
                challengeAmount: data?.challengeAmount,
            };
            console.log("body", body);

            if (updateId) {
                body.id = data?.id;
            }
            try {
                const res = updateId
                    ? await dispatch(editChallenge(body))
                    : await dispatch(addChallenge(body));
                const error = ErrorHandler(res);
                if (error) {
                    tostify(res?.payload?.message, "success");
                    handleClose();
                    router.push('/Challenges')
                }
            } catch (error) {
                tostify("Something went wrong!", "error");
            }
        }
    };
    const setProgramCurrencyAdd = () => {
        setData({
            ...data,
            programCurrency: [...data.programCurrency, {
                buyChallengeCurrency: [
                    { currency: "USD", amount: "" }, { currency: "EUR", amount: "" }, { currency: "JPY", amount: "" },
                    { currency: "AUD", amount: "" }, { currency: "CNY", amount: "" }, { currency: "HKD", amount: "" },
                    { currency: "TWD", amount: "" }, { currency: "SGD", amount: "" }, { currency: "NZD", amount: "" },
                    { currency: "KRW", amount: "" }, { currency: "MYR", amount: "" }, { currency: "THB", amount: "" },
                    { currency: "IDR", amount: "" }, { currency: "VND", amount: "" }, { currency: "INR", amount: "" },
                ],
            }],
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

    useEffect(() => {
        if (router.isReady) {
            _getServer();
            _getCurrencylist()
        }
    }, [router]);
    useEffect(() => {
        if (router.isReady && updateId) {
            (async () => {
                try {
                    const res = await dispatch(getByIdChallenge(updateId));
                    if (res?.payload?.status === 200) {
                        const error = ErrorHandler(res);
                        if (error) {
                            setData({
                                name: res?.payload?.data?.name,
                                description: res?.payload?.data?.description,
                                programCurrency: res?.payload?.data?.tradingCurrency,
                                companyProfit: res?.payload?.data?.platformPercentage,
                                traderProfit: res?.payload?.data?.userPercentage,
                                // programTradingType: String(res?.payload?.data?.platformOption?.[0]),
                                minimumDays: res?.payload?.data?.minimumTradingDays,
                                tradingPeriod: res?.payload?.data?.tradingPeriodDays,
                                breachRules: res?.payload?.data?.breachRules,
                                levelUpRules: res?.payload?.data?.levelUpRules,
                                serverDetailId: res?.payload?.data?.serverDetailId,
                                id: res?.payload?.data?._id,
                            });
                        }
                    }
                } catch (error) {
                    tostify("Something went wrong!", "error");
                }
            })();

        }
    }, [updateId])
    console.log("DATA", data);

    return (
        <PrivateRoute>
            <Layout>
                <PaperContainer >
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'} >
                        <TextLabel fontSize={'16px'} fontWeight={"600"} lineHeight={'24px'} title={`${updateId ? "Edit" : "Add"} New Challenge`} />
                    </Box>
                    <Divider sx={{ marginTop: 2 }} />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <Box>
                                <CommonTextField

                                    text={"Program Name"}
                                    name={"name"}
                                    placeholder={"Enter Program Name"}
                                    value={data?.name}
                                    onChange={(e: any) => handleChange(e, false)}
                                    valid
                                />
                                <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} fontWeight={"400"} title={!data?.name ? error?.name : ""} />
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <Box>
                                <CommonTextField
                                    text={"Minimum Trading Days"}
                                    name={"minimumDays"}
                                    placeholder={"0 Days"}
                                    value={data?.minimumDays}
                                    onChange={(e: any) => handleChange(e, false)}
                                    valid
                                />
                                <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!data?.minimumDays ? error?.minimumDays : ""} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <Box>
                                <CommonTextField
                                    text={"Trading Period"}
                                    name={"tradingPeriod"}
                                    placeholder={"0 Days"}
                                    value={data?.tradingPeriod}
                                    onChange={(e: any) => handleChange(e, false)}
                                    valid
                                />
                                <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!data?.tradingPeriod ? error?.tradingPeriod : ""} />
                            </Box>
                        </Grid>

                        {data?.programCurrency?.map((e: any, i: any) => {
                            return (
                                <>
                                    <Box bgcolor={'rgba(0, 153, 203, 0.1)'} width={'100%'} border={"1px solid rgba(0, 153, 203, 0.2)"} marginTop={2} marginLeft="16px" borderRadius={"10px"} >
                                        {i > 0 && (
                                            <Box display={"flex"} sx={{ cursor: "pointer" }} p={1} justifyContent={'end'} onClick={() => setProgramCurrencyDelete(i)}>
                                                <CloseOutlinedIcon
                                                    sx={{
                                                        color: "#fff",
                                                        borderRadius: 1,
                                                        fontSize: "18px",
                                                        marginRight: "1px",
                                                        backgroundColor: "#F14336",
                                                    }}
                                                />
                                            </Box>
                                        )}
                                        <Grid container padding={2} spacing={2}>
                                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                                <SelectDropDown
                                                    text="Program Currency"
                                                    values={currencyList}
                                                    name="currencyListId"
                                                    value={getDefaultValue(
                                                        currencyList,
                                                        e?.currencyListId
                                                    )}
                                                    onChange={(e: any) => handleChange(e, true, i)}
                                                    i={i}
                                                    valid
                                                    selectBackgroundColor="#fff"
                                                />
                                                <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!e?.currencyType ? error?.currencyType : ""} />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                                <Box>
                                                    <CommonTextField
                                                        name={"lowestAllowedEquity"}
                                                        text={"Lowest Allowed Equity"}
                                                        placeholder={"Enter Lowest Allowed Equity"}
                                                        value={e?.accountBalance - e?.maximumLoss || 0}
                                                        onChange={(e: any) => handleChange(e, true, i)}
                                                        valid
                                                        disabled
                                                        inputBackgroundColor="#FFFF"

                                                    />
                                                    {/* <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!e?.lowestAllowedEquity ? error?.lowestAllowedEquity : ""} /> */}
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                                <CommonTextField
                                                    text={"Initial Balance"}
                                                    name={"accountBalance"}
                                                    placeholder={"Enter Initial Balance"}
                                                    value={e?.accountBalance}
                                                    onChange={(e: any) => {
                                                        handleChange(e, true, i)
                                                        const { name, value } = e.target;
                                                        const modifyData: any = { ...data };
                                                        if (modifyData.programCurrency && modifyData.programCurrency[i]) {
                                                            modifyData.programCurrency[i]['maximumDayLoss'] = value * 5 / 100;
                                                            modifyData.programCurrency[i]['maximumLoss'] = value * 10 / 100;
                                                            modifyData.programCurrency[i]['profitTarget'] = value * 10 / 100;
                                                        }
                                                        setData(modifyData);
                                                    }}
                                                    valid
                                                    inputBackgroundColor="#FFFF"
                                                />
                                                <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!e?.accountBalance ? error?.accountBalance : ""} />
                                            </Grid>

                                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                                <CommonTextField
                                                    type={"number"}
                                                    text={"Maximum Daily Loss"}
                                                    name={"maximumDayLoss"}
                                                    placeholder={"Enter Maximum Daily Loss"}
                                                    value={e?.maximumDayLoss}
                                                    onChange={(e: any) => handleChange(e, true, i)}
                                                    valid
                                                    inputBackgroundColor="#FFFF"
                                                />
                                                <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!e?.maximumDayLoss ? error?.maximumDayLoss : ""} />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                                <CommonTextField
                                                    name={"maximumLoss"}
                                                    text={"Maximum Loss"}
                                                    placeholder={"Enter Maximum Loss"}
                                                    value={e?.maximumLoss}
                                                    onChange={(e: any) => handleChange(e, true, i)}
                                                    valid
                                                    inputBackgroundColor="#FFFF"
                                                />
                                                <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!e?.maximumLoss ? error?.maximumLoss : ""} />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                                <CommonTextField
                                                    text={"Profit Target"}
                                                    name={"profitTarget"}
                                                    placeholder={"Enter Profit Target"}
                                                    value={e?.profitTarget}
                                                    onChange={(e: any) => handleChange(e, true, i)}
                                                    valid
                                                    inputBackgroundColor="#FFFF"
                                                />
                                                <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!e?.profitTarget ? error?.profitTarget : ""} />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                <TextLabel fontSize={'14px'} lineHeight={'24px'} title={"Payment Currency"} />
                                                <Divider sx={{ marginTop: 1 }} />
                                            </Grid>

                                            {e?.buyChallengeCurrency?.map((k: any, index: number) => {
                                                return <>
                                                    <Grid item xs={12} sm={12} md={6} lg={3}>
                                                        <CommonTextField
                                                            type={"number"}
                                                            text={k?.currency}
                                                            name={k?.currency}
                                                            placeholder={`Enter ${k?.currency} Currency`}
                                                            value={k?.amount}
                                                            onChange={(e: any) => handleChange(e, 'Payment Currency', index, i)}
                                                            valid
                                                            inputBackgroundColor="#FFFF"
                                                        />
                                                    </Grid>

                                                </>
                                            })}
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!e?.buyChallenge ? error?.buyChallenge : ""} />
                                            </Grid>
                                        </Grid>
                                    </Box>

                                </>
                            );
                        })}
                        <Grid
                            item
                            xs={12}
                            style={{
                                gap: "7px",
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                            }}
                        >
                            <Fab
                                size="small"
                                color="primary"
                                aria-label="add"
                                onClick={() => setProgramCurrencyAdd()}
                                sx={{
                                    backgroundColor: "#0099CB",
                                    "&:hover": {
                                        backgroundColor: "#0099CB",
                                    },
                                }}
                            >
                                <AddIcon />
                            </Fab>
                            <TextLabel fontSize={"14px"} title={"Add More"} />
                        </Grid>
                        {/* <Grid item xs={12} sm={12} md={6} lg={4}>
                            <SelectDropDown
                                text="Program Trading Type"
                                values={programTradingTypeOption}
                                name="programTradingType"
                                value={getDefaultValue(
                                    programTradingTypeOption,
                                    data?.programTradingType
                                )}
                                onChange={(e: any) => handleChange(e, false)}
                                valid
                                selectBackgroundColor="#fff" */}
                        {/* /> */}
                        {/* <SelectDropDown
                                text="Program Currency"
                                values={currencyList}
                                name="currencyListId"
                                value={getDefaultValue(
                                    currencyList,
                                    e?.currencyListId
                                )}
                                onChange={(e: any) => handleChange(e, true, i)}
                                i={i}
                                valid
                                selectBackgroundColor="#fff"
                            /> */}
                        {/* <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!data?.programTradingType ? error?.programTradingType : ""} />
                        </Grid> */}
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <Box>
                                <CommonTextField
                                    text={"Trader Profit"}
                                    name={"traderProfit"}
                                    placeholder={"80%"}
                                    value={data?.traderProfit}
                                    onChange={(e: any) => handleChange(e, false)}
                                    valid
                                />
                                <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!data?.traderProfit ? error?.traderProfit : ""} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <Box>
                                <CommonTextField
                                    text={"Company Profit"}
                                    name={"companyProfit"}
                                    placeholder={"20%"}
                                    value={data?.companyProfit}
                                    onChange={(e: any) => handleChange(e, false)}
                                    valid
                                />
                                <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!data?.companyProfit ? error?.companyProfit : ""} />

                            </Box>
                        </Grid>
                        {/* <Grid item xs={12} sm={12} md={6} lg={4}>
                            <SelectDropDown
                                text="Server Details"
                                values={serverDetailIdOption || []}
                                name="serverDetailId"
                                value={getDefaultValue(serverDetailIdOption, data?.serverDetailId)}
                                onChange={(e: any) => handleChange(e, false)}
                                valid
                                selectBackgroundColor="#fff"
                            />

                            <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!data?.serverDetails ? error?.serverDetails : ""} />
                        </Grid> */}
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Box>
                                <CommonTextField
                                    text={"Description"}
                                    name={"description"}
                                    placeholder={"Enter Description"}
                                    value={data?.description}
                                    onChange={(e: any) => handleChange(e, false)}
                                    rows={3}
                                    multiline={true}
                                    valid
                                />
                                <TextLabel fontSize={"0.75rem"} color={"#d32f2f"} title={!data?.description ? error?.description : ""} />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ borderColor: "#EEEEEE", margin: " 0" }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextLabel fontSize={"14px"} fontWeight={"500"} marginBottom={"8px"} title={"Breach Rules"} />
                            {data?.breachRules?.length === 0 && (
                                <TextLabel fontSize={"14px"} color={"gray"} title={"No breach rules added yet"} />
                            )}
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            justifyContent={"end"}
                            display={"flex"}
                            alignSelf={"center"}
                        >
                            <Button
                                variant="contained"
                                style={{
                                    textTransform: "capitalize",
                                    backgroundColor: "#0099CB",
                                }}
                                onClick={setBatchRulesAdd}
                            >
                                + Add Rule
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            {data?.breachRules?.length > 0 &&
                                data?.breachRules?.map((item: any, i: any) => {
                                    return (
                                        <Box my={1} key={i} display={"flex"} gap={1} alignItems={"center"}>
                                            <CommonTextField
                                                name={"rule"}
                                                placeholder={"Enter Breach Rule"}
                                                value={item}
                                                onChange={(e: any) => handleChange(e, "batch", i)}
                                            />
                                            <DeleteOutlineOutlinedIcon
                                                color="error"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => setBatchRulesDelete(i)}
                                            />
                                        </Box>
                                    );
                                })}
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ borderColor: "#EEEEEE", margin: "0" }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextLabel fontSize={"14px"} fontWeight={"500"} marginBottom={"8px"} title={"Level-up Rules"} />
                            {data?.levelUpRules?.length === 0 && (
                                <TextLabel fontSize={"14px"} color={"gray"} title={"No level-up rules added yet"} />
                            )}
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            justifyContent={"end"}
                            display={"flex"}
                            alignSelf={"center"}
                        >
                            <Button
                                variant="contained"
                                style={{
                                    textTransform: "capitalize",
                                    backgroundColor: "#0099CB",
                                }}
                                onClick={setLevelRulesAdd}
                            >
                                + Add Rule
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            {data?.levelUpRules?.length > 0 &&
                                data?.levelUpRules?.map((item: any, i: any) => {
                                    return (
                                        <Box my={1} key={i} display={"flex"} gap={1} alignItems={"center"}>
                                            <CommonTextField
                                                name={"rule"}
                                                placeholder={"Enter Level-up Rule"}
                                                value={item}
                                                onChange={(e: any) => handleChange(e, "level", i)}
                                            />
                                            <DeleteOutlineOutlinedIcon
                                                color="error"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => setLevelRulesDelete(i)}
                                            />
                                        </Box>
                                    );
                                })}
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
                                onClick={_addChallenge}
                            >
                                {updateId ? "Update" : "Create"} New Program
                            </Button>
                        </Grid>
                    </Grid>
                </PaperContainer>
            </Layout>
        </PrivateRoute >
    )
}

export default AddChallenge