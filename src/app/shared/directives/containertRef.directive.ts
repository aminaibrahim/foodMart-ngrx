import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[app-Refcomponent]"
})
export class containerREfDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
