import { configureStore } from "@reduxjs/toolkit";
// import AuthSlice from "@redux/Redux/Auth/AuthSlice";
// import ClientSlice from "./Auth/ClientSlice";
// import PartnerSlice from "./Auth/PartnerSlice";
import appSlice from "./CommonApp/appSlice";
// import RcloudSlice from "./Auth/RcloudSlice";
// import CandidateMovementSlice from "./Auth/CandidateMovementSlice";
// import PromotionalSlice from "./Auth/PromotionalSlice";
// import DefiningMaster from "./Auth/DefiningMaster";
// import FiledConfigurationSlice from "./Auth/FiledConfigurationSlice";

export const store = configureStore({
  reducer: {
    // auth: AuthSlice,
    // client: ClientSlice,
    // partner: PartnerSlice,
    app: appSlice,
    // rcloud: RcloudSlice,
    // candidateMovement: CandidateMovementSlice,
    // pramotional: PromotionalSlice,
    // definingMaster: DefiningMaster,
    // filedConfiguration: FiledConfigurationSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
