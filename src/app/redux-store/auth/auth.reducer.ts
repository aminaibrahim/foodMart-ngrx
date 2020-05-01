import { userModel } from "src/app/auth/user.model";
import * as fromAuthActions from "./auth.action";

export interface authStateInterface {
  user: userModel;
  errorMsg: string;
  loading: boolean;
}

const authInitialState: authStateInterface = {
  user: null,
  errorMsg: null,
  loading: false
};

export function authReducer(
  state = authInitialState,
  action: fromAuthActions.authActionTypes
) {
  console.log(action.type);

  switch (action.type) {
    case fromAuthActions.AUTH_SUCCESS:
      return {
        ...state,
        errorMsg: null,
        loading: false,
        user: new userModel(
          action.payload.email,
          action.payload.uId,
          action.payload.idToken,
          action.payload.expirationTime
        )
      };

    case fromAuthActions.LOGOUT:
      return {
        ...state,
        errorMsg: null,
        user: null
      };

    case fromAuthActions.LOGIN_START:
    case fromAuthActions.SIGN_UP_START:
      return {
        ...state,
        loading: true,

        errorMsg: null
      };

    case fromAuthActions.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload.errorMessage
      };
    case fromAuthActions.CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        errorMsg: null
      };

    default: {
      return state;
    }
  }
}
