import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { interval, Observable, Subject } from 'rxjs';
import { ProductService } from '../../../../service/product/product.service';
import { CompanyService } from '../../../../service/company/company.service';
import { Plea } from '../../../../model/plea';
import { PleaService } from '../../../../service/plea/plea.service';
import { debounce, switchMap, tap } from 'rxjs/operators';
import { SWIPE_IN_BELOW_SWIPE_OUT_TOP } from '../../../../animations';

@Component({
  selector: 'app-new-plea',
  templateUrl: './new-plea.component.html',
  styleUrls: ['./new-plea.component.scss'],
  animations: [SWIPE_IN_BELOW_SWIPE_OUT_TOP],
})
export class NewPleaComponent {
  querySource$: Subject<string> = new Subject<string>();
  similarPleas$: Observable<Plea[]>;
  similarPleas: Plea[];
  pleaInSuggestions: boolean;
  displayModal = false;
  addedIngredients: string[] = [];
  newPleaForm = new FormGroup({
    pleaganName: new FormControl('', Validators.required),
    pleaganLocation: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
    product: new FormControl('', Validators.required),
    companyContact: new FormControl('', Validators.required),
    pleaMsg: new FormControl('', Validators.required),
    productImage: new FormControl('', [Validators.required]),
    ingredient: new FormControl(),
  });
  loading: boolean = true;

  constructor(
    private productService: ProductService,
    private companyService: CompanyService,
    private pleaService: PleaService,
  ) {
    this.similarPleas$ = this.querySource$.pipe(
      debounce(() => interval(500)),
      tap((_) => (this.loading = true)),
      switchMap(this.pleaService.searchPleas),
      tap(console.log),
      tap((_) => (this.loading = false)),
    );

    this.similarPleas$.subscribe((pleas: Plea[]) => {
      this.similarPleas = pleas;
    });
  }

  submit(): void {
    this.displayModal = true;
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

    console.log(companyName && productName);

    if (companyName && productName) {
      this.querySource$.next(this.getSearchQuery());
    }
  }

  private getSearchQuery(): string {
    const companyName = this.newPleaForm.get('company')!.value;
    const productName = this.newPleaForm.get('product')!.value;

    return `${companyName} ${productName}`;
  }
}
