import { NgModule } from "@angular/core";
import { containerREfDirective } from "./directives/containertRef.directive";
import { dropDownDirective } from "./directives/dropdown.directives";
import { loadingComponent } from "./loading-component/loading.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [containerREfDirective, dropDownDirective, loadingComponent],
  imports: [CommonModule],
  exports: [
    containerREfDirective,
    dropDownDirective,
    loadingComponent,
    CommonModule
  ]
})
export class SharedModule {}
