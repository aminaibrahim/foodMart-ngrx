import { Ingredient } from "src/app/shared/ingredient.model";
import * as shoppingListAction from "./shoppingList.action";

export interface ShoppingListStateInterface {
  ingredients: Ingredient[];
  editedIndex: number;
  editedIngredient: Ingredient;
}

const initialShoppingListState: ShoppingListStateInterface = {
  ingredients: [new Ingredient("apple", 10), new Ingredient("orange", 5)],
  editedIndex: -1,
  editedIngredient: null
};

export function shoppingListReducerFunction(
  state = initialShoppingListState,
  action: shoppingListAction.shoppingListActionTypes
) {
  switch (action.type) {
    case shoppingListAction.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    }
    case shoppingListAction.ADD_INGREDIENTS: {
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    }
    case shoppingListAction.DELETE_INGREDIENT: {
      const currentStateCopy = [...state.ingredients];
      return {
        ...state,
        ingredients: currentStateCopy.filter(
          (element, i) => i !== state.editedIndex
        ),
        editedIndex: -1,
        editedIngredient: null
      };
    }
    case shoppingListAction.UPDATE_INGREDIENT: {
      const currentStateCopy = [...state.ingredients];
      currentStateCopy[state.editedIndex] = {
        ...currentStateCopy[state.editedIndex],
        ...action.payload
      };

      return {
        ...state,
        ingredients: currentStateCopy,
        editedIndex: -1,
        editedIngredient: null
      };
    }

    case shoppingListAction.START_EDIT_INGREDIENT: {
      return {
        ...state,
        editedIndex: action.index,
        editedIngredient: { ...state.ingredients[action.index] }
      };
    }
    case shoppingListAction.STOP_EDIT_INGREDIENT: {
      return {
        ...state,
        editedIndex: -1,
        editedIngredient: null
      };
    }

    default:
      return state;
  }
}
