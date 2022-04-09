import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  FADE_IN_OUT_LIST,
  SWIPE_IN_BELOW_SWIPE_OUT_TOP,
  FADE_IN_OUT_SINGLE,
} from '@shared/animations';
import { Router } from '@angular/router';
import { CompanyService, FirebaseStorageService, PleaService, ProductService } from '@core/service';
import { WizardService, WizardStep } from '@shared/component/wizard/service/wizard.service';
import { CreatePleaStepOneComponent } from './create-plea-step-one/create-plea-step-one.component';
import { CreatePleaStepTwoComponent } from './create-plea-step-two/create-plea-step-two.component';

@Component({
  selector: 'app-create-plea',
  templateUrl: './create-plea.component.html',
  styleUrls: ['./create-plea.component.scss'],
  animations: [
    SWIPE_IN_BELOW_SWIPE_OUT_TOP,
    FADE_IN_OUT_LIST,
    FADE_IN_OUT_SINGLE,
  ],
})
export class CreatePleaComponent implements OnInit, AfterViewInit {
  steps: WizardStep[];

  form: FormGroup;
  imagePreview: string;
  imageFile: File;

  currentStep: Observable<WizardStep>;

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
    this.initForm();
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
        component: CreatePleaStepOneComponent,
        shouldDisplay: true
      }
    ];
  }

  private initForm(): void {
    // this.form = new FormGroup({
    //   companyName: new FormControl('', Validators.required),
    //   productName: new FormControl('', Validators.required),
    //   description: new FormControl('', Validators.required),
    //   companyContact: new FormControl(''),
    //   productImage: new FormControl(null, [Validators.required]),
    // });

    // this.similarPleas = combineLatest([
    //   this.form.get( 'companyName' )!.valueChanges,
    //   this.form.get( 'productName' )!.valueChanges
    // ]).pipe(
    //   debounce(() => interval(1000)),
    //   switchMap( ([ companyName, productName ]) => this.pleaService.get({ companyName, productName })),
    //   map( ( pleas: GetPleaDto[] ) => (
    //     pleas.map( mapPleaToListItem )
    //   ))
    // );
  }

  submit(): void {
    const results: { [key: string]: string | number } = {};
    this.steps.forEach( step => {
      for ( const key of Object.keys( step.formValues ) ) {
        results[ key as string ] = step.formValues[ key ];
      }
    });

    console.log(results);
    // this.savingPleaStatus = HTTP_LOADING_STATUS.LOADING;
    // this.submitted = true;
    //
    // this.firebaseStorageService
    //   .uploadFile( this.imageFile )
    //   .pipe(
    //     mergeMap(( imageUrl: string ) => {
    //       const product = new CreateProductDto( form.value.product, imageUrl );
    //       const company = new CreateCompanyDto( form.value.company );
    //       const plea = new CreatePleaDto( product, company, form.value.description );
    //
    //       return this.pleaService.create(plea);
    //     }),
    //     // map(({ id }: { id: number }) => {
    //     //   this.router.navigate( ['/', 'plea', id, 'details'] );
    //     // }),
    //   )
    //   .subscribe( { error: () => {
    //       this.submitted = false;
    //       this.savingPleaStatus = HTTP_LOADING_STATUS.FINISHED;
    //   }});
  }

  // searchSimilarPleas(): void {
  //   const companyName = this.form.get('company')?.value;
  //   const productName = this.form.get('product')?.value;
  //
  //   if (companyName && productName) {
  //     this.querySource$.next(this.getSearchQuery());
  //   }
  // }

  onFileChange( files: File[] ): void {
    const reader = new FileReader();

    if (files && files.length) {
      const [file] = files;
      this.imageFile = file;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imagePreview = reader.result!.toString();

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  // private getSearchQuery(): string {
  //   const companyName = this.form.get('company')!.value;
  //   const productName = this.form.get('product')!.value;
  //
  //   return `${companyName} ${productName}`;
  // }
}
