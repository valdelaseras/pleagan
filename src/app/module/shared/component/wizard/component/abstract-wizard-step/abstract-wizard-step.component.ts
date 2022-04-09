import { Directive, Input, OnInit } from '@angular/core';
import { WizardService, WizardStep } from '../../service/wizard.service';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Directive({
  selector: '[step]'
})
export class AbstractWizardStepComponent implements OnInit {
  @Input() step: WizardStep;
  form: FormGroup;

  constructor( protected wizardService: WizardService ) {}

  ngOnInit(): void {
    // Update the step's formValues whenever an input is updated
    if ( this.form ) {
      this.form.valueChanges.pipe(
        tap( ( formValues ) => {
          this.step.formValues = formValues;
        })
      ).subscribe();

      // Update the form with the values entered earlier (when the user navigated back through the wizard)
      if ( this.step.formValues ) {
        this.form.patchValue( this.step.formValues );
      }
    }
  }
}
