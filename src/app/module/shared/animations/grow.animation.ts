import { animate, style, transition, trigger } from '@angular/animations';

const GROW_IN_SHRINK_OUT_SINGLE =
  trigger('growInShrinkOutSingle', [
    transition(':enter', [style({ height: 0 }), animate('.3s ease-out', style({ height: 'auto' }))]),
    transition(':leave', [style({ height: 'auto' }), animate('.3s ease-in', style({ height: 0 }))]),
  ]);

const GROW_IN_SHRINK_OUT_SINGLE_FLEX =
  trigger('growInShrinkOutSingle', [
    transition(':enter', [style({ flex: 0 }), animate('.3s ease-out', style({ flex: 1 }))]),
    transition(':leave', [style({ flex: 1 }), animate('.3s ease-in', style({ flex: 0 }))]),
  ]);

export {
  GROW_IN_SHRINK_OUT_SINGLE,
  GROW_IN_SHRINK_OUT_SINGLE_FLEX,
};
