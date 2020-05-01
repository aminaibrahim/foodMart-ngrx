import {
  Directive,
  Input,
  HostListener,
  HostBinding,
  OnInit,
  ElementRef
} from "@angular/core";

@Directive({
  selector: "[appDropdownDirective]"
})
export class dropDownDirective {
  constructor(private elRef: ElementRef) {}

  @HostBinding("class.open") isOpen = false;

  //   @HostListener("click") toggleDropDown(event: Event) {
  //     console.log(event);

  //     this.isOpen = !this.isOpen;
  //   }

  @HostListener("document:click", ["$event"]) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }
}
