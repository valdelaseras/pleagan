import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleaComponent } from './plea.component';

describe('SubmissionComponent', () => {
  let component: PleaComponent;
  let fixture: ComponentFixture<PleaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PleaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PleaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
