import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompliedPleasComponent } from './complied-pleas.component';

describe('CardListComponent', () => {
  let component: CompliedPleasComponent;
  let fixture: ComponentFixture<CompliedPleasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompliedPleasComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompliedPleasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
