import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { interval, Observable, Subject } from 'rxjs';
import { ProductService } from '../../../service/product/product.service';
import { CompanyService } from '../../../service/company/company.service';
import { Plea } from '../../../model/plea';
import { PleaService } from '../../../service/plea/plea.service';
import { debounce, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { FADE_IN_OUT_LIST, FADE_IN_OUT_SINGLE, SWIPE_IN_BELOW_SWIPE_OUT_TOP } from '../../../animations';
import { Product } from '../../../model/product';
import { Company } from '../../../model/company';
import { Router } from '@angular/router';
import { FirebaseStorageService } from '../../../service/firebase-storage/firebase-storage.service';
import { v4 as uuidV4 } from 'uuid';

@Component({
  selector: 'app-new-plea',
  templateUrl: './new-plea.component.html',
  styleUrls: ['./new-plea.component.scss'],
  animations: [SWIPE_IN_BELOW_SWIPE_OUT_TOP, FADE_IN_OUT_LIST, FADE_IN_OUT_SINGLE],
})
export class NewPleaComponent {
  querySource$: Subject<string> = new Subject<string>();
  similarPleas$: Observable<Plea[]>;
  similarPleas: Plea[];
  pleaInSuggestions: boolean;
  displayModal = false;
  addedIngredients: string[] = [];
  newPleaForm = new FormGroup({
    company: new FormControl('', Validators.required),
    product: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    companyContact: new FormControl(''),
    productImage: new FormControl(null, [Validators.required]),
    ingredient: new FormControl(),
  });
  loading: boolean = true;
  imageUrl: Observable<string>;
  imagePreview: string;
  imageFile: File;

  constructor(
    private productService: ProductService,
    private companyService: CompanyService,
    private pleaService: PleaService,
    private router: Router,
    private firebaseStorageService: FirebaseStorageService,
    private cd: ChangeDetectorRef
  ) {
    this.similarPleas$ = this.querySource$.pipe(
      debounce(() => interval(500)),
      tap((_) => (this.loading = true)),
      switchMap(this.pleaService.searchPleas),
      tap((_) => (this.loading = false)),
    );

    this.similarPleas$.subscribe((pleas: Plea[]) => {
      this.similarPleas = pleas;
    });
  }

  submit(form: FormGroup): void {
    const product = new Product();
    product.name = form.value.product;

    const company = new Company();
    company.name = form.value.company;

    const plea = new Plea();
    plea.description = form.value.description;
    plea.company = company;
    plea.nonVeganProduct = product;

    this.firebaseStorageService.uploadFile( this.imageFile ).pipe(
      switchMap( ( imageUrl: string ) => {
        product.imageUrl = imageUrl;

        return this.pleaService.createPlea(plea);
      }),
      map( ({ id }: { id: number }) => {
        this.displayModal = true;
        setTimeout(() => {
          this.router.navigate(['/', 'plea', id, 'details']);
        }, 3000);
      } )
    ).subscribe();
  }

  createTag(event: KeyboardEvent): void {
    if (event.code === 'Comma') {
      this.addedIngredients.push(this.newPleaForm.value.ingredient.replace(',', ''));
      this.newPleaForm.controls['ingredient'].setValue('');
    }
  }

  removeTag(index: number): void {
    this.addedIngredients.splice(index, 1);
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

    if(files && files.length) {
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
