import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HafCardComponent } from './haf-card.component';

describe('HafCardComponent', () => {
  let component: HafCardComponent;
  let fixture: ComponentFixture<HafCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HafCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HafCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
