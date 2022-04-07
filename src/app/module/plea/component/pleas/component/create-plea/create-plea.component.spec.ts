import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePleaComponent } from './new-plea.component';

describe('NewSubmissionComponent', () => {
  let component: CreatePleaComponent;
  let fixture: ComponentFixture<CreatePleaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePleaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePleaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
