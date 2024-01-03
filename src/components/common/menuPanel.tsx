import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { Box, Divider, Typography } from '@mui/material'
import { lightTheme } from '@redux/theme';
import { setToken } from '@redux/Api/ClientHelper';
import { makeStyles } from "tss-react/mui";
import MUIButton from './commonButton';
import Assets from './image_container';
import SelectDropDown from './selectDropDown';
import localStoreUtil from '@redux/Api/localstore.util';

const useStyles = makeStyles()((theme) => {
    return {
        menuLogoBox: {
            display: "flex",
            justifyContent: "center",
            borderBottom: "1px solid #eeeeee57"
        },
        innerHeader: {
            padding: "20px 0"
        },
        headerItems: {
            display: "flex",
            justifyContent: "space-between",
            gap: "30px",
            alignItems: "center"
        },
        HeaderSearchBox: {
            display: "flex",
            background: "#000",
            padding: "10px"
        },
        profileHeaderBtn: {
            display: "flex",
            gap: "16px",
            alignItems: "  "
        },
        popoverPaper: {
            backgroundColor: "black"
        },
        mobileMenuItems: {
            paddingLeft: "30px"
        },
        HeaderTitleTypography: {
            fontSize: "16px",
            fontWeight: "600",
            color: lightTheme.palette.bgWhite.main
        },
        ProfilePopoverLayout: {
            display: "flex",
            gap: "20px",
            alignItems: "center",
            cursor: "pointer",
        },
        BasicProfilePopoverLayout: {
            padding: "20px 55px 20px 35px",
            display: "flex",
            gap: "20px",
            alignItems: "center"
        },
        mainTitle: {
            fontSize: "18px",
            fontWeight: "600",
        },
        subTitle: {
            fontSize: "18px",
        },
        profileAvtar: {
            fontWeight: "600",
            fontSize: "16px",
            color: lightTheme.palette.bgdefultBlue.main,
            backgroundColor: lightTheme.palette.bgDefultLightSky.main
        },
        lightGrayBG: {
            backgroundColor: lightTheme.palette.bgLightGray.main
        },
        storeIcon: {
            display: "flex",
            gap: "20px",
            padding: "30px 0"
        },
        drawerMenuItemsMain: {
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            padding: "30px 30px 30px 0",
            color: "#fff",
            '& img': {
                paddingLeft: "30px",
                border: "3px solid transparent"
            }
        },
        drawerMenuSubItems: {
            fontSize: "14px"
        },
        activeMenuItem: {
            color: lightTheme.palette.bgdefultBlue.main,
            '& img': {
                filter: "invert(48%) sepia(54%) saturate(3491%) hue-rotate(163deg) brightness(90%) contrast(103%)",
                borderLeft: "3px solid  ",
                marginLeft: "0px"
            }
        },
    };
});

const MenuPanel = () => {
    const { classes } = useStyles();
    const router = useRouter()
    const [isTextVisible, setIsTextVisible] = useState(false);
    const languages = ['English', 'Hindi']
    const [data, setData] = React.useState<any>({ language: languages[0], isRememberMe: false })
    const mobileMainMenu = [
        {
            icon: "/assets/icons/home.svg",
            text: "Challenges",
            path: "/Challenges"
        },
        {
            icon: "/assets/icons/profile.svg",
            text: "User",
            path: "/user-management"
        },
        {
            icon: "/assets/icons/group.svg",
            text: "Trading Objectives",
            path: "/trading-objectives"
        },
        {
            icon: "/assets/icons/wallet.svg",
            text: "Payout",
            path: "/payout"
        },
        {
            icon: "/assets/icons/dollar.svg",
            text: "Currency",
            path: "/currency"
        },
        {
            icon: "/assets/icons/24-support.svg",
            text: "Customer Support",
            path: "/customer-support"
        },
        {
            icon: "/assets/icons/security.svg",
            text: "Approval Management",
            path: "/approval-management"
        },
        {
            icon: "/assets/icons/frame.svg",
            text: "Verification Management",
            path: "/verification-management"
        },

    ]
    const toggleText = () => {
        setIsTextVisible(!isTextVisible);
    };

    useEffect(() => {
        setToken(localStorage.getItem('access_token'))
    }, []);
    return (
        <>
            <Box sx={{ backgroundColor: "#002734" }}>
                <Box>
                    <Box sx={{ height: { md: "70px", sm: "50px" }, padding: { md: "10px", xs: "0 12px 12px" }, }} className={classes.menuLogoBox}>
                        <Assets src={"/assets/images/DotPointLogo.svg"} absolutePath={true} width={'70%'} height={'auto'} />
                    </Box>
                    <Divider />
                </Box>
                <Box sx={{ overflowY: "auto", height: { md: "calc(100vh - 260px)", sm: "calc(100vh - 260px)", xs: "auto" }, }}>
                    <Box sx={{ padding: "30px 30px 0" }}>
                        <MUIButton
                            fullWidth={true}
                            height="42px"
                            width="100%"
                            text="Dashboard"
                            fontSize="16px"
                            fontWeight="600"
                            onClick={() => { router.push('/dashboard') }}
                        />
                    </Box>
                    <Box className={classes.drawerMenuItemsMain}>
                        {mobileMainMenu.map((item, index) => (
                            <Box
                                onClick={() => {
                                    router.push(item.path);
                                }}
                                className={`${classes.ProfilePopoverLayout} ${item.path === location.pathname ? classes.activeMenuItem : ''
                                    }`}
                                key={index}
                            >
                                <Assets src={item.icon} absolutePath={true} width={20} height={20} />
                                <Typography
                                    className={`${classes.drawerMenuSubItems} ${item.path === location.pathname ? classes.activeMenuItem : ''
                                        }`}
                                    onClick={toggleText}
                                >
                                    {item.text}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Box sx={{ padding: { xl: "30px", xs: "24px 12px", } }} borderTop={"1px solid #eeeeee57"}>
                    <SelectDropDown
                        color="#fff"
                        values={languages || []}
                        name="language"
                        value={data?.language}
                        onChange={(e: any) => {
                            setData({ ...data, language: e.target.value })
                        }}
                        valid
                        width="100%"
                    />
                    <MUIButton
                        onClick={() => {
                            localStoreUtil.remove_all();
                            router.push("/login")
                        }}
                        fullWidth={true}
                        height="42px"
                        width="100%"
                        text="Log out"
                        fontSize="16px"
                        fontWeight="600"
                        marginTop={2}
                        variant={"outlined"}
                        color={lightTheme.palette.bgDefultGreen.main}
                        backgroundColor={"transparent"}
                        hoverBgColor={"transparent"}
                        textHoverColor={lightTheme.palette.bgDefultGreen.main}
                        border={`1px solid ${lightTheme.palette.bgDefultGreen.main}`}
                    />

                </Box>
            </Box>
        </>
    )
}
export default MenuPanel