import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PleaService } from '../../../service/plea/plea.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Plea } from '../../../model/plea';
import { tap } from 'rxjs/operators';
import { Support } from '../../../model/plea/support.model';

@Component({
  selector: 'app-support-plea',
  templateUrl: './support-plea.component.html',
  styleUrls: ['./support-plea.component.scss'],
})
// TODO: scroll to top on init but window.scrollTo doesn't work
export class SupportPleaComponent {
  pleaId: number;
  plea$: Observable<Plea>;
  displayModal = false;
  supportPleaForm = new FormGroup({
    comment: new FormControl('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private pleaService: PleaService
  ) {
    const supportId = parseInt( this.route.snapshot.paramMap.get('supportId')! );

    if ( supportId ) {
      this.pleaService.getSupportById( supportId ).pipe(
        tap( ( { comment }: Support ) => {
          this.supportPleaForm.patchValue({ comment });
        } )
      )
    } else {
      this.pleaId = parseInt( this.route.snapshot.paramMap.get( 'pleaId' )! );
      this.plea$ = this.pleaService.getPleaById( this.pleaId );
    }
  }

  submit(form: FormGroup): void {
    this.displayModal = true;
    this.pleaService.supportPlea( this.pleaId, form.value.comment).subscribe(() => {
      setTimeout(() => {
        window.history.back();
      }, 3000);
    });
  }
}
