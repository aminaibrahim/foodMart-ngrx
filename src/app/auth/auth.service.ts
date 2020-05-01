import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";

import * as fromAppRootState from "../redux-store/app.reducer";
import * as fromAuthAction from "../redux-store/auth/auth.action";

@Injectable({
  providedIn: "root"
})
export class authService {
  timeOutForLOgOut;

  constructor(private store: Store<fromAppRootState.RootStateInterface>) {}

  setTimerforAutoLogOUt(expiresInMilliSeconds) {
    this.timeOutForLOgOut = setTimeout(() => {
      this.store.dispatch(new fromAuthAction.logOut());
    }, expiresInMilliSeconds);
  }

  clearLogOutTimer() {
    if (this.timeOutForLOgOut) {
      clearTimeout(this.timeOutForLOgOut);
    }
    this.timeOutForLOgOut = null;
  }
}
