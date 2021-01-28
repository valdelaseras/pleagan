import { animate, style, transition, trigger } from '@angular/animations';

const SWIPE_IN_BELOW_SWIPE_OUT_TOP = trigger(
  'swipeInBelowSwipeOutTop',
  [
    transition(
      ':enter',
      [
        style({ transform: 'translateY(100%)' }),
        animate('.3s ease-out',
          style({ transform: 'translateY(0)' }))
      ]
    ),
    transition(
      ':leave',
      [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('.3s ease-in',
          style({ transform: 'translateY(-100%)', opacity: 0 }))
      ]
    )
  ]
);

export {SWIPE_IN_BELOW_SWIPE_OUT_TOP};
