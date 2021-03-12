import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Plea, Support} from '@shared/model';
import {PleaService} from '@core/service';

@Component({
  selector: 'app-plea-support-button',
  templateUrl: './plea-support-button.component.html',
  styleUrls: ['./plea-support-button.component.scss'],
})
export class PleaSupportButtonComponent {
  @Input() plea: Plea;
  @Output() hasSupported: EventEmitter<void> = new EventEmitter<void>();

  // plea$: Observable<Plea>;
  // this shouldn't just be a FE boolean
  userHasSupported = false;
  supportModalIsOpen = false;

  supportPleaForm = new FormGroup({
    comment: new FormControl('', Validators.required),
  });
  constructor(private pleaService: PleaService) {}

  submitSupport( form: FormGroup ): void {
    // display success message first then:
    this.pleaService.supportPlea( this.plea.id, form.value.comment ).subscribe(() => {
      this.userHasSupported = true;
      this.supportModalIsOpen = false;
      // trigger data refresh
      this.hasSupported.emit();
    });
  }

  displayModal(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.supportModalIsOpen = true;
  }
}
