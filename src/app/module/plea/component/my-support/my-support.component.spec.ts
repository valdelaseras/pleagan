import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySupportComponent } from './my-support.component';

describe('MySupportComponent', () => {
  let component: MySupportComponent;
  let fixture: ComponentFixture<MySupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MySupportComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MySupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
