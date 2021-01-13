import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';

@Component({
  selector: 'app-new-plea',
  templateUrl: './new-plea.component.html',
  styleUrls: ['./new-plea.component.scss'],
})
export class NewPleaComponent {
  newPleaForm = new FormGroup({
    productName: new FormControl('', Validators.required),
    companyName: new FormControl('', Validators.required),
    companyContact: new FormControl('', Validators.required),
    productImage: new FormControl('', [Validators.required]),
  });

  submit(): void {
    console.log(this.newPleaForm);
  }
}
