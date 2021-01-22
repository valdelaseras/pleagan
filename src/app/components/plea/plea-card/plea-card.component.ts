import { Component, Input, OnInit } from '@angular/core';
import { Plea } from '../../../models/plea/plea.model';
import { Router } from '@angular/router';
import { PLEA_TARGET } from 'pleagan-model';
import { Product } from '../../../models/product/product.model';

@Component({
  selector: 'app-plea-card',
  templateUrl: './plea-card.component.html',
  styleUrls: ['./plea-card.component.scss'],
})
export class PleaCardComponent implements OnInit {
  @Input() plea!: Plea;
  product: Product;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.product = this.plea.company.products.filter((product: Product) => !product.vegan).pop()!;
  }

  getTarget(): number {
    if (this.plea.supporters.length < PLEA_TARGET.FIRST) {
      return PLEA_TARGET.FIRST;
    } else if (this.plea.supporters.length >= PLEA_TARGET.FIRST && this.plea.supporters.length < PLEA_TARGET.SECOND) {
      return PLEA_TARGET.SECOND;
    } else {
      return PLEA_TARGET.THIRD;
    }
  }
}
