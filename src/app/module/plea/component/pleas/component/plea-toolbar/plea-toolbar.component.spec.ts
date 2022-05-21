import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleaToolbarComponent } from './plea-toolbar.component';

describe('PleaToolbarComponent', () => {
  let component: PleaToolbarComponent;
  let fixture: ComponentFixture<PleaToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PleaToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PleaToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
