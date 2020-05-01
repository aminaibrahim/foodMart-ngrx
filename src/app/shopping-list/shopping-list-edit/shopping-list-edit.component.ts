import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { NgForm } from "@angular/forms";
import * as shoppingListActions from "src/app/redux-store/shopping-list/shoppingList.action";
import { Subscription, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromAppRoot from "src/app/redux-store/app.reducer";

@Component({
  selector: "app-shopping-list-edit",
  templateUrl: "./shopping-list-edit.component.html",
  styleUrls: ["./shopping-list-edit.component.css"]
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  constructor(private Store: Store<fromAppRoot.RootStateInterface>) {}

  @ViewChild("shoppingForm") shoppingListForm: NgForm;

  editSubscription: Subscription;
  editedMode: boolean = false;
  ingredientToEdit: Ingredient;
  indexToEdit: number;

  ingredientsObservable: Observable<{ ingredients: Ingredient[] }>;

  ngOnInit(): void {
    this.editSubscription = this.Store.select("shoppingList").subscribe(
      data => {
        if (data.editedIndex > -1) {
          this.editedMode = true;
          this.indexToEdit = data.editedIndex;
          this.ingredientToEdit = data.editedIngredient;

          this.shoppingListForm.setValue({
            name: this.ingredientToEdit.name,
            amount: this.ingredientToEdit.amount
          });
        } else {
          this.editedMode = false;
        }
      }
    );
  }

  onSubmit() {
    const item = {
      name: this.shoppingListForm.value.name,
      amount: this.shoppingListForm.value.amount
    };
    if (this.editedMode) {
      this.Store.dispatch(new shoppingListActions.updateIngredient(item));
    } else {
      this.Store.dispatch(new shoppingListActions.AddIngredient(item));
    }
    this.resettingForm();
  }

  onClear() {
    this.resettingForm();
    this.Store.dispatch(new shoppingListActions.StopEditIngredient());
  }

  onDelete() {
    this.Store.dispatch(new shoppingListActions.deleteIngredient());

    this.resettingForm();
  }
  ngOnDestroy() {
    this.editSubscription.unsubscribe();
    this.Store.dispatch(new shoppingListActions.StopEditIngredient());
  }
  resettingForm() {
    this.shoppingListForm.reset();
    this.editedMode = false;
  }
}
