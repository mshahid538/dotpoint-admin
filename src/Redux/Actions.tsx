import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    ApiDeleteNoAuth,
    ApiGetNoAuth,
    ApiPatchNoAuth,
    ApiPostNoAuth,
    ApiPostNoAuthFormData,
    ApiPutNoAuth,
} from "@api/Api/CommonApi";
import { api } from "@redux/Api/AuthApi";

export const login: any = createAsyncThunk("login", async (body: any) => {
    return ApiPostNoAuth(api.login, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const google: any = createAsyncThunk("google", async (body: any) => {
    return ApiPostNoAuth(api.google, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const addChallenge: any = createAsyncThunk("addChallenge", async (body: any) => {
    return ApiPostNoAuth(api.addChallenge, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const editChallenge: any = createAsyncThunk("editChallenge", async (body: any) => {
    return ApiPutNoAuth(api.editChallenge, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const getChallenge: any = createAsyncThunk("getChallenge", async (body: any) => {
    return ApiPostNoAuth(api.getChallenge, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const getTradingObjectives: any = createAsyncThunk("getTradingObjectives", async (body: any) => {
    return ApiPostNoAuth(api.getTradingObjectives, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const deleteChallenge: any = createAsyncThunk("deleteChallenge", async (body?: any) => {
    return ApiDeleteNoAuth(api.deleteChallenge + `/${body}`, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const getByIdChallenge: any = createAsyncThunk("getByIdChallenge", async (body?: any) => {
    return ApiGetNoAuth(api.getByIdChallenge + `/${body}`, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const resetAccountBalance: any = createAsyncThunk("resetAccountBalance", async (body: any) => {
    return ApiPostNoAuth(api.resetAccountBalance, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const getCurrencylist: any = createAsyncThunk("getCurrencylist", async (body: any) => {
    return ApiPostNoAuth(api.getCurrency_list, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const getServer: any = createAsyncThunk("getServer", async (body: any) => {
    return ApiGetNoAuth(api.getServer, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

// User-Management

export const addUserManagement: any = createAsyncThunk("addUserManagement", async (body: any) => {
    return ApiPostNoAuth(api.addUserManagement, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const updateUserManagement: any = createAsyncThunk("updateUserManagement", async (body: any) => {
    return ApiPutNoAuth(api.updateUserManagement, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const getUserManagmentDetails: any = createAsyncThunk("getUserManagmentDetails", async (body: any) => {
    return ApiPostNoAuth(api.getUserManagement, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const getChallengeApproval: any = createAsyncThunk("getChallengeApproval", async (body: any) => {
    return ApiPostNoAuth(api.getChallengeApproval, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const getKycVerification: any = createAsyncThunk("getKycVerification", async (body: any) => {
    return ApiPostNoAuth(api.getKycVerification, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const statusChangesRequest: any = createAsyncThunk("statusChangesRequest", async (body: any) => {
    return ApiPutNoAuth(api.statusChangesRequest, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});
export const statusChangesVerification: any = createAsyncThunk("statusChangesVerification", async (body: any) => {
    return ApiPutNoAuth(api.statusChangesVerification, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const getByIdUserManagment: any = createAsyncThunk("getByIdChallenge", async (body?: any) => {
    return ApiGetNoAuth(api.getByIdUserManagment + `/${body}`, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const activeInactiveUserManagment: any = createAsyncThunk("activeInactiveUserManagment", async (body: any) => {
    return ApiPutNoAuth(api.activeInactiveUserManagment, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});
// Currency

export const addCurrency: any = createAsyncThunk("addCurrency", async (body: any) => {
    return ApiPostNoAuth(api.addCurrency, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const getCurrency: any = createAsyncThunk("getCurrency", async (body: any) => {
    return ApiPostNoAuth(api.getCurrency, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const listCurrency: any = createAsyncThunk("listCurrency", async (body: any) => {
    return ApiPostNoAuth(api.listCurrency, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});
export const updateCurrency: any = createAsyncThunk("updateCurrency", async (body: any) => {
    return ApiPutNoAuth(api.updateCurrency, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const uploadImg: any = createAsyncThunk("uploadImg", async (body: any) => {
    console.log("body", body);
    return ApiPostNoAuthFormData(api.uploadImg, body)
        .then((res: any) => res?.data)
        .catch((err) => err);
});

export const deleteCurrency: any = createAsyncThunk("deleteCurrency", async (body?: any) => {
    return ApiDeleteNoAuth(api.deleteCurrency + `/${body}`, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const getPayout: any = createAsyncThunk("getCurrency", async (body: any) => {
    return ApiPostNoAuth(api.getPayout, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const addPayout: any = createAsyncThunk("addCurrency", async (body: any) => {
    return ApiPostNoAuth(api.addPayout, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const getCustomerSupport: any = createAsyncThunk("getCustomerSupport", async (body: any) => {
    return ApiPostNoAuth(api.getCustomerSupport, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const getDashboard: any = createAsyncThunk("getDashboard", async (body: any) => {
    return ApiGetNoAuth(api.getDashboard, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const getCoupon: any = createAsyncThunk("getCoupon", async (body: any) => {
    return ApiGetNoAuth(api.getCoupon, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const addCoupon: any = createAsyncThunk("addCoupon", async (body: any) => {
    return ApiPostNoAuth(api.addCoupon, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});

export const updateCoupon: any = createAsyncThunk("updateCoupon", async (body: any) => {
    return ApiPatchNoAuth(api.updateCoupon, body)
        .then((res: any) => {
            return res?.data;
        })
        .catch((err) => err);
});
