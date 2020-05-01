import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const approutes: Routes = [
  {
    path: "",
    redirectTo: "/recipes",
    pathMatch: "full"
  },
  {
    path: "recipes",
    loadChildren: () =>
      import("./recipes/recipe.module").then(module => module.recipeModule)
  },
  {
    path: "shopping-list",
    loadChildren: () =>
      import("./shopping-list/shopping.module").then(
        module => module.shoppingModule
      )
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./auth/auth.module").then(module => module.AuthModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(approutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
