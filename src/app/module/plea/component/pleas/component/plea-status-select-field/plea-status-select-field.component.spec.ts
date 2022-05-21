import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleaStatusSelectFieldComponent } from './plea-status-select-field.component';

describe('PleaStatusSelectFieldComponent', () => {
  let component: PleaStatusSelectFieldComponent;
  let fixture: ComponentFixture<PleaStatusSelectFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PleaStatusSelectFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PleaStatusSelectFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
