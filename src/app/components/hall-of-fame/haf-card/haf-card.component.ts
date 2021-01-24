import { Component, Input, OnInit } from '@angular/core';
import { Plea } from '../../../models/plea/plea.model';
import { Product } from '../../../models/product/product.model';

// TODO:
// cards broken, fix and then fix styles as well
// add image to card
// add company tag like plea card
// or actually just use the same card maybe ;)
// add some lovable fun stuff like a ribbon or crown or hearts over company name tag

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
