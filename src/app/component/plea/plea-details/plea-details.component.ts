import { Component } from '@angular/core';
import { Plea } from '../../../model/plea';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PleaService } from '../../../service/plea/plea.service';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-submission-details',
  templateUrl: './plea-details.component.html',
  styleUrls: ['./plea-details.component.scss'],
})
export class PleaDetailsComponent {
  isVisible = false;
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
  showModal(): void {
    this.isVisible = true;
  }
}
