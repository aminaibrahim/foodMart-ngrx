import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";

import { userModel } from "../auth/user.model";
import * as fromAppRoute from "../redux-store/app.reducer";
import * as fromAuthActions from "../redux-store/auth/auth.action";
import * as RecipeActions from "../redux-store/recipes/recipes.action";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class headerComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromAppRoute.RootStateInterface>) {}
  saveData() {
    this.store.dispatch(new RecipeActions.storeRecipes());
  }

  fetchData() {
    this.store.dispatch(new RecipeActions.fetchRecipes());
  }

  logged: boolean = false;
  currentUser: userModel;

  private whetherLogged: Subscription;
  ngOnInit() {
    this.whetherLogged = this.store
      .select("auth")
      .pipe(map(authState => authState.user))
      .subscribe(userData => {
        this.currentUser = userData;

        this.logged = !!userData;
      });
  }

  onLogOut() {
    this.store.dispatch(new fromAuthActions.logOut());
  }
  ngOnDestroy() {
    this.whetherLogged.unsubscribe();
  }
}
