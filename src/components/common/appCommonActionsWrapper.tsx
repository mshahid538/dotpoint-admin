import React from "react";
// import CustomSnackBar from "./customSnackBar";
import FullWidthLoader from "./FullWidthLoader";
// import { getLoggedInUserDetails, getRolePermission } from "@redux/Redux/Actions/AuthUser";
import { useAppSelector } from "@redux/Redux/app/hooks";
import { useDispatch } from "react-redux";
// import localStoreUtil from "@redux/Api/localstore.util";
export default function AppCommonActionsWrapper() {
    const dispatch = useDispatch();
    const fullPageLoaderOpen = useAppSelector(
        (state: any) => state?.app?.common?.fullPageLoaderOpen
    );
    const loggedInUserDetails = useAppSelector(
        (state: any) => state?.auth?.loggedInUserDetails?.userDetail
    );
    // React.useEffect(() => {
    //     if (
    //         localStoreUtil.get_data("isSuccessLogin") == "1" &&
    //         !loggedInUserDetails?.personaUserId
    //     ) {
    //         dispatch(getLoggedInUserDetails());
    //     }
    // }, []);
    return (
        <>
            <FullWidthLoader open={fullPageLoaderOpen} />
            {/* <CustomSnackBar /> */}
        </>
    );
}
