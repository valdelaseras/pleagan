import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';

const menuRoutes = [
  'newPlea',
  'initiatedPleas',
  'supportedPleas',
  'allPleas',
  'statistics',
  'compliedPleas',
  'home',
  'news',
  'about',
  'contact',
  'faq',
  'login',
  'signUp',
  'settings'
];

const otherRoutes = [
  'compliedPleaDetails',
  'pleaDetails',
];

const generateTransitions = ( routeSet: string[], otherRouteSet: string[] ): string => {
  let transitions = '';

  routeSet.forEach( ( route: string, i: number ) => {
    otherRouteSet.forEach( ( otherRoute: string, j: number ) => {
      if ( j ) {
        transitions += ', ';
      }

      transitions += `${otherRoute} => ${route}`;
    });

    routeSet.forEach( ( otherRoute: string ) => {
      if ( route !== otherRoute ) {
        transitions += `, ${otherRoute} => ${route}`;
      }
    });

    if ( i !== routeSet.length - 1 ) {
      transitions += ', ';
    }
  });

  return transitions;
};

const transitionsForOtherRoutes = generateTransitions( otherRoutes, menuRoutes );
const transitionsForMenuRoutes = generateTransitions( menuRoutes, otherRoutes );

export const ROUTING_ANIMATIONS =
  trigger('routingAnimations', [
    transition( transitionsForOtherRoutes, [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [style({ right: '-100%', opacity: 0 })]),
      query( ':leave', animateChild() ),
      group([
        query(':leave', [animate('.3s ease-out', style({ right: '100%', opacity: 0 }))]),
        query(':enter', [animate('.3s ease-out', style({ right: '0%', opacity: 1 }))])
      ]),
      query(':enter', animateChild())
    ]),

    transition( transitionsForMenuRoutes, [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [style({ left: '-100%', opacity: 0 })]),
      query( ':leave', animateChild() ),
      group([
        query(':leave', [animate('.3s ease-out', style({ left: '100%', opacity: 0 }))]),
        query(':enter', [animate('.3s ease-out', style({ left: '0%', opacity: 1 }))])
      ]),
      query(':enter', animateChild())
    ])
  ]);
