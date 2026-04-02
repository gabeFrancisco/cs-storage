import { Component } from '@angular/core';

@Component({
  selector: 'app-estimates',
  standalone: false,
  templateUrl: './estimates.component.html',
  styleUrl: './estimates.component.css'
})
export class EstimatesComponent {
  isModalOpen = false;

  openModal() { this.isModalOpen = true; }
  closeModal() { this.isModalOpen = false; }
}
