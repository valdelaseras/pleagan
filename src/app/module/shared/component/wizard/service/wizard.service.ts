import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { StepModel } from '../models/step.model';
import { WizardStep } from '@shared/component/wizard/component/wizard-step/wizard-step.component';
import { map } from 'rxjs/operators';

const STEPS = [
  { index: 1, isComplete: false },
  { index: 2, isComplete: false },
  { index: 3, isComplete: false }
];

@Injectable({
  providedIn: 'root'
})
export class WizardService {

  steps: BehaviorSubject<WizardStep[]> = new BehaviorSubject<WizardStep[]>(STEPS);
  currentStep: ReplaySubject<WizardStep> = new ReplaySubject<WizardStep>(1);
  moveToNextStep: Subject<void> = new Subject();

  constructor() {
    this.currentStep.next( this.steps.value[0] );
  }

  setCurrentStep(step: WizardStep): void {
    this.currentStep.next(step);
  }

  getCurrentStep(): Observable<WizardStep> {
    return this.currentStep.asObservable();
  }

  getSteps(): Observable<WizardStep[]> {
    return this.steps.asObservable();
  }

  moveToNextStep(): void {
    const index = this.currentStep.value.stepIndex;

    if (index < this.steps.value.length) {
      this.currentStep.next(this.steps.value[index]);
    }
  }

  isLastStep(): Observable<boolean> {
    return this.currentStep.pipe(
      map( ( currentStep: WizardStep ) => currentStep.index === this.steps.value.length)
    );
  }
}
