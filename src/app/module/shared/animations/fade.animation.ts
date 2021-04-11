import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

const FADE_IN_OUT_SINGLE =
  trigger('fadeInOutSingle', [
    transition(':enter', [style({ opacity: 0 }), animate('.3s ease-out', style({ opacity: 1 }))]),
    transition(':leave', [style({ opacity: 1 }), animate('.3s ease-in', style({ opacity: 0 }))]),
  ]);

const FADE_IN_OUT_SHRINK_SINGLE =
  trigger('fadeInOutShrinkSingle', [
    transition(':enter', [style({ opacity: 0, height: 0 }), animate('.3s ease-out', style({ opacity: 1, height: 'auto' }))]),
    transition(':leave', [style({ opacity: 1, height: 'auto' }), animate('.3s ease-in', style({ opacity: 0, height: 0 }))]),
  ]);

const FADE_IN_SINGLE =
  trigger('fadeInSingle', [
    transition(':enter', [style({ opacity: 0 }), animate('.3s ease-out', style({ opacity: 1 }))]),
  ]);

const FADE_IN_SINGLE_DELAYED =
  trigger('fadeInSingleDelayed', [
    transition(':enter', [style({ opacity: 0 }), animate('.3s 2s ease-out', style({ opacity: 1 }))]),
  ]);

const FADE_IN_OUT_LIST =
  trigger('fadeInOutList', [
    transition('* => *', [
      query(':enter', [style({ opacity: 0 }), stagger(150, [animate('.3s', style({ opacity: 1 }))])], {
        optional: true,
      }),
    ]),
    transition('* => *', [
      query(':leave', [style({ opacity: 1 }), stagger(150, [animate('.3s', style({ opacity: 0 }))])], {
        optional: true,
      }),
    ]),
  ]);

const FADE_IN_LIST =
  trigger('fadeInList', [
    transition('* => *', [
      query(':enter', [style({ opacity: 0 }), stagger(150, [animate('.3s', style({ opacity: 1 }))])], {
        optional: true,
      }),
    ]),
  ]);

export {
  FADE_IN_LIST,
  FADE_IN_OUT_LIST,
  FADE_IN_OUT_SINGLE,
  FADE_IN_SINGLE,
  FADE_IN_OUT_SHRINK_SINGLE,
  FADE_IN_SINGLE_DELAYED
};
