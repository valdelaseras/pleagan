import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleExplainerSectionComponent } from './simple-explainer-section.component';

describe('SimpleExplainerSectionComponent', () => {
  let component: SimpleExplainerSectionComponent;
  let fixture: ComponentFixture<SimpleExplainerSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleExplainerSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleExplainerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
