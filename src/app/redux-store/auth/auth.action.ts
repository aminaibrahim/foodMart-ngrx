import { Action } from "@ngrx/store";

export const AUTH_SUCCESS = "[auth] Success";
export const LOGOUT = "[auth] logout";
export const LOGIN_START = "[auth] loginStart";
export const AUTH_FAIL = "[auth] fail";
export const SIGN_UP_START = "[auth] SignUpStart";
export const CLEAR_ERROR = "[auth] clear error";
export const AUTO_LOGIN = "[auth] autoLogin";

export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;
  constructor(
    public payload: {
      email: string;
      uId: string;
      idToken: string;
      expirationTime;
    }
  ) {}
}

export class logOut implements Action {
  readonly type = LOGOUT;
}

export class loginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class AuthFail implements Action {
  readonly type = AUTH_FAIL;
  constructor(public payload: { errorMessage: string }) {}
}

export class SignUpStart implements Action {
  readonly type = SIGN_UP_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class clearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class autoLogin implements Action {
  readonly type = AUTO_LOGIN;
}
export type authActionTypes =
  | AuthSuccess
  | logOut
  | loginStart
  | AuthFail
  | SignUpStart
  | clearError
  | autoLogin;
