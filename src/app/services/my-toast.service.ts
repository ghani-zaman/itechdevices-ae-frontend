import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MyToastService {

  constructor(private toast: ToastrService) { }

  error(msg): void {
    this.toast.error(msg);
  }
  success(msg): void{
    this.toast.success(msg);
  }

 }
