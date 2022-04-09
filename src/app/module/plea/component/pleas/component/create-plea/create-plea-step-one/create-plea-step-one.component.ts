import { Component } from '@angular/core';
import { AbstractWizardStepDirective } from '@shared/component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PleaService } from '@core/service';
import { debounce, filter, map, shareReplay, tap } from 'rxjs/operators';
import { WizardService } from '@shared/component/wizard/service/wizard.service';
import { interval } from 'rxjs';
import { mapPleaToListItem } from '../../../pleas.data-source';

@Component({
  selector: 'app-create-plea-step-one',
  templateUrl: './create-plea-step-one.component.html',
  styleUrls: [
    './create-plea-step-one.component.scss'
  ]
})
export class CreatePleaStepOneComponent extends AbstractWizardStepDirective {
  constructor(
    private pleaService: PleaService,
    protected wizardService: WizardService
  ) {
    super( wizardService );
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      companyName: new FormControl('', Validators.required),
      productName: new FormControl('', Validators.required),
    });

    this.form.valueChanges.pipe(
      debounce( () => interval( 500 )),
      map( ( { companyName, productName } ) => {
        if ( this.form.valid ) {

          // Request a list of pleas that might be for the same product
          const similarPleas = this.pleaService.get({
            companyName,
            productName
          }).pipe(
            shareReplay( 1 ),
            tap( () => this.step.isComplete = true )
          );

          // Display the second step if similar pleas have been found. This allows the user to either support an
          // existing plea that matches the one they intended to create, or to ignore them and create one regardless (if
          // the similar pleas are false positives)
          similarPleas.pipe(
            filter( ( pleas ) => pleas.length > 0  ),
            map( pleas => pleas.map( mapPleaToListItem ) ),
            tap( ( pleas ) => this.wizardService.setStepData( 2, { pleas } )),
            tap( () => this.wizardService.shouldDisplayStep( 2, true )),
          ).subscribe();

          // Prevent the second step from displaying if no similar pleas were found
          similarPleas.pipe(
            filter( ( pleas ) => pleas.length === 0  ),
            tap( () => this.wizardService.shouldDisplayStep( 2, false )),
          ).subscribe();
        } else {
          this.step.isComplete = false;
        }
      })
    ).subscribe();

    super.ngOnInit();
  }
}
