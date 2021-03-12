import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SWIPE_IN_BELOW_SWIPE_OUT_TOP } from '@shared/animations';
import { PleaService } from '@core/service';
import { Plea } from '@shared/model';

@Component({
  selector: 'app-submission-details',
  templateUrl: './plea-details.component.html',
  styleUrls: ['./plea-details.component.scss'],
  animations: [SWIPE_IN_BELOW_SWIPE_OUT_TOP],
})
export class PleaDetailsComponent {
  // this shouldn't just be a FE boolean. PleaSupportButtonComponent also uses this
  // to display the correct button content.
  userHasSupported = false;

  // Modals
  reportModalIsOpen = false;
  retractSupportModalIsOpen = false;

  retractReason: string = 'already-exists';

  plea$: Observable<Plea>;
  // Select elements in modals
  reportReason: string = 'inappropriate-content';
  constructor(private route: ActivatedRoute, private pleaService: PleaService) {
    this.refreshPlea();
  }
  submitReport() {
    console.log('submit');
    // TODO: signUp with reason value and plea id
    this.reportModalIsOpen = false;
  }
  retractSupport(): void {
    console.log('retract support');
    // remove comment
    // adjust count
    this.userHasSupported = false;
    this.retractSupportModalIsOpen = false;
  }

  refreshPlea(): void {
    this.plea$ = this.pleaService.getPleaById( parseInt( this.route.snapshot.paramMap.get('pleaId')! ) );
  }
}
