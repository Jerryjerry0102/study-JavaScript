import { Reducer } from "redux";
import {
  LogInSuccessAction,
  LogoutAction,
  LogInSuccessData,
  logInRequestAction,
} from "../actions/user";

interface InitialState {
  isLoggingIn: boolean;
  loading: boolean;
  data: LogInSuccessData | null;
}
const initialState = {
  isLoggingIn: false,
  loading: false,
  data: null,
};

type UserReducerActions =
  | LogInSuccessAction
  | LogoutAction
  | logInRequestAction;
const userReducer: Reducer<InitialState, UserReducerActions> = (
  prevState = initialState,
  action
) => {
  // 새로운 state 만들어주기
  switch (action.type) {
    case "LOG_IN_REQUEST":
      return {
        ...prevState,
        loading: true,
      };
    case "LOG_IN_SUCCESS":
      return {
        ...prevState,
        loading: false,
        data: action.data,
      };
    case "LOG_OUT":
      return {
        ...prevState,
        data: null,
      };
    default:
      return prevState;
  }
};

export default userReducer;
