import { Recipe } from "src/app/recipes/recipe.model";
import * as recipeActions from "./recipes.action";

export interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: []
};

export function RecipeReducer(
  state = initialState,
  action: recipeActions.recipeActionTypes
) {
  switch (action.type) {
    case recipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };

    case recipeActions.ADD_RECIPES:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };

    case recipeActions.UPDATE_RECIPES:
      const updatedRecipes = [...state.recipes];
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.data
      };
      updatedRecipes[action.payload.index] = updatedRecipe;
      console.log(updatedRecipes);
      console.log(
        "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj"
      );

      return {
        ...state,
        recipes: updatedRecipes
      };

    case recipeActions.DELETE_RECIPES:
      const newData = state.recipes.filter(
        (e, index) => index !== action.index
      );
      return {
        ...state,
        recipes: newData
      };

    default:
      return state;
  }
}
