import { Component } from '@angular/core';
import { Plea } from '../../../../models/plea/plea.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PleaService } from '../../../../services/plea.service';

@Component({
  selector: 'app-submission-details',
  templateUrl: './plea-details.component.html',
  styleUrls: ['./plea-details.component.scss'],
})
export class PleaDetailsComponent {
  plea$: Observable<Plea>;
  constructor(private route: ActivatedRoute, private pleaService: PleaService) {
    this.plea$ = this.pleaService.getPleaById(this.route.snapshot.paramMap.get('id') || '');
  }
  scrollTo(id: string): void {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }
}
