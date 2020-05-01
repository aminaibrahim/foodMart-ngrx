import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { ErrorComponent } from "../error/error.component";
import { containerREfDirective } from "../shared/directives/containertRef.directive";
import { Store } from "@ngrx/store";
import * as fromAppRoot from "../redux-store/app.reducer";
import * as authActions from "../redux-store/auth/auth.action";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoggingMode: boolean = true;
  loading: boolean = false;
  userDetialsForm;
  error = null;
  errorSub: Subscription;
  authSub: Subscription;

  @ViewChild(containerREfDirective, { static: true })
  containerRef: containerREfDirective;
  constructor(
    private router: Router,
    private dynamicComponentFactory: ComponentFactoryResolver,
    private store: Store<fromAppRoot.RootStateInterface>
  ) {}

  ngOnInit(): void {
    this.authSub = this.store.select("auth").subscribe(authStateData => {
      (this.loading = authStateData.loading),
        (this.error = authStateData.errorMsg);

      if (this.error) {
        this.onErrorOccured(this.error);
      } else {
        this.router.navigate(["./recipes"]);
      }
    });
    this.userDetialsForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }
  switchMode() {
    this.isLoggingMode = !this.isLoggingMode;
  }
  onsubmitForm() {
    if (!this.userDetialsForm.valid) {
      return;
    }
    this.loading = true;

    if (this.isLoggingMode) {
      this.store.dispatch(
        new authActions.loginStart({
          email: this.userDetialsForm.value.email,
          password: this.userDetialsForm.value.password
        })
      );
    } else {
      this.store.dispatch(
        new authActions.SignUpStart({
          email: this.userDetialsForm.value.email,
          password: this.userDetialsForm.value.password
        })
      );
    }
    this.userDetialsForm.reset();
  }

  onHandleError() {
    this.store.dispatch(new authActions.clearError());
  }

  onErrorOccured(error) {
    const componentFactory = this.dynamicComponentFactory.resolveComponentFactory(
      ErrorComponent
    );
    const viewContainerRef = this.containerRef.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);

    componentRef.instance.message = error;
    this.errorSub = componentRef.instance.errorevent.subscribe(data => {
      this.errorSub.unsubscribe();
      viewContainerRef.clear();
      this.error = null;
    });
  }

  ngOnDestroy() {
    if (this.errorSub) this.errorSub.unsubscribe();
    if (this.authSub) this.authSub.unsubscribe();
  }
}
