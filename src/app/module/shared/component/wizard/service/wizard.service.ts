import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { AbstractWizardStepComponent } from '@shared/component';

export interface WizardStep {
  index: number;
  isComplete: boolean;
  component: Type<AbstractWizardStepComponent>;
  shouldDisplay: boolean;
  formValues?: any;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class WizardService {

  // Subjects to control the currently displayed step
  moveToNextStep: Subject<void> = new Subject();
  moveToPreviousStep: Subject<void> = new Subject();

  // Observables that can be subscribed to to update the wizard template accordingly
  isLastStep: Observable<boolean>;
  isFirstStep: Observable<boolean>;

  // Wizard state subjects
  private steps: BehaviorSubject<WizardStep[]>;     // List of all available steps
  private currentStep: BehaviorSubject<WizardStep>; // The currently displayed step
  private subscriptions: Subscription[] = [];       // Used to unsubscribe from streams when the wizard is reset

  /**
   * Set the list of available steps and subsequently initialise the observable streams
   *
   * @param steps A list of steps to be used with the wizard
   */
  setSteps( steps: WizardStep[] ) {
    this.steps = new BehaviorSubject<WizardStep[]>( steps );
    this.currentStep = new BehaviorSubject<WizardStep>( steps[0] );

    this.init();
  }

  /**
   * Initialise all observable streams
   *
   * @private
   */
  private init(): void {
    /*
     * Emits boolean value indicating whether the current step is the
     */
    this.isLastStep = this.currentStep.pipe(
      withLatestFrom( this.steps ),
      map( ( [ currentStep, steps] ) => {
        if ( currentStep.index === steps.length ) {
          // The current step is the last step in the list of steps
          return true;
        }

        // The current step is not the last step in the list of steps, but it may still be the last step in the list
        // that should be displayed
        return this.lastDisplayableStep( steps ).index === currentStep.index;
      })
    );

    this.isFirstStep = this.currentStep.pipe(
      map( ( currentStep: WizardStep ) => currentStep.index === 1 )
    );

    this.subscriptions.push(
      this.moveToNextStep.pipe(
        withLatestFrom( this.isLastStep, this.currentStep, this.steps ),
        filter( ( [, isLastStep ] ) => !isLastStep ),
        tap( ( [ ,, currentStep, steps ] ) => {
          const nextStep = this.nextDisplayableStep( currentStep, steps );
          if ( nextStep ) {
            this.currentStep.next( nextStep );
          }
        } )
      ).subscribe(),
      this.moveToPreviousStep.pipe(
        withLatestFrom( this.isFirstStep, this.currentStep, this.steps ),
        filter( ( [, isFirstStep ] ) => !isFirstStep ),
        tap( ( [ ,, currentStep, steps ] ) => {
          const previousStep = this.previousDisplayableStep( currentStep, steps );
          if ( previousStep ) {
            this.currentStep.next( previousStep );
          }
        } )
      ).subscribe()
    )
  }

  /**
   * Set the currently displayed step by passing its index
   *
   * @param index
   */
  setCurrentStepIndex( index: number ): void {
    this.currentStep.next( this.steps.value.find( step => step.index === index )! );
  }

  /**
   * Get an observable stream containing the currently displayed step
   */
  getCurrentStep(): Observable<WizardStep> {
    return this.currentStep.asObservable();
  }

  /**
   * Get a list of all available steps
   */
  getSteps(): Observable<WizardStep[]> {
    return this.steps.asObservable();
  }

  /**
   * Set the optional WizardStep.data property
   *
   * @param index Index of the step to append the data to
   * @param data An object containing the data to be set
   */
  setStepData( index: number, data: any ): void {
    this.steps.value.find( step => step.index === index )!.data = data;
  }

  /**
   * Update a step's shouldDisplay property.
   * Steps where this value is set to false will not be shown, but skipped over
   *
   * @param index Index of the step to update
   * @param shouldDisplay Whether or not the step should be displayed
   */
  shouldDisplayStep( index: number, shouldDisplay: boolean ): void {
    this.steps.value.find( step => step.index === index )!.shouldDisplay = shouldDisplay;
  }

  /**
   * Clears available steps and resets the state
   */
  reset(): void {
    this.steps.complete();
    this.currentStep.complete();

    // Unsubscribe from all subscriptions
    this.subscriptions.forEach( subscription => subscription.unsubscribe() );
    this.subscriptions = [];
  }

  /**
   * Returns the next possible step to display or undefined if there is none
   *
   * @param currentStep The currently displayed step
   * @param steps List of all steps
   * @private
   */
  private nextDisplayableStep( currentStep: WizardStep, steps: WizardStep[] ): WizardStep | undefined {
    // console.log('steps', steps);
    // console.log('currentStep', currentStep);
    return steps
      // Filter out all steps that should not be displayed or are of a lower index
      .filter( step => step.shouldDisplay && step.index > currentStep.index )
      // Return the first result
      .shift();
  }

  /**
   * Returns the previous possible step to display or undefined if there is none
   *
   * @param currentStep The currently displayed step
   * @param steps List of all steps
   * @private
   */
  private previousDisplayableStep( currentStep: WizardStep, steps: WizardStep[] ): WizardStep | undefined {
    return steps
      // Filter out all steps that should not be displayed or are of a higher index
      .filter( ( step: WizardStep ) => step.shouldDisplay && step.index < currentStep.index )
      // Return the last result
      .pop();
  }

  /**
   * Returns the last displayable step from the list of steps
   *
   * @param steps List of all steps
   * @private
   */
  private lastDisplayableStep( steps: WizardStep[] ): WizardStep {
    return steps.reduce( ( previousValue, step ) => {
      previousValue = step.shouldDisplay ? step : previousValue;
      return previousValue;
    }, { index: 0 } as WizardStep )
  }
}
