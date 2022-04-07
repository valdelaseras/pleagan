import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleasListComponent } from './pleas-list.component';

describe('PleasListComponent', () => {
  let component: PleasListComponent;
  let fixture: ComponentFixture<PleasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PleasListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PleasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
