import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.css"]
})
export class ErrorComponent {
  @Input() message;
  @Output() errorevent = new EventEmitter<void>();

  onError() {
    this.errorevent.emit();
  }
}
