import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingSection } from './landing-section.component';

describe('LandingComponent', () => {
  let component: LandingSection;
  let fixture: ComponentFixture<LandingSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingSection ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
