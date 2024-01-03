import { createSlice, combineReducers, PayloadAction } from "@reduxjs/toolkit";

interface SnackBarState {
  open: boolean;
  type: string;
  message: string;
}
const initialState = {
  snackBar: {
    open: false,
    type: "success",
    message: "",
  } as SnackBarState,
  fullPageLoaderOpen: false,
};

export const AppActions = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSnackBar: {
      reducer: (state, action: PayloadAction<SnackBarState>) => {
        state.snackBar = action.payload;
      },
      prepare: (payload: SnackBarState) => {
        return {
          payload: payload,
        };
      },
    },
    setFullPageLoader: {
      reducer: (state, action: PayloadAction<boolean>) => {
        state.fullPageLoaderOpen = action.payload;
      },
      prepare: (open: boolean) => {
        return {
          payload: open,
        };
      },
    },
  },
});

export default combineReducers({
  common: AppActions.reducer,
});
