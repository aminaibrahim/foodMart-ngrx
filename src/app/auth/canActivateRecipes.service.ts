import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from "@angular/router";
import { Injectable } from "@angular/core";
import { userModel } from "./user.model";
import { Observable } from "rxjs";
import { authService } from "./auth.service";
import { take, map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as fromAppRoute from "../redux-store/app.reducer";

@Injectable({
  providedIn: "root"
})
export class CanActivateRecipeGuard implements CanActivate {
  constructor(
    private authservice: authService,
    private router: Router,
    private store: Store<fromAppRoute.RootStateInterface>
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select("auth").pipe(
      take(1),
      map(authState => authState.user),
      map(user => {
        const isAuth = !!user;
        if (isAuth) return true;
        else return this.router.createUrlTree(["/auth"]);
      })
    );
  }
}
