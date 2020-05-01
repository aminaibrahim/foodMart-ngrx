import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { ErrorComponent } from "../error/error.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [AuthComponent, ErrorComponent],
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: AuthComponent
      }
    ]),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule {}
