import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WizardService, WizardStep } from '../../service/wizard.service';
import {
  FADE_IN_OUT_SINGLE, GROW_IN_SHRINK_OUT_SINGLE_FLEX,
} from '@shared/animations';

@Component({
  selector: 'app-wizard-step-indicator',
  templateUrl: './wizard-step-indicator.component.html',
  styleUrls: [
    './wizard-step-indicator.component.scss'
  ],
  animations: [
    FADE_IN_OUT_SINGLE,
    GROW_IN_SHRINK_OUT_SINGLE_FLEX
  ]
})
export class WizardStepIndicatorComponent implements OnInit {
  @Input() showStepIndex = true;
  currentStep: Observable<WizardStep>;
  steps: Observable<WizardStep[]>;

  constructor ( private wizardService: WizardService ) {}

  ngOnInit(): void {
    this.steps = this.wizardService.getSteps();
    this.currentStep = this.wizardService.getCurrentStep();
  }

  setStepIndex( index: number ): void {
    this.wizardService.setCurrentStepIndex( index );
  }

  displayableSteps( steps: WizardStep[] ): WizardStep[] {
    return steps.filter( step => step.shouldDisplay );
  }
}
