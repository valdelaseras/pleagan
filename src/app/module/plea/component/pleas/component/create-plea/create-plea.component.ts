import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, interval, Observable, Subject } from 'rxjs';
import { debounce, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { FADE_IN_OUT_LIST, SWIPE_IN_BELOW_SWIPE_OUT_TOP } from '@shared/animations';
import { Router } from '@angular/router';
import { CompanyService, FirebaseStorageService, PleaService, ProductService } from '@core/service';
import { HTTP_LOADING_STATUS } from '@shared/model/http-loading-wrapper/http-loading-wrapper.model';
import {CreateCompanyDto, CreatePleaDto, CreateProductDto, GetPleaDto} from '@shared/model';
import { mapPleaToListItem, PleaListItem } from '../pleas-container/pleas.data-source';

@Component({
  selector: 'app-create-plea',
  templateUrl: './create-plea.component.html',
  styleUrls: ['./create-plea.component.scss'],
  animations: [SWIPE_IN_BELOW_SWIPE_OUT_TOP, FADE_IN_OUT_LIST],
})
export class CreatePleaComponent implements OnInit {
  similarPleas: Observable<PleaListItem[]>;

  form: FormGroup;
  existingPleaCheckStatus: HTTP_LOADING_STATUS;
  savingPleaStatus: HTTP_LOADING_STATUS;
  submitted = false;
  imagePreview: string;
  imageFile: File;

  constructor(
    private productService: ProductService,
    private companyService: CompanyService,
    private router: Router,
    private firebaseStorageService: FirebaseStorageService,
    private cd: ChangeDetectorRef,

    private pleaService: PleaService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = new FormGroup({
      companyName: new FormControl('', Validators.required),
      productName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      companyContact: new FormControl(''),
      productImage: new FormControl(null, [Validators.required]),
    });

    this.similarPleas = combineLatest([
      this.form.get( 'companyName' )!.valueChanges,
      this.form.get( 'productName' )!.valueChanges
    ]).pipe(
      debounce(() => interval(1000)),
      switchMap( ([ companyName, productName ]) => this.pleaService.get({ companyName, productName })),
      map( ( pleas: GetPleaDto[] ) => (
        pleas.map( mapPleaToListItem )
      ))
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

          return this.pleaService.create(plea);
        }),
        // map(({ id }: { id: number }) => {
        //   this.router.navigate( ['/', 'plea', id, 'details'] );
        // }),
      )
      .subscribe( { error: () => {
          this.submitted = false;
          this.savingPleaStatus = HTTP_LOADING_STATUS.FINISHED;
      }});
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
