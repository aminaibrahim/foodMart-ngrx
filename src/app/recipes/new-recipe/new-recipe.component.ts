import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import * as fromAppRoot from "src/app/redux-store/app.reducer";
import * as recipeActions from "src/app/redux-store/recipes/recipes.action";
import { Subscription } from "rxjs";
@Component({
  selector: "app-new-recipe",
  templateUrl: "./new-recipe.component.html",
  styleUrls: ["./new-recipe.component.css"]
})
export class NewRecipeComponent implements OnInit, OnDestroy {
  id: number;
  editMode: boolean = false;
  RecipeForm: FormGroup;
  private recipeChangeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAppRoot.RootStateInterface>
  ) {}

  ngOnInit(): void {
    this.recipeChangeSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params["id"];
        this.editMode = params["id"] ? true : false;

        let name = "";
        let imageUrl = "";
        let description = "";
        let ingredientsArray = new FormArray([]);

        if (this.editMode) {
          this.store
            .select("recipes")
            .pipe(
              map(recipeState => {
                return recipeState.recipes.find((element, index) => {
                  return index === this.id;
                });
              })
            )
            .subscribe(recipeToEdit => {
              name = recipeToEdit.name;
              imageUrl = recipeToEdit.imagePath;
              description = recipeToEdit.description;
              if (recipeToEdit["ingredients"]) {
                recipeToEdit.ingredients.forEach((ing, index) => {
                  ingredientsArray.push(
                    new FormGroup({
                      name: new FormControl(ing.name, Validators.required),
                      amount: new FormControl(ing.amount, [
                        Validators.required,
                        Validators.pattern("^[1-9]+[0-9]*$")
                      ])
                    })
                  );
                });
              }
            });
        }

        this.RecipeForm = new FormGroup({
          name: new FormControl(name, Validators.required),
          imagePath: new FormControl(imageUrl, Validators.required),
          description: new FormControl(description, Validators.required),
          ingredients: ingredientsArray
        });
      }
    );
  }

  onSubmit() {
    if (this.editMode) {
      // this.recipeservice.editRecipe(this.id, this.RecipeForm.value);
      this.store.dispatch(
        new recipeActions.UpdateRecipes({
          index: this.id,
          data: this.RecipeForm.value
        })
      );

      console.log(this.RecipeForm.value);
    } else {
      // this.recipeservice.addNewRecipe(this.RecipeForm.value);
      this.store.dispatch(new recipeActions.addRecipes(this.RecipeForm.value));
    }
    this.cancelEdit();
  }
  cancelEdit() {
    this.RecipeForm.reset();
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  getGroupControls = () => {
    // return this.RecipeForm.get("ingredients").value;
    return (<FormArray>this.RecipeForm.get("ingredients")).controls;
  };

  addIngredient() {
    (<FormArray>this.RecipeForm.get("ingredients")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern("^[1-9]+[0-9]*$")
        ])
      })
    );
  }

  onDeletIngredient(index: number) {
    (<FormArray>this.RecipeForm.get("ingredients")).removeAt(index);
  }

  ngOnDestroy() {
    if (this.recipeChangeSubscription)
      this.recipeChangeSubscription.unsubscribe();
  }
}
