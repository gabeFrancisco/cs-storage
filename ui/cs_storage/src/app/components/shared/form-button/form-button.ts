import { Component, Input } from '@angular/core';
import { FormMode } from '../../../../models/types/FormMode';

@Component({
  selector: 'app-form-button',
  standalone: false,
  templateUrl: './form-button.html',
  styleUrl: './form-button.css',
})
export class FormButton {
  @Input() mode: FormMode | undefined = undefined
}
