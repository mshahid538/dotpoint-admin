import { AppActions } from "@redux/Redux/CommonApp/appSlice";
import { useDispatch } from "react-redux";

export default function usePageLoader() {
    const dispatch = useDispatch();
    const setFullPageLoader = (open: boolean) => {
        return dispatch(AppActions.actions.setFullPageLoader(open));
    };
    return setFullPageLoader;
}
