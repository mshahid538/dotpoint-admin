// export const BaseUrl = "https://dotpoint.api.webisheet.com/";
export const BaseUrl = "http://localhost:4000/";

// export const ApiUrlPersona = "persona/";
export const versionControl = "v1/";

export const api = {
  login: "admin/login",
  google: "admin/google",
  addChallenge: "admin/challenge_list",
  editChallenge: "admin/challenge_list",
  deleteChallenge: "admin/challenge_list",
  getChallenge: "admin/challenge_list/get",
  getByIdChallenge: "admin/challenge_list",
  getCurrency_list: "admin/currency_list/get",
  getServer: "admin/server/get",
  addUserManagement: "admin/user",
  getUserManagement: "admin/user/get",
  updateUserManagement: "admin/user",
  getByIdUserManagment: "admin/user",
  activeInactiveUserManagment: "admin/user/unblock_block",
  getTradingObjectives: "admin/challenge_users/get",
  resetAccountBalance: "admin/reset_account",
  //Approval
  getChallengeApproval: "admin/challenge_approval/get",
  statusChangesRequest: "admin/challenge_approval",
  //KYC verificatio
  getKycVerification: "admin/kyc_verification/get",
  statusChangesVerification: "admin/kyc_verification",
  //Currency
  addCurrency: "admin/currency_list",
  getCurrency: "admin/currency_list",
  updateCurrency: "admin/currency_list",
  deleteCurrency: "admin/currency_list",
  listCurrency: "admin/currency_list/get",
  uploadImg: "upload/image/attachment",

  getCoupon: "admin/coupon",
  addCoupon: "admin/coupon",
  updateCoupon: "admin/coupon",

  getPayout: "admin/profit_withdrawal/get",
  addPayout: "admin/profit_withdrawal/approval",
  getCustomerSupport: "admin/customer_support/get",

  getDashboard: "admin/dashboard/get",
};

export const LOGIN_TOKEN = "access_token";
export const REFRESH_LOGIN_TOKEN = "refresh_token";
export const candidateId = "candidateId";
export const BASE_URL_UPLOAD = "https://dotpoint-storage.s3.ap-southeast-1.amazonaws.com/"

// export const baseUrlPerson = BaseUrl + ApiUrlPersona+version;
// export const baseUrlAuth = BaseUrl + ApiUrlAuth +version;
// User​/VerifyUserAccount
// ​v1​/Login​/CreatePassword
// ​v1​/Preference​/IndustryPreferenceList
// ​v1​/Partner​/GetPartnerDetail
// v1/HiringExpertise/HiringExpertiseList
// v1/Preference/RolePreferenceList?PageIndex=1&PageSize=10&SearchText=i
// ​v1​/Requisition​/UpdateScreeningQuestion
// v1​/RequisitionTransaction​/GetRequisitionTranType
// v1/Requisition/UpdateScreeningQuestion
// ​v1​/Requisition​/UpdateRequisitionMatrix
// v1​/PartnerRequisition​/PublishedRequisitionForPartner
// v1​/PartnerRequisition​/AcceptRejectRequisitionList
// ​v1​/Requisition​/GetRequisitionDetail
// v1​/PartnerRequisition​/AcceptRejectRequisition
