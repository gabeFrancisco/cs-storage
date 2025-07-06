import { CashRegisterService } from './../cash-register.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cash-post-modal',
  standalone: false,
  templateUrl: './cash-post-modal.component.html',
  styleUrl: './cash-post-modal.component.css'
})
export class CashPostModalComponent {
  show = false;

  constructor(private cashRegisterService: CashRegisterService){
    this.cashRegisterService.cashPostModalState$.subscribe((value) => {
      this.show = value
    })
  }

  close(){
    this.cashRegisterService.closeCashPostModal()
  }
}
