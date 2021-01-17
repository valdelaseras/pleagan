import { Injectable } from '@angular/core';
import { Plea, PLEA_STATUS } from '../models/plea/plea.model';
import { Company } from '../models/company/company.model';
import { Product } from '../models/product/product.model';
import { Pleagan } from '../models/pleagan/pleagan.model';
import { Observable, of } from 'rxjs';
// import {IPlea} from 'pleagan-model';

const mockPleagan = new Pleagan(
  '1',
  'DolphinOnWheels',
  'cetaceanrave@sea.com',
  'I loved this product so much and used to buy it a lot. Giving it up after going vegan has ' +
    'been hard but it needed to be done. I would be so happy if you could create a vegan ' +
    'version of this!',
  'Wellington',
);

export class PleaService extends Injectable {
  pleas: Plea[] = [
    new Plea(
      '1',
      '2021-02-01T01:00:00+12:00',
      new Company('1', 'Kapiti Icecream', new Product('1', 'Boysenberry Icecream')),
      PLEA_STATUS.UNNOTIFIED,
      mockPleagan,
      [mockPleagan],
      '/assets/images/kapiti.jpg',
    ),
    new Plea(
      '2',
      '2021-02-02T01:00:00+12:00',
      new Company('2', 'Quorn', new Product('2', 'Vegetarian Meal Meat Free Soy Free Pieces')),
      PLEA_STATUS.UNNOTIFIED,
      mockPleagan,
      [mockPleagan],
      '/assets/images/quorn.jpeg',
    ),
    new Plea(
      '3',
      '2021-02-03T01:00:00+12:00',
      new Company('3', 'Stoneleigh', new Product('3', 'Sauvignon Blanc')),
      PLEA_STATUS.UNNOTIFIED,
      mockPleagan,
      [mockPleagan],
      '/assets/images/stoneleigh.jpeg',
    ),
  ];

  getPleas(): Observable<Plea[]> {
    return of(this.pleas);
  }

  getPleaById(id: string): Observable<Plea> {
    const plea = this.pleas.find((_plea) => _plea.id === id);
    if (plea) {
      return of(plea);
    } else {
      throw new Error(`Plea with id ${id} not found.`);
    }
  }
}
