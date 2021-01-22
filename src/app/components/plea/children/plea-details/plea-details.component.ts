import { Component } from '@angular/core';
import { Plea } from '../../../../models/plea/plea.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PleaService } from '../../../../services/plea.service';
import { Product } from '../../../../models/product/product.model';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-submission-details',
  templateUrl: './plea-details.component.html',
  styleUrls: ['./plea-details.component.scss'],
})
export class PleaDetailsComponent {
  isVisible = false;
  plea$: Observable<Plea>;
  product: Product;
  constructor(private route: ActivatedRoute, private pleaService: PleaService) {
    this.plea$ = this.pleaService.getPleaById(this.route.snapshot.paramMap.get('id') || '');
    this.plea$
      .pipe(
        map((plea: Plea) => {
          this.product = plea.company.products.filter((product: Product) => !product.vegan).pop()!;
        }),
      )
      .subscribe();
  }
  scrollTo(id: string): void {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }
  showModal(): void {
    this.isVisible = true;
  }
}
