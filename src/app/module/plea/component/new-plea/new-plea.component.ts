import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { interval, Observable, Subject } from 'rxjs';
import { debounce, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { FADE_IN_OUT_LIST, SWIPE_IN_BELOW_SWIPE_OUT_TOP } from '../../../shared/animations';
import { Router } from '@angular/router';
import { CompanyService, FirebaseStorageService, PleaService, ProductService } from '@core/service';
import { HTTP_LOADING_STATUS } from '@shared/model/http-loading-wrapper/http-loading-wrapper.model';
import { CreateCompanyDto, CreatePleaDto, CreateProductDto, GetPleaDto } from '@shared/model';

@Component({
  selector: 'app-new-plea',
  templateUrl: './new-plea.component.html',
  styleUrls: ['./new-plea.component.scss'],
  animations: [SWIPE_IN_BELOW_SWIPE_OUT_TOP, FADE_IN_OUT_LIST],
})
export class NewPleaComponent {
  querySource$: Subject<string> = new Subject<string>();
  similarPleas$: Observable<GetPleaDto[]>;
  pleaInSuggestions: boolean;
  newPleaForm = new FormGroup({
    company: new FormControl('', Validators.required),
    product: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    companyContact: new FormControl(''),
    productImage: new FormControl(null, [Validators.required]),
  });
  existingPleaCheckStatus: HTTP_LOADING_STATUS;
  savingPleaStatus: HTTP_LOADING_STATUS;
  submitted: boolean = false;
  imagePreview: string;
  imageFile: File;

  constructor(
    private productService: ProductService,
    private companyService: CompanyService,
    private pleaService: PleaService,
    private router: Router,
    private firebaseStorageService: FirebaseStorageService,
    private cd: ChangeDetectorRef,
  ) {
    this.similarPleas$ = this.querySource$.pipe(
      tap( () => this.existingPleaCheckStatus = HTTP_LOADING_STATUS.LOADING),
      debounce(() => interval(1000)),
      switchMap(this.pleaService.searchPleas),
      tap( () => this.existingPleaCheckStatus = HTTP_LOADING_STATUS.FINISHED),
    );
  }

  submit( form: FormGroup ): void {
    this.savingPleaStatus = HTTP_LOADING_STATUS.LOADING;
    this.submitted = true;

    this.firebaseStorageService
      .uploadFile( this.imageFile )
      .pipe(
        mergeMap(( imageUrl: string ) => {
          const product = new CreateProductDto( form.value.product, imageUrl );
          const company = new CreateCompanyDto( form.value.company );
          const plea = new CreatePleaDto( product, company, form.value.description );

          return this.pleaService.createPlea(plea);
        }),
        map(({ id }: { id: number }) => {
          this.router.navigate( ['/', 'plea', id, 'details'] )
        }),
      )
      .subscribe( { error: () => {
          this.submitted = false;
          this.savingPleaStatus = HTTP_LOADING_STATUS.FINISHED;
      }});
  }

  searchSimilarPleas(): void {
    const companyName = this.newPleaForm.get('company')?.value;
    const productName = this.newPleaForm.get('product')?.value;

    if (companyName && productName) {
      this.querySource$.next(this.getSearchQuery());
    }
  }

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

  private getSearchQuery(): string {
    const companyName = this.newPleaForm.get('company')!.value;
    const productName = this.newPleaForm.get('product')!.value;

    return `${companyName} ${productName}`;
  }
}
