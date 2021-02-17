import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportersListComponent } from './supporters-list.component';

describe('SupportersListComponent', () => {
  let component: SupportersListComponent;
  let fixture: ComponentFixture<SupportersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
