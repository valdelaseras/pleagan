import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';

@Directive({ selector: '[hideOnRoutes]' })
export class HideOnRoutesDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private router: Router,
  ) {}

  routes: string[];

  @Input() set hideOnRoutes( routes: string[] ) {
    this.routes = routes;
  }

  ngOnInit() {
    if ( this.urlInRoutes( this.router.url ) ) {
      this.viewContainer.clear();
    } else {
      this.viewContainer.createEmbeddedView( this.templateRef );
    }

    this.router.events.pipe(
      filter( ( event: Event ) => event instanceof NavigationEnd ),
      map( ( event: Event ) => {
        if ( this.urlInRoutes( ( event as NavigationEnd ).url ) ) {
          this.viewContainer.clear();
        } else {
          this.viewContainer.createEmbeddedView( this.templateRef );
        }
      } ),
    ).subscribe()
  }

  private urlInRoutes = ( url: string ) => {
    url = url.replace( /\d\/+/g, '' );
    return this.routes.filter( ( route: string ) => url === route ).length > 0;
  }
}
