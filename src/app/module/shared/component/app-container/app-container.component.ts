import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet} from '@angular/router';
import { ROUTING_ANIMATIONS } from '../../animations';

@Component({
  selector: 'app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.scss'],
  animations: [
    ROUTING_ANIMATIONS,
  ]
})
export class AppContainerComponent implements OnInit {
  // showInitiateButton = true;

  constructor( private router: Router ) {
    // router.events.subscribe((event: any) => {
    //   this.showInitiateButton = event.url && !event.url.includes( 'plea/initiate' );
    // });
  }

  ngOnInit(): void {
  }

  prepareRoute( outlet: RouterOutlet ): boolean {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

}
