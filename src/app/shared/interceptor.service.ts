import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from "@angular/common/http";
import { authService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { OnDestroy, Injectable } from "@angular/core";
import { take, exhaustMap, map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as fromAppRoot from "../redux-store/app.reducer";

@Injectable()
export class interceptRequest implements HttpInterceptor {
  constructor(
    private authservice: authService,
    private store: Store<fromAppRoot.RootStateInterface>
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select("auth").pipe(
      take(1),
      map(appState => appState.user),
      exhaustMap(data => {
        if (data === null) return next.handle(req);
        let modifiedRequest = req.clone({
          params: req.params.append("auth", data.token)
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
