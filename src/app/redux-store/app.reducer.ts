import * as fromShoppingReducer from "./shopping-list/shoppingList.reducer";
import * as fromAuthReducer from "./auth/auth.reducer";
import * as fromRecipeReducer from "./recipes/recipes.reducer";
import { ActionReducerMap } from "@ngrx/store";

export interface RootStateInterface {
  shoppingList: fromShoppingReducer.ShoppingListStateInterface;
  auth: fromAuthReducer.authStateInterface;
  recipes: fromRecipeReducer.RecipeState;
}

export const appRootState: ActionReducerMap<RootStateInterface> = {
  shoppingList: fromShoppingReducer.shoppingListReducerFunction,
  auth: fromAuthReducer.authReducer,
  recipes: fromRecipeReducer.RecipeReducer
};
