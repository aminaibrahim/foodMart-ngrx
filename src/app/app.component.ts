import { Component, OnInit } from "@angular/core";
import { authService } from "./auth/auth.service";
import { Store } from "@ngrx/store";
import * as fromAppRoot from "./redux-store/app.reducer";
import * as fromAuthActions from "./redux-store/auth/auth.action";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "foodMart";

  constructor(
    private authService: authService,
    private Store: Store<fromAppRoot.RootStateInterface>
  ) {}
  ngOnInit() {
    this.Store.dispatch(new fromAuthActions.autoLogin());
  }
}
