 import { AppActions } from "@redux/Redux/CommonApp/appSlice";
import { useDispatch } from "react-redux";

export default function useSnackBar() {
  const dispatch = useDispatch();
  const setSnackBar = (type: string, message: string) => {
    return dispatch(
      AppActions.actions.setSnackBar({
        open: true,
        type: type,
        message: message,
      })
    );
  };
  const closeSnackBar = () => {
    return dispatch(
      AppActions.actions.setSnackBar({
        open: false,
        type: "",
        message: "",
      })
    );
  };
  return { setSnackBar, closeSnackBar };
}
