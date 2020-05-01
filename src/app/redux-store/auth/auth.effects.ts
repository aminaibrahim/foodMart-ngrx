import { Actions, ofType, Effect } from "@ngrx/effects";
import * as fromAuthActions from "./auth.action";
import { switchMap, catchError, map, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { pipe, of } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { dispatch } from "rxjs/internal/observable/pairs";
import { userModel } from "src/app/auth/user.model";
import { authService } from "src/app/auth/auth.service";

export interface AuthResponseInterface {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = response => {
  const expireTime = new Date(
    new Date().getTime() + +response.expiresIn * 1000
  );
  const user = new userModel(
    response.email,
    response.localId,
    response.idToken,
    expireTime
  );
  localStorage.setItem("user", JSON.stringify(user));
  return new fromAuthActions.AuthSuccess({
    email: response.email,
    uId: response.localId,
    idToken: response.idToken,
    expirationTime: expireTime
  });
};

const handleError = error => {
  let errorMsg = "An unknown error occured";
  if (!error.error || !error.error.error) {
    return of(new fromAuthActions.AuthFail({ errorMessage: errorMsg }));
  }
  switch (error.error.error.message) {
    case "EMAIL_EXISTS": {
      errorMsg =
        " This email already exists..Logging with your password to get into your account";
      break;
    }
    case "EMAIL_NOT_FOUND": {
      errorMsg = " The credentials are incorrect";

      break;
    }
    case "INVALID_PASSWORD": {
      errorMsg = " The credentials are incorrect";

      break;
    }
  }
  return of(new fromAuthActions.AuthFail({ errorMessage: errorMsg }));
};

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(fromAuthActions.LOGIN_START),
    switchMap((authData: fromAuthActions.loginStart) => {
      return this.http
        .post<AuthResponseInterface>(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
            environment.firebase_API_key,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          },

          {
            headers: new HttpHeaders({ "content-type": "application/json" })
          }
        )
        .pipe(
          tap(response => {
            this.authService.setTimerforAutoLogOUt(+response.expiresIn * 1000);
          }),
          map(response => {
            return handleAuthentication(response);
          }),
          catchError(error => {
            return handleError(error);
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(fromAuthActions.AUTH_FAIL, fromAuthActions.LOGOUT),
    tap(() => {
      this.router.navigate(["./auth"]);
    })
  );

  @Effect()
  signup = this.actions$.pipe(
    ofType(fromAuthActions.SIGN_UP_START),
    switchMap((authData: fromAuthActions.SignUpStart) => {
      return this.http
        .post<AuthResponseInterface>(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
            environment.firebase_API_key,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          },
          {
            headers: new HttpHeaders({ "content-type": "application/json" })
          }
        )
        .pipe(
          tap(response => {
            this.authService.setTimerforAutoLogOUt(+response.expiresIn * 1000);
          }),
          map(response => {
            return handleAuthentication(response);
          }),
          catchError(error => {
            return handleError(error);
          })
        );
    })
  );

  @Effect()
  autologin = this.actions$.pipe(
    ofType(fromAuthActions.AUTO_LOGIN),
    map(authLoginData => {
      const userFromStorage = JSON.parse(localStorage.getItem("user"));

      if (!userFromStorage) {
        return { type: "dummy" };
      }

      const user = new userModel(
        userFromStorage.email,
        userFromStorage.uId,
        userFromStorage._idToken,
        new Date(userFromStorage.expirationTime)
      );

      if (user.token) {
        let validUptoInMs = new Date(userFromStorage.expirationTime).getTime();

        let currentimeInMs = new Date().getTime();

        let rem = validUptoInMs - currentimeInMs;

        this.authService.setTimerforAutoLogOUt(+rem);

        return new fromAuthActions.AuthSuccess({
          email: userFromStorage.email,
          uId: userFromStorage.uId,
          idToken: userFromStorage._idToken,
          expirationTime: new Date(userFromStorage.expirationTime)
        });
      }
      return { type: "dummy" };
    })
  );

  @Effect({ dispatch: false })
  autoLogOut = this.actions$.pipe(
    ofType(fromAuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogOutTimer();
      localStorage.removeItem("user");
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: authService
  ) {}
}
