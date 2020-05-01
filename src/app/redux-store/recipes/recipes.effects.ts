import { Actions, Effect, ofType } from "@ngrx/effects";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { switchMap, map, withLatestFrom } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromAppRoot from "src/app/redux-store/app.reducer";
import { Recipe } from "src/app/recipes/recipe.model";
import * as RecipeActions from "./recipes.action";

@Injectable()
export class recipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http
        .get<Recipe[]>(
          "https://recipe-project-200c8.firebaseio.com/recipes.json"
        )
        .pipe(
          map(arraydata => {
            return arraydata.map(eachrecipe => {
              return {
                ...eachrecipe,
                ingredients: eachrecipe.ingredients
                  ? eachrecipe.ingredients
                  : []
              };
            });
          })
        );
    }),
    map(recipes => {
      return new RecipeActions.SetRecipes(recipes);
    })
  );

  @Effect({ dispatch: false })
  storeRecipesToServer = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select("recipes")),
    switchMap(([action, recipeState]) => {
      return this.http.put(
        "https://recipe-project-200c8.firebaseio.com/recipes.json",
        recipeState.recipes
      );
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromAppRoot.RootStateInterface>
  ) {}
}
