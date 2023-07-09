import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export enum ToasterPosition {
  topRight = 'toast-top-right',
  topLeft = 'toast-top-left',
  bottomRight = 'toast-bottom-right',
  bottomLeft = 'toast-bottom-left',
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  defaultPosition = ToasterPosition.bottomLeft;

  constructor(private toastr: ToastrService) {}

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title, {
      timeOut: 4000,
      closeButton: true,
      progressBar: true,
      positionClass: this.defaultPosition,
    });
  }

  showError(message: string, title: string) {
    this.toastr.error(message, title, {
      timeOut: 4000,
      closeButton: true,
      progressBar: true,
      positionClass: this.defaultPosition,
    });
  }

  showInfo(message: string, title: string) {
    this.toastr.info(message, title, {
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
      positionClass: this.defaultPosition,
    });
  }

  showWarning(message: string, title: string) {
    this.toastr.warning(message, title, {
      timeOut: 4000,
      closeButton: true,
      progressBar: true,
      positionClass: this.defaultPosition,
    });
  }
}
