import { Component, Input } from '@angular/core';
import { FormMode } from '../../../../models/types/FormMode';

@Component({
  selector: 'app-form-button',
  standalone: false,
  templateUrl: './form-button.component.html',
  styleUrl: './form-button.component.css',
})
export class FormButtonComponent {
  @Input() mode: FormMode | undefined = undefined
}
