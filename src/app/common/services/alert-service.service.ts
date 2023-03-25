import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  constructor() { }

  showErrorAlert(title: string, text: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
    });
  }
  showSuccessAlert(title: string, text: string) {
    Swal.fire({
      icon: 'success',
      title: title,
      text: text,
    });
  }
}
