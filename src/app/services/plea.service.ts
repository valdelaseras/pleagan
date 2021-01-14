import { Injectable } from '@angular/core';
import { Plea, PLEA_STATUS } from '../models/plea/plea.model';
import { Company } from '../models/company/company.model';
import { Product } from '../models/product/product.model';
import { Pleagan } from '../models/pleagan/pleagan.model';
import { Observable, of } from 'rxjs';

const mockPleagan = new Pleagan(
  '1',
  'DolphinOnWheels',
  'cetaceanrave@sea.com',
  'I loved this icecream so much and used to eat it a lot. Giving it up after going vegan has ' +
    'been hard but it needed to be done. Kapiti, I would be so happy if you could create a vegan ' +
    'version of this delicious icecream!',
  'Somewhere over the rainbow',
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
      new Company('1', 'Kapiti Icecream', new Product('1', 'Boysenberry Icecream')),
      PLEA_STATUS.UNNOTIFIED,
      mockPleagan,
      [mockPleagan],
      '/assets/images/kapiti.jpg',
    ),
    new Plea(
      '3',
      '2021-02-03T01:00:00+12:00',
      new Company('1', 'Kapiti Icecream', new Product('1', 'Boysenberry Icecream')),
      PLEA_STATUS.UNNOTIFIED,
      mockPleagan,
      [mockPleagan],
      '/assets/images/kapiti.jpg',
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
