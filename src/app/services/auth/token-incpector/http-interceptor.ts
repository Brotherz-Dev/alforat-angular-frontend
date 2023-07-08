import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { finalize } from "rxjs";
import { StorageService } from "../../storage-service/storage.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private readonly storageService: StorageService, private spinner: NgxSpinnerService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.spinner.show();
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 1998);
    request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    let token: string | null = this.storageService.getToken();
    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }
    return next.handle(request).pipe(finalize(() => {
      this.spinner.hide();
    }));
  }
}