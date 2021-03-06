import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Plea} from '../../../../model/plea';

@Component({
  selector: 'app-plea-support-button',
  templateUrl: './plea-support-button.component.html',
  styleUrls: ['./plea-support-button.component.scss']
})
export class PleaSupportButtonComponent {
  @Input() plea: Plea;
  // plea$: Observable<Plea>;
  // this shouldn't just be a FE boolean
  userHasSupported = false;
  supportModalIsOpen = false;

  supportPleaForm = new FormGroup({
    comment: new FormControl('', Validators.required),
  });
  // constructor(private route: ActivatedRoute, private pleaService: PleaService) {
  //   // this.plea$ = this.pleaService.getPleaById(this.route.snapshot.paramMap.get('id') || '');
  // }

  submitSupport(): void {
    // display success message first then:
    this.userHasSupported = true;
    this.supportModalIsOpen = false;
  }

  displayModal( event: MouseEvent ): void {
    event.stopPropagation();
    event.preventDefault();
    this.supportModalIsOpen = true;
  }
}
