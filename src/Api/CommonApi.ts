import { apiInstance, apiInstanceFormData } from "./apiInstance";
import { LOGIN_TOKEN, versionControl } from "./AuthApi";
import { setToken } from "./ClientHelper";
import localStoreUtil from "./localstore.util";

export const Bucket = process.env.REACT_APP_BUCKET;

export const ApiPostNoAuth = async (endUrl: any, userData: any) => {
  let login_token = await localStoreUtil.get_data(LOGIN_TOKEN);
  if (login_token) {
    await setToken(login_token);
  }
  return new Promise((resolve, reject) => {
    apiInstance
      .post(endUrl, userData)
      .then((responseJson: any) => {
        resolve(responseJson);
        if (
          responseJson.response.status === 401
        ) {
          localStorage.clear()
        }
      })
      .catch((error: any) => {
        if (
          error?.hasOwnProperty("response") &&
          error?.response?.hasOwnProperty("data") &&
          error?.response?.data?.hasOwnProperty("error") &&
          error?.response?.data?.error
        ) {
          reject(error?.response?.data);
        } else {
          reject(error?.response);
        }
      });
  });
};

export const ApiGetNoAuth = async (endUrl: any, body?: any) => {
  let login_token = await localStoreUtil.get_data(LOGIN_TOKEN);
  if (login_token) {
    await setToken(login_token);
  }
  return new Promise((resolve, reject) => {
    apiInstance
      .get(endUrl)
      .then((responseJson: any) => {
        resolve(responseJson);
        if (
          responseJson.response.status === 401
        ) {
          localStorage.clear()
          window.location.pathname = "/login"
        }
      })
      .catch((error) => {
        console.log("error", error);
        if (
          error?.hasOwnProperty("response") &&
          error?.response?.hasOwnProperty("data") &&
          error?.response?.data?.hasOwnProperty("error") &&
          error?.response?.data?.error
        ) {
          reject(error?.response?.data);
        } else {
          reject(error?.response);
        }
      });
  });
};
export const CommonRequest =
  (url: any, data: any, type = "get", params: any, extraData = {}) =>
    async () => {
      let login_token = await localStoreUtil.get_data(LOGIN_TOKEN);
      if (login_token) {
        await setToken(login_token);
      }
      try {
        const reqObj: any = {
          url: url,
          method: type,
          params: params,
          data: data,
          ...extraData,
        };
        const res = await apiInstance.request(reqObj);
        if (reqObj?.responseType == "blob") {
          return res;
        }
        if (res.data.code === 0) {
          throw res.data.message;
        }

        return res.data;
      } catch (err: any) {
        throw {
          code: 0,
          message: typeof err == "object" ? err?.message : err,
        };
      }
    };

export const CreateRoute = (endUrl: any, _versionControl?: any) => {
  return `${_versionControl || versionControl}${endUrl}`;
};
export const ApiPutNoAuth = (endUrl: any, userData: any) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .put(endUrl, userData)
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error?.hasOwnProperty("response") &&
          error?.response?.hasOwnProperty("data") &&
          error?.response?.data?.hasOwnProperty("error") &&
          error?.response?.data?.error
        ) {
          reject(error?.response?.data);
        } else {
          reject(error?.response);
        }
      });
  });
};

export const ApiPatchNoAuth = (endUrl: any, userData: any) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .patch(endUrl, userData)
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error?.hasOwnProperty("response") &&
          error?.response?.hasOwnProperty("data") &&
          error?.response?.data?.hasOwnProperty("error") &&
          error?.response?.data?.error
        ) {
          reject(error?.response?.data);
        } else {
          reject(error?.response);
        }
      });
  });
};

export const ApiDeleteNoAuth = (endUrl: any, body?: any) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .delete(endUrl)
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error?.hasOwnProperty("response") &&
          error?.response?.hasOwnProperty("data") &&
          error?.response?.data?.hasOwnProperty("error") &&
          error?.response?.data?.error
        ) {
          reject(error?.response?.data);
        } else {
          reject(error?.response);
        }
      });
  });
};


export const ApiPostNoAuthFormData = async (endUrl: any, userData: any) => {
  let login_token = await localStoreUtil.get_data(LOGIN_TOKEN);
  if (login_token) {
    await setToken(login_token);
  }
  return new Promise((resolve, reject) => {
    apiInstanceFormData
      .post(endUrl, userData)
      .then((responseJson: any) => {
        resolve(responseJson);
        if (
          responseJson.response.status === 401
        ) {
          localStorage.clear()
        }
      })
      .catch((error: any) => {
        if (
          error?.hasOwnProperty("response") &&
          error?.response?.hasOwnProperty("data") &&
          error?.response?.data?.hasOwnProperty("error") &&
          error?.response?.data?.error
        ) {
          reject(error?.response?.data);
        } else {
          reject(error?.response);
        }
      });
  });
};