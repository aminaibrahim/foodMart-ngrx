import { Action } from "@ngrx/store";
import { Recipe } from "src/app/recipes/recipe.model";

export const SET_RECIPES = "[recipes] setRecipes";
export const FETCH_RECIPES = "[recipes] fetchRecipes";
export const ADD_RECIPES = "[recipes] addRecipes";
export const UPDATE_RECIPES = "[recipes] updateRecipes";
export const DELETE_RECIPES = "[recipes] deleteRecipes";
export const STORE_RECIPES = "[recipes] storeRecipes";

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export class fetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class addRecipes implements Action {
  readonly type = ADD_RECIPES;
  constructor(public payload: Recipe) {}
}

export class UpdateRecipes implements Action {
  readonly type = UPDATE_RECIPES;
  constructor(public payload: { index: number; data: Recipe }) {}
}

export class deleteRecipes implements Action {
  readonly type = DELETE_RECIPES;
  constructor(public index: number) {}
}

export class storeRecipes implements Action {
  readonly type = STORE_RECIPES;
}

export type recipeActionTypes =
  | SetRecipes
  | fetchRecipes
  | addRecipes
  | UpdateRecipes
  | deleteRecipes;
