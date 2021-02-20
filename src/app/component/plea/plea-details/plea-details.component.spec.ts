import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleaDetailsComponent } from './plea-details.component';

describe('SubmissionDetailsComponent', () => {
  let component: PleaDetailsComponent;
  let fixture: ComponentFixture<PleaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PleaDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PleaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
