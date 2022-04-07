import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleasComponent } from './all-pleas.component';

describe('SubmissionsComponent', () => {
  let component: PleasComponent;
  let fixture: ComponentFixture<PleasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PleasComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PleasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
