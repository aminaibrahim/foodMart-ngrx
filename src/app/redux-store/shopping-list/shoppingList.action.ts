import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = "[shoppingList] ADD_INGREDIENT";
export const ADD_INGREDIENTS = "[shoppingList] ADD_INGREDIENTS";
export const UPDATE_INGREDIENT = "[shoppingList] UPDATE_INGREDIENT";
export const DELETE_INGREDIENT = "[shoppingList] DELETE_INGREDIENT";
export const START_EDIT_INGREDIENT = "[shoppingList] START_EDIT_INGREDIENT";
export const STOP_EDIT_INGREDIENT = "[shoppingList] STOP_EDIT_INGREDIENT";

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}
export class updateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: Ingredient) {}
}
export class deleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

export class StartEditIngredient implements Action {
  readonly type = START_EDIT_INGREDIENT;
  constructor(public index: number) {}
}

export class StopEditIngredient implements Action {
  readonly type = STOP_EDIT_INGREDIENT;
}
export type shoppingListActionTypes =
  | AddIngredient
  | AddIngredients
  | updateIngredient
  | deleteIngredient
  | StartEditIngredient
  | StopEditIngredient;
