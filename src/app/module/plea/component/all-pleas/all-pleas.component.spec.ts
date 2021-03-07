import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPleasComponent } from './all-pleas.component';

describe('SubmissionsComponent', () => {
  let component: AllPleasComponent;
  let fixture: ComponentFixture<AllPleasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllPleasComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPleasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
