import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(
    private toastrService: ToastrService
  ) { }

  shortToastSuccess(message:string, title:string){
    return this.toastrService.success(message, title,{
      timeOut: 3000
    });
  }
}
