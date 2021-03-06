import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleaSupportButtonComponent } from './plea-support-button.component';

describe('PleaSupportButtonComponent', () => {
  let component: PleaSupportButtonComponent;
  let fixture: ComponentFixture<PleaSupportButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PleaSupportButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PleaSupportButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
