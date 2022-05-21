import { Component } from '@angular/core';
import { AbstractWizardStepDirective } from '@shared/component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PleaService } from '@core/service';
import { debounce, filter, map, shareReplay, tap, withLatestFrom } from 'rxjs/operators';
import { WizardService } from '@shared/component/wizard/service/wizard.service';
import { interval, Observable } from 'rxjs';
import { mapPleaToListItem } from '../../all-pleas-container/all-pleas.data-source';
import { GetPleaDto } from '@shared/model';
import {
  fadeInUpOnEnterAnimation,
  fadeOutDownOnLeaveAnimation
} from 'angular-animations';

@Component({
  selector: 'app-create-plea-step-one',
  templateUrl: './create-plea-step-one.component.html',
  styleUrls: [
    './create-plea-step-one.component.scss'
  ],
  animations: [
    fadeInUpOnEnterAnimation({anchor: 'enter'}),
    fadeOutDownOnLeaveAnimation({anchor: 'leave'})
  ]
})
export class CreatePleaStepOneComponent extends AbstractWizardStepDirective {
  private similarPleas: Observable<GetPleaDto[]>;
  similarPleasFound: Observable<boolean>;

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
          this.similarPleas = this.pleaService.get().pipe(
            map( ( pleas: GetPleaDto[] ) => (
              pleas.filter( ( plea: GetPleaDto ) => (
                plea.company.name.toLowerCase().indexOf( companyName.toLowerCase() ) >= 0 ||
                plea.nonVeganProduct.name.toLowerCase().indexOf( productName.toLowerCase() ) >= 0
              ))
            )),
            shareReplay( 1 ),
            tap( () => this.step.isComplete = true )
          );

          this.similarPleasFound = this.similarPleas.pipe(
            map( ( pleas ) => pleas.length > 0  )
          );

          // Display the second step if similar pleas have been found. This allows the user to either support an
          // existing plea that matches the one they intended to create, or to ignore them and create one regardless (if
          // the similar pleas are false positives)
          this.similarPleasFound.pipe(
            filter( similarPleasFound => similarPleasFound ),
            withLatestFrom( this.similarPleas ),
            map( ([, pleas]) => pleas.map( mapPleaToListItem ) ),
            tap( ( pleas ) => this.wizardService.setStepData( 2, { pleas } )),
            tap( () => this.wizardService.shouldDisplayStep( 2, true )),
          ).subscribe();

          // Prevent the second step from displaying if no similar pleas were found
          this.similarPleasFound.pipe(
            filter( similarPleasFound => !similarPleasFound ),
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
