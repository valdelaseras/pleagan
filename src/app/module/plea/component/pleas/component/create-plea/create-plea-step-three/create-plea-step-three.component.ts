import { Component } from '@angular/core';
import { AbstractWizardStepDirective } from '@shared/component';
import { WizardService } from '@shared/component/wizard/service/wizard.service';
import { PleaListItem } from '../../all-pleas-container/all-pleas.data-source';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take, tap, withLatestFrom } from 'rxjs/operators';
import { PLEA_STATUS } from '@shared/model';

@Component({
  selector: 'app-create-plea-step-three',
  templateUrl: './create-plea-step-three.component.html',
  styleUrls: [
    './create-plea-step-three.component.scss'
  ]
})
export class CreatePleaStepThreeComponent extends AbstractWizardStepDirective {
  imageFile: File;
  plea: PleaListItem = {
    productName: '',
    companyName: '',
    userHasSupported: false,
    numberOfSupports: 1,
    status: PLEA_STATUS.UNNOTIFIED,
    createdAt: new Date(),
    productImage: '/assets/images/placeholder-food.jpg'
  };

  constructor(
    protected wizardService: WizardService,
  ) {
    super( wizardService );
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      description: new FormControl('', [ Validators.required, Validators.maxLength( 750 ) ]),
      productImage: new FormControl(null, [Validators.required]),
      companyContact: new FormControl(''),
    });

    this.wizardService.getSteps().pipe(
      take( 1 ),
      tap( ( steps ) => {
        const { companyName, productName } = steps[ 0 ].formValues;
        this.plea = {
          ...this.plea,
          companyName,
          productName,
        };
      })
    ).subscribe();

    this.form.valueChanges.pipe(
      withLatestFrom( this.wizardService.getSteps() ),
      tap( ( [ { description, productImage }, steps ] ) => {
        const { companyName, productName } = steps[ 0 ].formValues;
        this.plea = {
          ...this.plea,
          companyName,
          productName,
        };

        if ( productImage ) {
          const reader = new FileReader();
          reader.readAsDataURL( productImage );
          reader.onload = () => {
            this.plea.productImage = reader.result!.toString();
          };
        }
      }),
      tap( () => this.step.isComplete = this.form.valid )
    ).subscribe();

    super.ngOnInit();
  }
}
