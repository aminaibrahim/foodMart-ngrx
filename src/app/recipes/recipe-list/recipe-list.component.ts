import { Component, OnInit, OnDestroy } from "@angular/core";
import { Recipe } from "../recipe.model";
import { Subscription } from "rxjs";
import * as fromAppRoute from "src/app/redux-store/app.reducer";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeChangeSubscription: Subscription;

  constructor(private store: Store<fromAppRoute.RootStateInterface>) {}

  ngOnInit(): void {
    this.recipeChangeSubscription = this.store
      .select("recipes")
      .pipe(map(recipeStatedata => recipeStatedata.recipes))
      .subscribe(data => {
        this.recipes = data;
      });
  }
  ngOnDestroy() {
    this.recipeChangeSubscription.unsubscribe();
  }
}
