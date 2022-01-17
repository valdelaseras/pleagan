import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {PleaService} from '@core/service';
import { GetPleaDto } from '@shared/model';

@Component({
  selector: 'app-plea-support-button',
  templateUrl: './plea-support-button.component.html',
  styleUrls: ['./plea-support-button.component.scss'],
})
export class PleaSupportButtonComponent {
  @Input() plea: GetPleaDto;
  @Input() userHasSupported: boolean = false;
  @Output() hasSupported: EventEmitter<void> = new EventEmitter<void>();
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
    if ( this.userHasSupported ) return;
    event.stopPropagation();
    event.preventDefault();
    this.supportModalIsOpen = true;
  }
}
