import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPleasComponent } from './my-pleas.component';

describe('MyPleasComponent', () => {
  let component: MyPleasComponent;
  let fixture: ComponentFixture<MyPleasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyPleasComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPleasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
