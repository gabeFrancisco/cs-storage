import { Component } from '@angular/core';
import { DebtService } from '../../../services/debt.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-debt-post-modal',
  standalone: false,
  templateUrl: './debt-post-modal.component.html',
  styleUrl: './debt-post-modal.component.css'
})
export class DebtPostModalComponent {
  show = false;

  debtForm!: FormGroup;

  constructor(private debtService: DebtService) {
    this.debtService.debtPostModalState$.subscribe((value) => {
      this.show = value
    })

    this.debtForm = new FormGroup({})
  }

  close() {
    this.debtService.closeDebtPostModal();
  }

  submit(){

  }
}
