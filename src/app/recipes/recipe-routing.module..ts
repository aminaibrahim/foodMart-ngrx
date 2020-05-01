import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { CanActivateRecipeGuard } from "../auth/canActivateRecipes.service";
import { WarningMessageComponent } from "../warning-message/warning-message.component";
import { NewRecipeComponent } from "./new-recipe/new-recipe.component";
import { RecipesResolverService } from "./recipeGuard.service";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";

const recipeRoutes: Routes = [
  {
    path: "",
    component: RecipesComponent,
    canActivate: [CanActivateRecipeGuard],

    children: [
      {
        path: "",
        component: WarningMessageComponent,
        pathMatch: "full"
      },
      {
        path: "new-recipe",
        component: NewRecipeComponent
      },
      {
        path: ":id",
        resolve: [RecipesResolverService],

        component: RecipeDetailsComponent
      },
      {
        path: ":id/edit",
        resolve: [RecipesResolverService],

        component: NewRecipeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(recipeRoutes)],
  exports: [RouterModule]
})
export class recipeRoutingModule {}
