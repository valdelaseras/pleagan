import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleaCardComponent } from './plea-card.component';

describe('PleaCardComponent', () => {
  let component: PleaCardComponent;
  let fixture: ComponentFixture<PleaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PleaCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PleaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
