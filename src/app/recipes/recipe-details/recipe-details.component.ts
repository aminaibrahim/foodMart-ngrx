import { Component, OnInit, Input } from "@angular/core";

import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, switchMap } from "rxjs/operators";

import * as fromAppRoot from "src/app/redux-store/app.reducer";
import * as shoppingListActions from "src/app/redux-store/shopping-list/shoppingList.action";

import * as RecipeActions from "src/app/redux-store/recipes/recipes.action";

@Component({
  selector: "app-recipe-details",
  templateUrl: "./recipe-details.component.html",
  styleUrls: ["./recipe-details.component.css"]
})
export class RecipeDetailsComponent implements OnInit {
  item;
  requiredId;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAppRoot.RootStateInterface>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: Params) => +params["id"]),
        switchMap(data => {
          this.requiredId = data;
          return this.store.select("recipes");
        }),
        map(recipeStateData => {
          return recipeStateData.recipes.find((element, index) => {
            return index === this.requiredId;
          });
        })
      )
      .subscribe(data => {
        this.item = data;
      });
  }
  addToShoppingList() {
    this.store.dispatch(
      new shoppingListActions.AddIngredients(this.item.ingredients)
    );
  }
  onEditRecipeButtonClick() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  onDeleteButtonClicked() {
    // this.recipeservice.deleteRecipe(this.requiredId);
    this.store.dispatch(new RecipeActions.deleteRecipes(this.requiredId));
    this.router.navigate(["../"], { relativeTo: this.route });
  }
}
