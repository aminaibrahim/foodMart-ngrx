import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { headerComponent } from "./header/header.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";

import { SharedModule } from "./shared/shared.module";
import { coreModule } from "./core-modules.module";
import { StoreModule } from "@ngrx/store";

import { appRootState } from "./redux-store/app.reducer";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./redux-store/auth/auth.effects";
import { recipeEffects } from "./redux-store/recipes/recipes.effects";

@NgModule({
  declarations: [AppComponent, headerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    coreModule,
    StoreModule.forRoot(appRootState),
    EffectsModule.forRoot([AuthEffects, recipeEffects])
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
