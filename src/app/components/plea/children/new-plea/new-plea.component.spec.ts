import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPleaComponent } from './new-plea.component';

describe('NewSubmissionComponent', () => {
  let component: NewPleaComponent;
  let fixture: ComponentFixture<NewPleaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPleaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPleaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
