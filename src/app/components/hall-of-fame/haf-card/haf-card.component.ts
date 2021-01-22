import { Component, Input, OnInit } from '@angular/core';
import { Plea } from '../../../models/plea/plea.model';
import { Product } from '../../../models/product/product.model';

@Component({
  selector: 'app-haf-card',
  templateUrl: './haf-card.component.html',
  styleUrls: ['./haf-card.component.scss'],
})
export class HafCardComponent implements OnInit {
  @Input() plea!: Plea;
  nonVeganProduct: Product;
  veganProduct: Product;
  constructor() {}

  ngOnInit(): void {
    this.nonVeganProduct = this.plea.company.products.filter((product: Product) => !product.vegan).pop()!;
    this.veganProduct = this.plea.company.products.filter((product: Product) => product.vegan).pop()!;
  }
}
