import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

  constructor() { }

  ngOnInit(): void {
  }

  prepareRoute( outlet: RouterOutlet ): boolean {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

}
