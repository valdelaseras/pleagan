import { animate, style, transition, trigger } from '@angular/animations';

const GROW_IN_SHRINK_OUT =
  trigger('growInShrinkOut', [
    transition(':enter', [style({ height: 0 }), animate('.3s ease-out', style({ height: 'auto' }))]),
    transition(':leave', [style({ height: 'auto' }), animate('.3s ease-in', style({ height: 0 }))]),
  ]);

export {
  GROW_IN_SHRINK_OUT
};
