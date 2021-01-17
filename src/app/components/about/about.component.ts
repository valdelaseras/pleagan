import { Component, OnInit, AfterViewInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  section: string | null = null;
  constructor( private route: ActivatedRoute ) {
    this.route.queryParamMap.subscribe(
      ( params: ParamMap ) => {
        this.section = params.get( 'section' );
      }
    );
  }
  scrollTo(id: string): void {
      setTimeout(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
      }, 150);
  }
}
