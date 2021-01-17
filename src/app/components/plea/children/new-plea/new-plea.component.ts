import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';

@Component({
  selector: 'app-new-plea',
  templateUrl: './new-plea.component.html',
  styleUrls: ['./new-plea.component.scss'],
})
export class NewPleaComponent {
  displayModal = false;
  addedIngredients: string[] = [];
  newPleaForm = new FormGroup({
    pleaganName: new FormControl('', Validators.required),
    pleaganLocation: new FormControl('', Validators.required),
    productName: new FormControl('', Validators.required),
    companyName: new FormControl('', Validators.required),
    companyContact: new FormControl('', Validators.required),
    pleaMsg: new FormControl('', Validators.required),
    productImage: new FormControl('', [Validators.required]),
    ingredient: new FormControl()
  });
  submit(): void {
    this.displayModal = true;
  }
  createTag( event: KeyboardEvent ): void {
    if ( event.code === 'Comma') {
      this.addedIngredients.push( this.newPleaForm.value.ingredient.replace(',', '') );
      this.newPleaForm.controls['ingredient'].setValue( '' );
    }
  }
  removeTag( index: number ): void {
    this.addedIngredients.splice( index, 1 );
  }
}
