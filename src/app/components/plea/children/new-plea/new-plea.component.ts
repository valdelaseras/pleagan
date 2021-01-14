import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';

@Component({
  selector: 'app-new-plea',
  templateUrl: './new-plea.component.html',
  styleUrls: ['./new-plea.component.scss'],
})
export class NewPleaComponent {
  displayModal = false;
  newPleaForm = new FormGroup({
    pleaganName: new FormControl('', Validators.required),
    pleaganLocation: new FormControl('', Validators.required),
    productName: new FormControl('', Validators.required),
    companyName: new FormControl('', Validators.required),
    companyContact: new FormControl('', Validators.required),
    pleaMsg: new FormControl('', Validators.required),
    productImage: new FormControl('', [Validators.required]),
  });
  submit(): void {
    this.displayModal = true;
  }
}
