import { Component, OnInit } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as shoppingListAction from "src/app/redux-store/shopping-list/shoppingList.action";
import * as fromAppRoot from "src/app/redux-store/app.reducer";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit {
  ingredients;
  ingredientObs: Observable<{ ingredients: Ingredient[] }>;
  constructor(private Store: Store<fromAppRoot.RootStateInterface>) {}

  ngOnInit(): void {
    this.ingredientObs = this.Store.select("shoppingList");
  }
  onIngredientItemClick(index: number) {
    this.Store.dispatch(new shoppingListAction.StartEditIngredient(index));
  }
}
