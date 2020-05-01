import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { NewRecipeComponent } from "./new-recipe/new-recipe.component";
import { WarningMessageComponent } from "../warning-message/warning-message.component";
import { ReactiveFormsModule } from "@angular/forms";
import { recipeRoutingModule } from "./recipe-routing.module.";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailsComponent,
    NewRecipeComponent,
    WarningMessageComponent
  ],
  imports: [recipeRoutingModule, ReactiveFormsModule, SharedModule]
})
export class recipeModule {}
