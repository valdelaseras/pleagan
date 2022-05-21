import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver, EventEmitter,
  Input, OnDestroy,
  OnInit, Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { WizardService, WizardStep } from '@shared/component/wizard/service/wizard.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, shareReplay, startWith, tap, timestamp, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: [ './wizard.component.scss' ]
})
export class WizardComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() steps: WizardStep[];
  @Input() showStepIndex = true;
  @Output() onSubmit: Subject<void> = new Subject();

  currentStep: Observable<WizardStep>;
  toNextStep: Subject<void> = new Subject();
  toPreviousStep: Subject<void> = new Subject();
  isLastStep: Observable<boolean>;
  isFirstStep: Observable<boolean>;
  direction: Observable<'RL' | 'LR'>;

  @ViewChild( 'step', { read: ViewContainerRef } ) private wizardStepTarget: ViewContainerRef;

  constructor (
    private wizardService: WizardService,
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.wizardService.setSteps( this.steps );

    this.currentStep = this.wizardService.getCurrentStep();
    this.isLastStep = this.wizardService.isLastStep.pipe( shareReplay(1) );
    this.isFirstStep = this.wizardService.isFirstStep.pipe( shareReplay(1) );

    this.toNextStep.pipe(
      withLatestFrom( this.isLastStep ),
      tap( ( [, isLastStep] ) => {
        isLastStep ? this.onSubmit.next() : this.wizardService.moveToNextStep.next();
      })
    ).subscribe();

    this.toPreviousStep.pipe(
      withLatestFrom( this.isFirstStep ),
      filter( ( [, isFirstStep] ) => !isFirstStep ),
      tap( () => { this.wizardService.moveToPreviousStep.next(); })
    ).subscribe();

    this.direction = combineLatest([
      this.toNextStep.pipe(startWith(() =>{}), timestamp()),
      this.toPreviousStep.pipe(startWith(() => {}), timestamp())
    ]).pipe(
      map( ( [ next, previous ] ) => (
        next.timestamp >= previous.timestamp ? 'RL' : 'LR'
      )),
      shareReplay( 1 ),
    );
  }

  ngAfterViewInit(): void {
    this.currentStep.pipe(
      map( ( step ) => {
        this.wizardStepTarget.remove();
        const component = this.wizardStepTarget.createComponent(
          this.resolver.resolveComponentFactory( step.component )
        );

        component.instance.step = step;
        component.changeDetectorRef.detectChanges();
      })
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.wizardService.reset();
  }
}
