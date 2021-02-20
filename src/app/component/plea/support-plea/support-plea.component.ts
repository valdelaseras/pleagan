import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PleaService } from '../../../service/plea/plea.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Plea } from '../../../model/plea/plea.model';

@Component({
  selector: 'app-support-plea',
  templateUrl: './support-plea.component.html',
  styleUrls: ['./support-plea.component.scss'],
})
// TODO: scroll to top on init but window.scrollTo doesn't work
export class SupportPleaComponent {
  plea$: Observable<Plea>;
  displayModal = false;
  supportPleaForm = new FormGroup({
    pleaganName: new FormControl('', Validators.required),
    pleaganEmail: new FormControl('', Validators.required),
    pleaganLocation: new FormControl('', Validators.required),
    pleaMsg: new FormControl('', Validators.required),
  });
  constructor(private route: ActivatedRoute, private pleaService: PleaService) {
    this.plea$ = this.pleaService.getPleaById(this.route.snapshot.paramMap.get('id') || '');
  }
  submit(): void {
    this.displayModal = true;
  }
}
