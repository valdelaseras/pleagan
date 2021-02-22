import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PleaService } from '../../../service/plea/plea.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Plea } from '../../../model/plea';

@Component({
  selector: 'app-support-plea',
  templateUrl: './support-plea.component.html',
  styleUrls: ['./support-plea.component.scss'],
})
// TODO: scroll to top on init but window.scrollTo doesn't work
export class SupportPleaComponent {
  pleaId: string;
  plea$: Observable<Plea>;
  displayModal = false;
  supportPleaForm = new FormGroup({
    comment: new FormControl('', Validators.required),
  });
  constructor(private route: ActivatedRoute, private pleaService: PleaService, private router: Router) {
    this.pleaId = this.route.snapshot.paramMap.get('id') || '';
    this.plea$ = this.pleaService.getPleaById( this.pleaId );
  }
  submit( form: FormGroup ): void {
    this.displayModal = true;
    this.pleaService.supportPlea( this.pleaId, form.value.comment ).subscribe(() => {
      setTimeout( () => {
        window.history.back();
      }, 3000)
    });
  }
}

