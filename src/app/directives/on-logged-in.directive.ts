import {Directive, ElementRef, Input} from '@angular/core';
import {AuthService} from '../service/auth/auth.service';
import {tap} from 'rxjs/operators';

@Directive({
  selector: '[appOnLoggedIn]'
})
export class onLoggedInDirective {
  @Input() onLoggedIn: boolean;

  constructor( element: ElementRef, private authService: AuthService ) {
    this.authService.user$.pipe(
      tap( ( user: any ) => {
        if ( user ) {
          if ( !this.onLoggedIn ) {
            element.nativeElement.style.display = 'none'
          }
        } else {
          if ( this.onLoggedIn ) {
            element.nativeElement.style.display = 'none'
          }
        }
      }),
      tap( console.log )
    ).subscribe()
  }
}
