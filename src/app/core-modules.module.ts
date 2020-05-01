import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { interceptRequest } from "./shared/interceptor.service";

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: interceptRequest,
      multi: true
    }
  ]
})
export class coreModule {}
