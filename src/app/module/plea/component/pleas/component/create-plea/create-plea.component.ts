import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CompanyService, FirebaseStorageService, PleaService, ProductService } from '@core/service';
import { WizardService, WizardStep } from '@shared/component/wizard/service/wizard.service';
import { CreatePleaStepOneComponent } from './create-plea-step-one/create-plea-step-one.component';
import { CreatePleaStepTwoComponent } from './create-plea-step-two/create-plea-step-two.component';
import { CreatePleaStepThreeComponent } from './create-plea-step-three/create-plea-step-three.component';
import { map, mergeMap, tap } from 'rxjs/operators';
import { CreateCompanyDto, CreatePleaDto, CreateProductDto } from '@shared/model';

interface CreatePleaFormValues {
  productName: string;
  companyName: string;
  description: string;
  productImage: File;
}

@Component({
  selector: 'app-create-plea',
  templateUrl: './create-plea.component.html',
  styleUrls: ['./create-plea.component.scss'],
})
export class CreatePleaComponent implements OnInit, AfterViewInit {
  steps: WizardStep[];

  form: FormGroup;
  imagePreview: string;
  imageFile: File;

  currentStep: Observable<WizardStep>;

  submitting: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( false );

  constructor(
    private productService: ProductService,
    private companyService: CompanyService,
    private router: Router,
    private firebaseStorageService: FirebaseStorageService,
    private cd: ChangeDetectorRef,

    private pleaService: PleaService,
    private wizardService: WizardService,
  ) {}

  ngOnInit(): void {
    this.initWizard();
  }

  ngAfterViewInit(): void {
    this.currentStep = this.wizardService.getCurrentStep();
  }

  private initWizard(): void {
    this.steps = [
      {
        index: 1,
        isComplete: false,
        component: CreatePleaStepOneComponent,
        shouldDisplay: true,
      },
      {
        index: 2,
        isComplete: false,
        component: CreatePleaStepTwoComponent,
        shouldDisplay: false,
      },
      {
        index: 3,
        isComplete: false,
        component: CreatePleaStepThreeComponent,
        shouldDisplay: true
      }
    ];
  }

  submit(): void {
    this.submitting.next( true );
    const results: CreatePleaFormValues = {} as CreatePleaFormValues;
    this.steps.forEach( step => {
      if ( step.formValues ) {
        for ( const key of Object.keys( step.formValues ) ) {
          results[ key as keyof CreatePleaFormValues] = step.formValues[ key ];
        }
      }
    });

    this.firebaseStorageService
      .uploadFile( results.productImage )
      .pipe(
        mergeMap(( imageUrl: string ) => {
          const product = new CreateProductDto( results.productName, imageUrl );
          const company = new CreateCompanyDto( results.companyName );
          const plea = new CreatePleaDto( product, company, results.description );

          return this.pleaService.create(plea);
        }),
        tap(() => this.submitting.next( false ) ),
        map(({ id }: { id: number }) => {
          this.router.navigate( ['/', 'plea', id, 'details'] );
        }),
      ).subscribe();
  }
}
