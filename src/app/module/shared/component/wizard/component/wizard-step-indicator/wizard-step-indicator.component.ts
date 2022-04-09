import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WizardService, WizardStep } from '../../service/wizard.service';

@Component({
  selector: 'app-wizard-step-indicator',
  templateUrl: './wizard-step-indicator.component.html',
  styleUrls: [
    './wizard-step-indicator.component.scss'
  ]
})
export class WizardStepIndicatorComponent implements OnInit {
  steps: Observable<WizardStep[]>;
  currentStep: Observable<WizardStep>;

  constructor ( private wizardService: WizardService ) {}

  ngOnInit(): void {
    this.steps = this.wizardService.getSteps();
    this.currentStep = this.wizardService.getCurrentStep();
  }

  setStepIndex( index: number ): void {
    this.wizardService.setCurrentStepIndex( index );
  }
}
