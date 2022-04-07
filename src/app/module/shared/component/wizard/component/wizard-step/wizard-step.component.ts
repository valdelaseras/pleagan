import { Component } from '@angular/core';

export interface WizardStep {
  index: number;
  isComplete: boolean;
}

@Component({
  selector: 'app-wizard-step',
  templateUrl: './wizard-step.html',
  styleUrls: [
    './wizard-step.component.scss'
  ]
})
export class WizardStepComponent {

}
