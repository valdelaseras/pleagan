import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportPleaComponent } from './support-plea.component';

describe('SupportPleaComponent', () => {
  let component: SupportPleaComponent;
  let fixture: ComponentFixture<SupportPleaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportPleaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportPleaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
