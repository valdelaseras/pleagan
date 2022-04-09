import { Component } from '@angular/core';
import { AbstractWizardStepDirective } from '@shared/component';
import { WizardService } from '@shared/component/wizard/service/wizard.service';
import { PleaListItem } from '../../../pleas.data-source';

@Component({
  selector: 'app-create-plea-step-two',
  templateUrl: './create-plea-step-two.component.html',
  styleUrls: [
    './create-plea-step-two.component.scss'
  ]
})
export class CreatePleaStepTwoComponent extends AbstractWizardStepDirective {
  pleas: PleaListItem[];

  constructor(
    protected wizardService: WizardService
  ) {
    super( wizardService );
  }

  ngOnInit(): void {
    this.pleas = this.step.data.pleas.length > 5 ? this.step.data.pleas.slice(0, 5) : this.step.data.pleas;
  }
}
