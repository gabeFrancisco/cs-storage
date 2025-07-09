import { Component } from '@angular/core';
import { DebtService } from '../../../services/debt.service';

@Component({
  selector: 'app-debt-post-modal',
  standalone: false,
  templateUrl: './debt-post-modal.component.html',
  styleUrl: './debt-post-modal.component.css'
})
export class DebtPostModalComponent {
  show = false;

  constructor(private debtService: DebtService) {
    this.debtService.debtPostModalState$.subscribe((value) => {
      this.show = value
    })
  }

  close() {
    this.debtService.closeDebtPostModal();
  }
}
