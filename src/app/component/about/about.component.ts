import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  section: string | null = null;
  imgSrc = '/assets/images/placeholder-two.png';
  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.section = params.get('section');
    });
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
