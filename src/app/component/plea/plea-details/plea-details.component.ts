import { Component } from '@angular/core';
import { Plea } from '../../../model/plea';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PleaService } from '../../../service/plea/plea.service';
import { SWIPE_IN_BELOW_SWIPE_OUT_TOP } from '../../../animations';
@Component({
  selector: 'app-submission-details',
  templateUrl: './plea-details.component.html',
  styleUrls: ['./plea-details.component.scss'],
  animations: [
    SWIPE_IN_BELOW_SWIPE_OUT_TOP
  ]
})
export class PleaDetailsComponent {
  isOpen = false;
  reportReason: string = 'inappropriate-content';
  plea$: Observable<Plea>;
  constructor(private route: ActivatedRoute, private pleaService: PleaService) {
    this.plea$ = this.pleaService.getPleaById( parseInt( this.route.snapshot.paramMap.get('pleaId')! ) );
  }
  submitReport(){
    console.log('submit');
    // TODO: submit with reason value and plea id
    this.isOpen = false;
  }
}
